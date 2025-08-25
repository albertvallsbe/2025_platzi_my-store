export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	isBlock: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface Category {
	id: string;
	name: string;
	image: string;
}

export type UserRole = "admin" | "customer" | "seller";
export interface User {
	id: number;
	email: string;
	password: string;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
}

export interface Customer {
	id: number;
	name: string;
	firstSurname: string;
	secondSurname: string;
	phone: string;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}

export type ReqProperty = "body" | "params" | "query" | "headers";

export interface AppError extends Error {
	statusCode?: number;
}
