const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("weaknessbase.db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// 脆弱性のあるエンドポイント
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.log("Executed Query:", query);

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).send("Database Error");
    } else if (rows.length > 0) {
      res.send("Login Successful!");
    } else {
      res.status(401).send("Invalid Credentials");
    }
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
