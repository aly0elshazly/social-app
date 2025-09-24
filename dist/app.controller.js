"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const module_1 = require("./module");
const DB_1 = require("./DB");
function bootstrap(app, express) {
    (0, DB_1.connectdb)();
    app.use(express.json());
    //auth
    app.use("/auth", module_1.authrouter);
    // user
    app.use("/user", module_1.userRouter);
    app.use((req, res, next) => {
        return res.status(404).json({ message: "invalid router", success: false });
    });
    // global error handler
    app.use((err, req, res, next) => {
        return res.status(err.statusCode).json({
            message: err.message,
            success: false,
            errDetails: err.errorDetails
        });
    });
}
