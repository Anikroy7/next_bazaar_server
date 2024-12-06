import express, { Request } from "express";

const app = express();

app.get('/', (req: Request, res) => {
    res.json({
        "message": "Welcome to Next Bazaar Server"
    })
})

export default app;
