import { Color } from "colors";
import app from "./app";
var colors: Color = require('colors');

const port = 3000;

app.listen(port, () => {

    console.log(`Next bazaar server is runing at port ${port}`.green.underline)
})