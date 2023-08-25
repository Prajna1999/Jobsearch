// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError={
    // set default
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong',
  }

  
  if(err.name === 'ValidationError'){
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = err.message
  }
  // mongoose duplicate email eeror
  if(err.code && err.code===11000){
    customError.statusCode = StatusCodes.CONFLICT
    customError.msg = 'Email already exists'
  }
  // mongoose cast error
  if(err.name === 'CastError'){
    customError.statusCode = StatusCodes.NOT_FOUND
    customError.msg = err.message
  }
  return res.status(customError.statusCode).json({ msg:customError.msg })
}

module.exports = errorHandlerMiddleware
