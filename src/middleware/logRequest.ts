import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    logger.info({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
        ip: req.ip,
        trace: req.traceId,
    });
    next();
}
