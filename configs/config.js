const ENV = (process.argv.length > 0 && process.argv[2] != undefined) ? "." + process.argv[2] : "";
const env_config = (ENV != undefined) ? require("./config" + ENV) : {};
const _ = require("lodash");

let config = {};

config ={ 
    host : "localhost",
    http : "https",
    port : "9993",
    environment : "local",
    log : true,
    enable_cors : true,
    server_name : 'APP',
    api_suffix : '/api',
    secret : "pRsYWRhcmJhZHx+$7(0YXJha2VzaH,?@}+xy.?YXZpa2+b2+2abSrP",
    ssl :{
        key : "x-server.key",
        cert : "x-server.cert"
    }
};

config.server_ip = `${config.http}://${config.host}:${config.port}`;

let extended_config = _.merge(config, env_config);

extended_config.server_ip = `${config.http}://${config.host}:${config.port}`;

console.log("Configuration Settings...", JSON.stringify(extended_config, undefined, 2));

module.exports = extended_config;