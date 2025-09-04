// import { faker } from "@faker-js/faker";
import {
	ValidationError,
	// UniqueConstraintError,
	DatabaseError,
} from "sequelize";
import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { google } from "googleapis";

import { config } from "./../config/config.js";
import type {
	User as UserType,
	userJwtPayload,
	AuthUser,
} from "../types/types.js";

import { UserService } from "../services/userService.js";
const service = new UserService();

export class AuthService {
	async getUser(email: string, password: string) {
		try {
			const user = await service.findByEmail(email);
			if (!user) {
				throw Boom.notFound(`User ${email} not found`);
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				throw Boom.unauthorized();
			}

			return user as AuthUser;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching user");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch user");
		}
	}

	signToken(user: UserType) {
		try {
			if (!user) {
				throw Boom.notFound(`User ${user} not found`);
			}

			const { id, role, email } = user as UserType;
			const payload: userJwtPayload = {
				sub: String(id),
				role: role,
			};

			const JWT_SECRET = config.jwtSecret;
			if (!JWT_SECRET) {
				throw Boom.badImplementation("Missing JWT_SECRET");
			}

			const token = jwt.sign(payload, JWT_SECRET);

			const authUser: AuthUser = {
				id: id,
				email: email,
				role: role,
			};

			return { user: authUser, token };
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching user");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch user");
		}
	}

	async sendMail(email: string) {
		try {
			const user = await service.findByEmail(email);
			if (!user) {
				throw Boom.notFound(`User ${email} not found`);
			}

			const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
			const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
			const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN as string;
			const USER = process.env.GOOGLE_USER as string;

			const REDIRECT_URI = "https://developers.google.com/oauthplayground";

			const oAuth2Client = new google.auth.OAuth2(
				CLIENT_ID,
				CLIENT_SECRET,
				REDIRECT_URI,
			);

			oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

			const accessToken = await oAuth2Client.getAccessToken();

			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					type: "OAuth2",
					user: USER,
					clientId: CLIENT_ID,
					clientSecret: CLIENT_SECRET,
					refreshToken: REFRESH_TOKEN,
					accessToken: accessToken.token as string,
				},
			});

			await transporter.sendMail({
				from: `MyStore App <${USER}>`,
				to: USER,
				subject: "Aquest es un correu nou",
				text: "Hola user @",
				html: "<b>Hola @</b>",
			});

			return { message: "mail sent" };
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching user");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch user");
		}
	}
}
