// const express = require("express") ; 
// const app = express() ; 
// app.use(express.json()) ; 
 
// const sqlite3 = require("sqlite3").verbose() ; 
// const db = new sqlite3.Database("./sqlfile.db" , sqlite3.OPEN_READWRITE, (err)=>{ 
//     if (err) { 
//         return console.log(err.message) 
     
//     } 
//     console.log("Connection success,nice")  
// }) ;


// db.run("create table if not exists employe_details(id integer primary key,name text , email text,mobile_no text , salary real) " , (err) =>{ 
//     if (err) { 
//         console.log(err.message) 
//     } 
//     else { 
//         console.log("table created , good") 
//     } 
// } ) ;

// app.delete("/deletedetails/:id", (req, res) => { 
//     const id = req.params.id; 
//     const deleteQuery = "DELETE FROM employe_details WHERE id = ?"; 
  
// // POST method 
 
// app.post("/postdetails" , (req,res)=>{ 
//     const {name , email , mobile_no,salary} = req.body ; 
 
//     // if (!name  !mobile_no || !salary) { 
//     //     return res.status(400).json({error : "missing data"}) ; 
//     // } 
 
//     const insertQuery = 'INSERT INTO employe_details (name, email, mobile_no, salary) VALUES (?, ?, ?, ?)'; 
    
//     const data = {  
//         name : name ,  
//         email : email ,  
//         mobile_no :mobile_no ,  
//         salary : salary ,
//     } 
//     const values = [name, email, mobile_no, salary]; 
//     db.run(insertQuery, values, function(err)  { 
//       if (err) { 
//         console.error('Error inserting row:', err.message); 
//         return res.status(500).json({ error: 'Failed to insert data' }); 
//       }  
//       else { 
//         console.log('New row inserted with ID:', this.lastID );  
       
//         data["id"] = this.lastID 
//         return res.json({data:data} ); 
//       } 
//     }) ; 
 
 
// } )







// // GET method  
// app.get("/getdetails", (req, res) => { 
//     const selectQuery = "SELECT * FROM employe_details"; 
   
//     db.all(selectQuery, [], (err, rows) => { 
//       if (err) { 
//         console.error("Error retrieving data:", err.message); 
//         return res.status(500).json({ error: "Failed to retrieve data" }); 
//       } else { 
//         return res.json({ data: rows }); 
//       } 
//     }); 
//   });
//     db.run(deleteQuery, id, function (err) { 
//       if (err) { 
//         console.error("Error deleting row:", err.message); 
//         return res.status(500).json({ error: "Failed to delete data" }); 
//       } else { 
//         if (this.changes > 0) { 
//           console.log("Row deleted with ID:", id); 
//           return res.json({ message: "Row deleted successfully" }); 
//         } else { 
//           console.log("No row found with ID:", id); 
//           return res.status(404).json({ error: "Row not found" }); 
//         } 
//       } 
//     }); 
//   });


// app.listen(3002 , () => { 
//     console.log("hey, server is running") 
// })



// const express = require("express");
// const app = express();
// const cors = require("cors");
// app.use(cors())
// app.use(express.json());

// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database("./sqlfile.db", sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     return console.log(err.message);
//   }
//   console.log("Connection success, nice");
// });


// db.run(
//     "create table if not exists Product_details(id integer primary key,Name, Image, Image2,Price,Category,Url,Description)",
//     (err) => {
//       if (err) {
//         console.log(err.message);
//       } else {
//         console.log("Product table created");
//       }
//     }
//   );

// app.post("/post", (req, res) => {
//     const { Name, Image, Image2,Price,Category,Url,Description } = req.body;
  
    
  
//     const insertdata =
//       "INSERT INTO Product_details ( Name, Image, Image2,Price,Category,Url,Description) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
//     const ProductInfo  = {
//         Name :Name,
//         Image:Image,
//         Image2:Image2,
//         Price:Price,
//         Category:Category,
//         Url:Url,
//         Description:Description
//     };
//     const value = [ Name, Image, Image2,Price,Category,Url,Description];
//     db.run(Product_details , value, function (err) {
//       if (err) {
//         console.error("Error inserting row:", err.message);
//         return res.status(500).json({ error: "Failed to insert data" });
//       } else {
//         console.log("New row inserted with ID:", this.lastID);
  
//         ProductInfo["id"] = this.lastID;
//         return res.json({ ProductInfo: ProductInfo });
//       }
//     });
//   });






