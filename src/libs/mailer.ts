import nodemailer, { type SendMailOptions } from "nodemailer";
import { google } from "googleapis";
import { config } from "../config/config.js";

const GOOGLE_CLIENT_ID = config.googleClientId ?? "";
const GOOGLE_CLIENT_SECRET = config.googleClientSecret ?? "";
const GOOGLE_REFRESH_TOKEN = config.googleRefreshToken ?? "";
const GOOGLE_USER = config.googleUser ?? "";

if (
	!GOOGLE_CLIENT_ID ||
	!GOOGLE_CLIENT_SECRET ||
	!GOOGLE_REFRESH_TOKEN ||
	!GOOGLE_USER
) {
	throw new Error("Missing Google OAuth2 env vars for mailer");
}

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	REDIRECT_URI,
);

oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export const createTransport = async () => {
	const accessTokenResp = await oAuth2Client.getAccessToken();
	const accessToken =
		typeof accessTokenResp === "string"
			? accessTokenResp
			: accessTokenResp?.token;

	if (!accessToken) {
		throw new Error("Unable to obtain Gmail access token");
	}

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: GOOGLE_USER,
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			refreshToken: GOOGLE_REFRESH_TOKEN,
			accessToken,
		},
	});

	return transporter;
};

/** Envia un correu amb Gmail OAuth2 (reutilitzable) */
export async function sendMail(options: SendMailOptions) {
	const transporter = await createTransport();
	// afegim remitent per defecte si no ve
	if (!options.from) {
		options.from = `MyStore App <${GOOGLE_USER}>`;
	}
	return transporter.sendMail(options);
}
