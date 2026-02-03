import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

app.get(`/`, (req, res) => {
  res.send(`GET requested to / successfully`);
});
app.get(`/listings`, async (req, res) => {
  const queryStr = `SELECT * FROM listings`;

  const listingData = await db.query(`${queryStr}`);
  const rows = listingData.rows;
  res.status(200).json(rows);

  console.log(rows);

  res.send(`GET requested to /listings successfully`);
});
app.post(`/listings`, async (req, res) => {
  res.send(`POST requested to /listings successfully`);
});

app.listen(8080, (req, res) => {
  console.log(`listening successfully!`);
});

/* now what i should do here is retrieve the data once, keep it around in a big cached array, and use it when needed. i will not be doing that yet */

// ((queryStr = `INSERT INTO reviews (name, rating, reviewText) VALUES ($1, $2, $3)`),
//   [userData.name, Number(userData.rating), userData.reviewText]);
