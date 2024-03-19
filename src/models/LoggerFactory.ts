import winston from "winston";

interface ILogger {
    info(message: any, traceId?: string): void;
    error(message: any, traceId?: string): void;
}

class WinstonLogger implements ILogger {
    private logger: winston.Logger;
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
            ],
        });
    }
    info(message: any, traceId?: string): void {
        this.logger.info({ traceId, message });
    }
    error(message: any, traceId?: string): void {
        this.logger.error({ traceId, message });
    }
}

class MorganLogger implements ILogger {
    traceId?: string; // Add traceId property

    info(message: any, traceId?: string) {
        // Implement Morgan logging for info level with traceId from logger instance if needed
    }

    error(message: any, traceId?: string) {
        // Implement Morgan logging for error level with traceId from logger instance if needed
    }
}

class LoggerFactory {
    static getLogger(loggerType: string): ILogger {
        switch (loggerType) {
            case 'Winston':
                return new WinstonLogger()
            case 'Morgan':
                return new MorganLogger()
            default:
                throw new Error('Invalid logger type');
        }
    }
}

export default LoggerFactory;