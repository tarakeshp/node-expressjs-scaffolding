var Config = require('../../configs/config');
const TimeUtil = require("../common/time_util");
const Bunyan = require('bunyan');
const _log = Bunyan.createLogger({
    name: "app"
});

delete _log.fields.name;
delete _log.fields.hostname;
delete _log.fields.pid;
delete _log.fields.level;

let Log = function () {

    this.debug = function () {
        if (Config.log === true) {
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === "string") {
                    //console.log("\n" + `D[${TimeUtil.get_now_formatted()}]: ${arguments[i]}`);
                    _log.info(arguments[i]);
                } else {
                    _log.info(JSON.stringify(arguments[i], undefined, 2));
                    //console.log("\n" + `D[${TimeUtil.get_now_formatted()}]: ${JSON.stringify(arguments[i], undefined, 2)}`);
                }
            }
        }
    }
    this.error = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] === "string") {
                {
                    //console.log("\n" + `E[${TimeUtil.get_now_formatted()}]: ${arguments[i]}`);
                    _log.error(arguments[i]);
                }
            } else {
                if (JSON.stringify(arguments[i]) === "{}") {
                    //console.log("\n" + `E[${TimeUtil.get_now_formatted()}]: ${arguments[i].toString()}`, arguments[i]);
                    _log.error(arguments[i].toString());
                } else {
                    //console.log("\n" + `E[${TimeUtil.get_now_formatted()}]: ${JSON.stringify(arguments[i], undefined, 2)}`);
                    _log.error(JSON.stringify(arguments[i], undefined, 2))
                }
            }
        }
    }

    this.req_res = function (req_res, res_data) {
        if (req_res.body) {
            _log.info("\n" + `[${TimeUtil.get_now_formatted()}]: ${req_res.method + " " + req_res.originalUrl + " " + JSON.stringify(req_res.body, undefined, 2)}`);
        } else {
            _log.info("\n" + `[${TimeUtil.get_now_formatted()}]: ${req_res.statusCode + " " + JSON.stringify(res_data, undefined, 2)}`);
        }
    }

    this.http_request = function (req, res, next) {
        if (req.body) {
            _log.info("\n" + `[${TimeUtil.get_now_formatted()}]: ${req.method + " " + req.originalUrl + " " + JSON.stringify(req.body, undefined, 2)}`);
        }

        next();
    }
}

module.exports = new Log;