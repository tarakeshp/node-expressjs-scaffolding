const Base = require("./base");
const Config = require("../../configs/config");
const TimeUtil = require("../common/time_util");

class Controller extends Base {

  constructor(req, res) {
    super(req, res);
  }

  login() {
    let self = this;
    self.request.user = self.request.body.username
    self.Ok({
      username : self.request.body.username,
      session : self.request.body.username
    });
  }
}

module.exports = Controller