export const errorHandler = (statusCode, message) => {
    const error = new Error(message); // Pass the error message to the Error constructor
    error.statusCode = statusCode; // Use statusCode with lowercase "s"
    return error;
}