class ResponseWrapper {
    success = (res, data, message = 'Success', statusCode = 200) => {
      return res.status(statusCode).json({
        status: 'success',
        message: message,
        data,
      });
    }
  
    error = (res, data, message = 'Error', statusCode = 500) => {
      return res.status(statusCode).json({
        status: 'error',
        message: message,
        data,
      });
    }
  }
  
  module.exports = ResponseWrapper;
  