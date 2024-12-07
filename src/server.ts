import { Color } from "colors";
import app from "./app";
import config from "./app/config";
var colors: Color = require('colors');


async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`.green.underline.bold);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
