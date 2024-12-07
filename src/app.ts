import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();


app.use(express.json());
app.use(
    cors({
        credentials: true,
    }),
)
app.use(cookieParser())

//route middleware
app.use("/api/", router);


app.get('/', (req: Request, res: Response) => {
    res.json({
        "message": "Welcome to Next Bazaar Server"
    })
})


//Global middleware
app.use(globalErrorHandler);

//Not Found
app.use(notFound)

export default app;
