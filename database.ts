require("dotenv").config();

const database = {
   user: process.env.BD_USER,
   password: process.env.BD_PASSWORD,
   connectString: process.env.BD_CONNECT_STRING,
};

export default database;
