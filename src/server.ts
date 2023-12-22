
import bodyParser = require("body-parser");
import * as express from 'express';
import { userRouter } from "./users/users.router";

import { users } from "./config/userData.mock";
/**
 * 
 * @author Nitin Chandekar
 * @date 22 Jan 2023
 * Use for Configuration application
 */
export class Server {
    public app: express.Application = express();
    public   users: object = users;
    constructor() {
        this.configBodyParser();
        this.configRoute();
    }

    /**
     * @function configBodyParser
     * @description use for application config
     */
    configBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

    }

    /**
     * @description  this function register our application route
     * @function configRoute 
     * 
     */
    configRoute() {
        this.app.use("/api/users/", userRouter);
    }
}