import { Handler } from "express";
export declare const wrap: (handler: Handler) => (req: any, res: any, next: any) => Promise<void>;
