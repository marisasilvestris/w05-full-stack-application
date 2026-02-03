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
  const listingData = await db.query(`${queryStr}`);
  const rows = listingData.rows;
  res.status(200).json(rows);
  res.send(`GET requested to /listings successfully`);
});
app.post(`/listings`, async (req, res) => {
  res.send(`POST requested to /listings successfully`);
});

app.listen(8080, (req, res) => {
  console.log(`listening successfully!`);
});
