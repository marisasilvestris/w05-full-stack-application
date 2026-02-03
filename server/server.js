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

  console.log(rows);

  res.send(rows);
});

app.post(`/listings`, async (req, res) => {
  const submissionData = req.body;
  const dbQuery = await db.query(
    `INSERT INTO listings (name, title, category, body, brief) VALUES ($1, $2, $3, $4, $5)`,
    [
      submissionData.name,
      submissionData.title,
      submissionData.category,
      submissionData.body,
      submissionData.brief,
    ],
  );
  console.log(submissionData);

  res.send(`POST requested to /listings successfully`);
});

app.delete("/listings", async (req, res) => {
  const submissionData = req.body;
  const dbQuery = await db.query(
    `DELETE FROM listings WHERE id = ${submissionData.id}`,
  );
});

app.listen(3000, (req, res) => {
  console.log(`listening successfully on 3000!`);
});

/* now what i should do here is retrieve the data once, keep it around in a big cached array, and use it when needed. i will not be doing that yet */

// ((queryStr = `INSERT INTO reviews (name, rating, reviewText) VALUES ($1, $2, $3)`),
//   [userData.name, Number(userData.rating), userData.reviewText]);
