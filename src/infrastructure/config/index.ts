import fs from "fs";
import path from "path";
const env = process.env.NODE_ENV || "dev";
console.log("environement: ", env);
let config: any;
try {
  const envConf = fs.readFileSync(
    path.resolve(__dirname, "config.json"),
    "utf-8"
  );
  config = JSON.parse(envConf);
} catch (error: any) {
  throw new Error(error);
}
export default config[env];
