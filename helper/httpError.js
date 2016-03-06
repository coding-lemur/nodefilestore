export default class httpError {
    /**
     * Create a error for handle in global error handler.
     * @param {number} statusCode - Http status code
     * @param {(string | object)} [error] - error-message or error-object
     * @return {Error} error-object with status-code
     */
    static createError(statusCode, error) {
        let result;

        if (!error) {
            let message;

            switch (statusCode) {
                case 404:
                    message = 'Not Found';
                    break;
                case 500:
                    message = 'Internal Server Error';
                    break;
                default:
                    message = 'Unkown error';
            }

            result = new Error(message);
        }
        else if (typeof error === 'string') {
            result = new Error(error);
        }
        else {
            result = error;
        }

        result.status = statusCode;

        return result;
    }
}
