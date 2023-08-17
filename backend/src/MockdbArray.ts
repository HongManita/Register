import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const cors = require("cors");

const SALT_ROUNDS = 10;
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

interface dataRegister {
   
    fname: string;
    lname: string;
    email: string;
    pass: string;
    requirements: string;
}

const mockdb : dataRegister[] = [];

app.post('/register', (req: Request, res: Response) => {

  try{
    const { fname, lname, email, pass, requirements }: dataRegister = req.body;

    const hash = bcrypt.hashSync(pass, SALT_ROUNDS);

    mockdb.push({
     
        fname,
        lname,
        email,
        pass: hash,
        requirements
      });
    
      
      console.log("Registration successful.");
      res.status(200).json({ message: "Registration successful" });
  

    }catch (err:unknown){
      console.log("Error inserting data into db.");
      res.status(400).json({ message: "Error inserting data into db." });
  
    }

    console.log('mockdb',mockdb);
  });


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

