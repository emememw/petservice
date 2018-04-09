const Reposed = require("reposed");
const passport = require("passport");
const passportHttp = require("passport-http");
const DatabaseInitializer = require("./databaseinitializer");
const restify = require("restify");

const mongodbConfig = {
	host: "localhost:27017",
	database: "petservice",
	protocol: "mongodb://",
};

passport.use(new passportHttp.BasicStrategy((userid, password, done) => {
	if (userid === "default" && password === "R3yZ5!x?40kJ") {
		done(null, {});
	} else {
		done(new Error("authentication failed"));
	}
}));

Reposed.createServer({
	dbUri: `${mongodbConfig.protocol}@${mongodbConfig.host}/${mongodbConfig.database}`,
	projectPath: "src/js",
	debugDatabase: true,
	passportStrategy: "basic",
	routePrefix: "/petservice",
	beforeInit: server => {
		server.use(restify.CORS({ credentials: true }));
		server.opts(/.*/, (req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
			res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
			res.header("Access-Control-Allow-Credentials", "true");
			res.send(200);
			return next();
		});
	},

}).then(() => DatabaseInitializer.checkAndInitData());
