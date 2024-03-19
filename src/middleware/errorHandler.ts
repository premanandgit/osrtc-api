import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import logger from "../utils/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        logger.error(`${req.traceId} - ${err.statusCode} - ${err.message}`);
        return res.status(err.statusCode).json({ error: err.message });
    } else {
        logger.error(`${req.traceId} - 500 - Internal Server Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}