export class ErrorHandler extends Error {
    constructor(public statusCode : number, public message : string) {
        super()
    }
}

export const handleError = (err: ErrorHandler, res: any) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
};

export const catchAsync = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((err: Error) => next(err));
};