class ValorantNotRunning extends Error {
    constructor() {
        super();

        this.name = this.constructor.name;
        this.message = "Unable to locate lockfile! Valorant is running?";

        Error.captureStackTrace(this, this.constructor);
    }
}

export { ValorantNotRunning };