// app.listen(3003, () => {
//   console.log("hey, server is running");
// });
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./sqlfile.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log("Connection success, nice");
});

db.run(
  "create table if not exists Product_details(id integer primary key,Name, Image, Image2,Price,Category,Url,Description)",
  (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Product table created");
    }
  }
);


db.run(
  "create table if not exists signup (id INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT,Email TEXT UNIQUE, Password TEXT,Confirmpassword TEXT,phoneNo TEXT)",
  (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Signup table created");
    }
  }
);

// Define the POST route for '/signupdetails'
app.post('/signupdetails', (req, res) => {
  const newSignup = {
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
    Confirmpassword: req.body.Confirmpassword,
    phoneNo: req.body.phoneNo,
  };

  // Check if the user already exists
  db.get('SELECT * FROM signup WHERE Email = ?', newSignup.Email, (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: 'Internal server error',
        status: 'failed'
      });
      return;
    }

    if (!row) { // If no user found, create a new user
      db.run('INSERT INTO signup (Name, Email, Password, Confirmpassword, phoneNo) VALUES (?, ?, ?, ?, ?)',
        [newSignup.Name, newSignup.Email, newSignup.Password, newSignup.Confirmpassword, newSignup.phoneNo],
        function (err) {
          if (err) {
            console.log(err);
            res.status(500).json({
              error: 'Internal server error',
              status: 'failed'
            });
          } else {
            res.status(200).json({
              message: 'User signed up successfully',
              status: 'success',
              Email: newSignup.Email,
              data: {
                id: this.lastID,
                ...newSignup
              }
            });
          }
        });
    } else {
      res.status(409).json({
        message: 'User already exists',
        status: 'failed'
      });
    }
  });
});


// Assuming you have already set up the SQLite database and table as mentioned in the previous code.

// Define the POST route for '/logindetails'
app.post('/logindetails', (req, res) => {
  const loginDetails = {
    Email: req.body.Email,
    Password: req.body.Password
  };

  // Find the user based on the provided email and password
  db.get('SELECT * FROM signup WHERE Email = ? AND Password = ?', [loginDetails.Email, loginDetails.Password], (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: 'Internal server error',
        status: 'failed'
      });
      return;
    }

    if (row) { // If matching data is found, return login successful
      res.status(200).json({
        message: 'Login Successful',
        data: row
      });
    } else {
      res.status(404).json({
        message: 'No matching data found',
        status: 'failed'
      });
    }
  });
});












app.post("/post", (req, res) => {
  const { Name, Image, Image2, Price, Category, Url, Description } = req.body;

  const insertdata =
    "INSERT INTO Product_details (Name, Image, Image2, Price, Category, Url, Description) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const ProductInfo = {
    Name: Name,
    Image: Image,
    Image2: Image2,
    Price: Price,
    Category: Category,
    Url: Url,
    Description: Description,
};
  const values = [Name, Image, Image2, Price, Category, Url, Description];
  db.run(insertdata, values, function (err) {
    if (err) {
      console.error("Error inserting row:", err.message);
      return res.status(500).json({ error: "Failed to insert data" });
    } else {
      console.log("New row inserted with ID:", this.lastID);

      ProductInfo["id"] = this.lastID;
      return res.json({ ProductInfo: ProductInfo });
    }
  });
});






















app.get("/getdetails", (req, res) => { 
    const selectQuery = "SELECT * FROM Product_details"; 
   
    db.all(selectQuery, [], (err, rows) => { 
      if (err) { 
        console.error("Error retrieving data:", err.message); 
        return res.status(500).json({ error: "Failed to retrieve data" }); 
      } else { 
        return res.json({ProductInfo: rows }); 
      } 
    }); 
  });
  
 
  app.delete("/delete/:id", (req, res) => { 
      const id = req.params.id; 
      const deleteQuery = "DELETE FROM Product_details WHERE id = ?"; 
     
      db.run(deleteQuery, id, function (err) { 
        if (err) { 
          console.error("Error deleting row:", err.message); 
          return res.status(500).json({ error: "Failed to delete data" }); 
        } else { 
          if (this.changes > 0) { 
            console.log("Row deleted with ID:", id); 
            return res.json({ message: "Row deleted successfully" }); 
          } else { 
            console.log("No row found with ID:", id); 
            return res.status(404).json({ error: "Row not found" }); 
          } 
        } 
      }); 
    });

app.listen(3003, () => {
  console.log("hey, server is running");
});
