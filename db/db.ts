import * as mysql from "mysql2/promise";
import { config } from "../config/config";

export const pool = mysql.createPool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    namedPlaceholders: true,
    port: 8889,
    decimalNumbers: true
});