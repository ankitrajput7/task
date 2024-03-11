import mysql from "mysql2";
import util from "util";

const mysqlConnection = mysql.createPool({
  database: "internshipTask",
  user: "root",
  password: "Ankit@123@",
  host: "localhost",
  port: 3310,
});

mysqlConnection.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  }
  console.log("database is connected");
});

const dbQuery = util.promisify(mysqlConnection.query).bind(mysqlConnection);
export default dbQuery;
