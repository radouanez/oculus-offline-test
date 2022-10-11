export class HTTPClientError extends Error {
    readonly statusCode!: number;
    code!: string;

    constructor(message: object | string, code?: string) {
        if (message instanceof Object) {
            super(JSON.stringify(message));
        } else {
            super(message);
        }
        this.name = 'ClientError';
        if (code) this.code = code;
    }
}

export class HTTP400Error extends HTTPClientError {
    readonly statusCode = 400;

    constructor(message: string | object = 'Bad Request', code?: string) {
        super(message, code);
    }
}

export class HTTP401Error extends HTTPClientError {
    readonly statusCode = 401;

    constructor(message: string | object = 'Unauthorized', code?: string) {
        super(message, code);
    }
}

export class HTTP403Error extends HTTPClientError {
    readonly statusCode = 403;

    constructor(message: string | object = 'Forbidden', code?: string) {
        super(message, code);
    }
}

export class HTTP404Error extends HTTPClientError {
    readonly statusCode = 404;

    constructor(message: string | object = 'Not found', code?: string) {
        super(message, code);
    }
}
