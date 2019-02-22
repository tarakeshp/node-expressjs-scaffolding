const Base = require("./base");

class ErrorController extends Base {

    constructor(req, res) {
        super(req, res);
    }

    send(stack, err, message) {
        var _r = {
            status: "error",
            code: err || 500,
            message: message || "Unable to process your request at the moment"
        };
        console.error("\n---EXCEPTION---", "\n" + (isNaN(JSON.stringify(stack)) === true) ? stack : JSON.stringify(stack));
        this.response.status(_r.code).json(_r);
        return;
    }


    render(stack, err, message) {
        var _r = {
            status: "error",
            code: err || 500,
            message: message || "Unable to process your request at the moment"
        };

        console.error("\n---EXCEPTION---", "\n" + (isNaN(JSON.stringify(stack)) === true) ? stack : JSON.stringify(stack));
        this.response.render2(err);
    }
}

module.exports = ErrorController