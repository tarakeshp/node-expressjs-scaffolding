const Log = require("../common/log");

class ControllerBase {

    constructor(req, res, next = null) {
        this.request = req;
        this.response = res;
        this.next = next;
    }

    Ok(data, message = null) {
        var _r = {
            data: data,
            status: "success"
        }
        if (message != null) {
            _r.message = message;
        }
        Log.req_res(this.response, _r);
        this.response.status(200).json(_r);
    }

    BadRequest(err) {
        var _r = {
            status: "error",
            code: err.code || err,
            message: err.message || err
        };
        Log.req_res(this.response, _r);
        this.response.status(400).json(_r);
    }

    InternalServerError(err, actualErr) {
        console.log(actualErr || "");
        if (typeof err === "string") {
            var t = err;
            err = {};
            err.code = t;
            err.message = t;
        }
        var _r = {
            status: "error",
            code: err.code,
            message: err.message
        };
        Log.req_res(this.response, _r);
        this.response.status(500).json(_r);
    }

    NotAuthorized(err) {
        var _r = {
            status: "error",
            code: err.code  || "AUTHENTICATION_ERR",
            message: err.message || "You must be authenticated to use the service"
        };
        Log.req_res(this.response, _r);
        this.response.status(401).json(_r);
    }
}

module.exports = ControllerBase;