class SystemNotSupported extends Error {
    constructor() {
        super();

        this.name = this.constructor.name;
        this.message = "Tried to init client without authentication with unsupported system!";

        Error.stackTraceLimit = 2;
        Error.captureStackTrace(this, this.constructor);

        Object.setPrototypeOf(this, SystemNotSupported.prototype);
    }
}

export { SystemNotSupported };
