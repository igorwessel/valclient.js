class PrivateInformationJSON64 extends Error {
    constructor() {
        super();

        this.name = this.constructor.name;
        this.message = "Information not is in Base64 encoded JSON string!";

        Error.stackTraceLimit = 2;
        Error.captureStackTrace(this, this.constructor);

        Object.setPrototypeOf(this, PrivateInformationJSON64.prototype);
    }
}

export { PrivateInformationJSON64 };
