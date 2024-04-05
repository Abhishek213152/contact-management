const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "abhi213152",
  database: "crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/data", (req, res) => {
  const get = "SELECT * FROM new_table";
  db.query(get, (error, result) => {
    res.send(result);
  });
});


//put in database
app.post("/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO new_table (name, email, contact) VALUES (?, ?, ?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// View data
app.get("/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM new_table WHERE id=?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error fetching data");
            return;
        }
        res.send(result);
    });
});


// Edit
app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const sqlPut = "UPDATE new_table SET name=?, email=?, contact=? WHERE id=?";
    db.query(sqlPut, [name, email, contact, id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error updating data");
            return;
        }
        res.send(result);
    });
});



//delete
app.delete("/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM new_table WHERE id = ?";
  db.query(sqlRemove, [id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error deleting entry");
    } else {
      res.status(200).send("Entry deleted successfully");
    }
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
