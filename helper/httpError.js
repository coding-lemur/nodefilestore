var httpError = {
    /***
     * Create a error for handle in global error handler.
     * @param {number} statusCode - Http status code
     * @param {string} [message] - error message
     * @param {object} [error] - error
     * @return {Error}
     */
    createError: function(statusCode) {
        var message = undefined;
        var error = undefined;

        if (arguments.length > 1) {
            // optional parameters: "message" and "error"
            for(var i = 1; i < arguments.length; i++) {
                var arg = arguments[i];

                if (typeof arg == 'string') { // message
                    message = arguments[i];
                }
                else if (typeof arg == 'object') { // error
                    error = arguments[i];
                }
            }
        }

        if (!message) {
            switch(statusCode) {
                case 404:
                    message = 'Not Found';
                    break;
                case 500:
                    message = 'Internal Server Error';
                    break;
            }
        }

        if ((statusCode == 500) && error) { // internal server error
            // TODO log error
        }

        error = new Error(message);
        error.status = statusCode;

        return error;
    }
};

module.exports = httpError;