const ExpressRouter = function (app, express) {

    const Path = require("path");
    const Config = require("../configs/config");
    const Router = express.Router();
    const Log = require("./common/log");
    const TimeUtil = require("./common/time_util")
    const Middlewares = require("./common/middlewares");
    const PingController = require('./controllers/ping_controller');
    const ErrorController = require('./controllers/error_controller');
    const AuthController = require('./controllers/auth_controller');
    const _mw = new Middlewares(app, express);

    //THE ORDER OF THE MIDDLEWARES IS VERY IMPORTANT. DO NOT ALTER
    Log.debug("Current Directory", __dirname);
    Log.debug("Views Directory", Path.join(__dirname,"views/static/404.html"));
  

    //INIT MIDDLEWARE
    _mw.init_defaults();

    //View Routes
    app.get("/ping", [Log.http_request], function (req, res) {
        res.render("ping", {
            requesting_host: req.hostname,
            server_time: TimeUtil.get_utc_now_formatted(),
            server_name: Config.server_name,
            environment: Config.environment
          });
    });

    //API Routes
    Router.get('/ping', [Log.http_request], function (req, res) {
        new PingController(req, res).get()
    });

    Router.post('/login', [Log.http_request], function (req, res) {
        new AuthController(req, res).login()
    });


    app.use(Config.api_suffix, Router) //use Api
        //404 error
        .use(function (req, res) {
            if (req.xhr || req.path.substring(1, 4) === "api") {
                new ErrorController(req, res).send(404, 404, "Resource Not Found");
            } else {
                new ErrorController(req, res).render(404, 404, "Resource Not Found");
            }
        })
        //500 error
        .use(function (err, req, res, next) {
            Log.error(err);
            if (req.xhr || req.path.substring(1, 4) === "api") {
                new ErrorController(req, res).send(500, 500, "Internal Server Error");
            } else {
                new ErrorController(req, res).render(500, 500, "Internal Server Error");
            }
        });
}

module.exports = ExpressRouter;