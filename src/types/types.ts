export interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
	isBlock: boolean;
}

export type ReqProperty = "body" | "params" | "query" | "headers";

export interface AppError extends Error {
	statusCode?: number;
}
