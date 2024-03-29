import { Request, Response, NextFunction } from 'express';
import { DBConnectionFailure } from '../models/CustomError';
import { dbConnectionState } from '../services/dbConnectionState';
import logger from '../utils/logger';

export const checkDBConnection = (req: Request, res: Response, next: NextFunction) => {
  try {
    dbConnectionState()
  }
  catch (error: any) {
    if (error instanceof DBConnectionFailure) {
      logger.error(`500 - DBConnection Failure: ${error.message}`, req.traceId);
      return res.status(500).json({ error: error.message });
    }
    else {
      logger.error(`500 - Internal Server Error: ${error.message}`, req.traceId);
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  next();
};