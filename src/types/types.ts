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
export interface Order {
	id: number;
	customerId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface Category {
	id: number;
	name: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	image: string;
	isBlock: boolean;
	categoryId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderProduct {
	id: number;
	amount: number;
	orderId: number;
	productId: number;
	createdAt: Date;
	updatedAt: Date;
}

export type ReqProperty = "body" | "params" | "query" | "headers";

export type CreationAttributes = "id" | "createdAt" | "updatedAt";
export type CreationAttributesFor<T> = Extract<CreationAttributes, keyof T>;

export interface AppError extends Error {
	statusCode?: number;
}
