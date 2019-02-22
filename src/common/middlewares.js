const BodyParser = require('body-parser');
const Config = require("../../configs/config");
const Log = require("./log");
const CookieParser = require('cookie-parser');
const Session = require('express-session');
const Cors = require("cors");
const Path = require("path");

const Middlwares = function (app, express) {


    this.init_defaults = () => {

        //0. PUG VIEWS
        app.set("views", Path.join(__dirname, "../views"));
        app.set("view engine", "ejs");

        // 1. ENABLE CORS
        if (Config.enable_cors) {
            app.use(Cors());
            Log.debug("CORS enabled");
        }

        // 2. MIDDLEWARE STATIC HTML
        app.use((req, res, next) => {
            res.render2 = function (view) {
                var _v = Path.join(__dirname, `../views/static/${view}.html`);
                Log.debug("View Path", _v);
                return res.sendFile(_v);
            }
            next();
        });

        // 3. MIDDLEWARE PUBLIC FOLDER
        app.use(express.static(Path.join(__dirname, "../../public"), {
            maxAge: 31557600000
        }));

        // 4.MIDDLEWARE COOKIE PARSER, SESSION, BODY PARSER
        app.use(CookieParser());
        app.use(Session({
            secret: Config.secret
        }));

        app.use(BodyParser.urlencoded({
                extended: true
            }))
            .use(BodyParser.json());

        // 5.MIDDLE WARE 401
        app.use(function (req, res, next) {
            if (req.path != `${Config.api_suffix}/login` && req.path != `${Config.api_suffix}/ping` && req.path != `/ping`) {
                if (!req.session.user || !req.headers["x-session"]) {
                    return res.status(401).json({
                        code: "NOT_AUTHORIZED",
                        status: "error"
                    });
                }
                else {
                    app.locals.user ={
                        name : "Tarakesh"
                    }
                }
            }

            app.locals.user ={
                name : "Tarakesh"
            }
            next()
        })

    }

}

module.exports = Middlwares;