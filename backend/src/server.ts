
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const cors = require("cors");

const SALT_ROUNDS = 10;
const mysql = require("mysql2");
const app = express();
const port = 5000;


const db = mysql.createConnection({
  user: "register",
  host: "localhost",
  password: "register",
  database: "register",
});

db.connect();
app.use(express.json());
app.use(cors());

interface dataRegister {
  id: number;
  fname: string;
  lname: string;
  email: string;
  pass: string;
  requirements: string;
}

app.post('/register', (req: Request, res: Response) => {


  const { id, fname, lname, email, pass, requirements }: dataRegister = req.body;
  console.log("fname", fname);

  const hash = bcrypt.hashSync(pass, SALT_ROUNDS);


  let query = `INSERT INTO user
                  (id,fname,lname,email,pass,requirements)
                  VALUES ('${id}','${fname}','${lname}','${email}','${hash}','${requirements}'
                            )`;

  db.query(query, (err: unknown) => {
    console.log(err);
    if (err) {
      res.json({
        status: "400",
        message: "Error inserting data into db",
      });
    } else {
      res.json({
        status: "200",
        message: "Registration successful",
      });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
