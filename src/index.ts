import * as dotenv from "dotenv";
import { Server } from "./server";
dotenv.config();

let server = new Server().app;
let port = process.env.PORT;



if (!process.env.PORT) {
    process.exit(1);
}

server.use((req, res, next) => {
    let error = new Error('Not Found');
    error['status'] = 404;
    next(error);
});

server.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send('Route Not found');
    } else {
        res.status(err.status || 500).json({
            error: {
                message: err.message || 'Internal Server Error',
            },
        });
    }
});

console.log("process?.env?.npm_lifecycle_event ==", process?.env?.npm_lifecycle_event)
// for culturing 
if (process?.env?.npm_lifecycle_event == "start:multi") {
    const cluster = require('cluster');
    if (cluster.isMaster) {

        for (let i = 0; i < 4; i++) {

            cluster.fork();
        }

        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker PID ${worker.process.pid} died`);
        });
    } else {
        const port = 3999 + cluster.worker.id;

        server.listen(port, async () => {

            console.log(`Server Listen port :`, port);
            console.log(`Worker PID ${process.pid} started`);



        })

    }
} else {



    server.listen(port, () => {

        console.log(`Server Listen port :`, port);
        console.log(`Worker PID ${process.pid} started`);

    })
}