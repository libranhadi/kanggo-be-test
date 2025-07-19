export const successResponse = (res: any, data: any, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
      status: "success",
      statusCode,
      message,
      data
    });
  };
  