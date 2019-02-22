const Base = require("./base");
const Config = require("../../configs/config");
const TimeUtil = require("../common/time_util");

class PingController extends Base {

  constructor(req, res) {
    super(req, res);
  }

  get() {
    let self = this;
    self.Ok({
      requesting_host: self.request.hostname,
      server_time: TimeUtil.get_utc_now_formatted(),
      server_name: Config.server_name,
      environment: Config.environment
    });
  }
}

module.exports = PingController