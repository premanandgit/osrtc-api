export class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404)
    }
}

export class ValidationError extends CustomError {
    constructor(message: string) {
        super(message, 400)
    }
}

export class AuthenticationError extends CustomError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class AuthorizationError extends CustomError {
    constructor(message: string) {
        super(message, 403);
    }
}

export class DBConnectionFailure extends CustomError {
    constructor(message: string) {
        super(message, 500);
    }
}