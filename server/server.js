import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

app.get(`/`, (req, res) => {
  // res.render("index");
  res.status(200).send(`OK`);
});

// visit this URL to refresh the table with dummy data if anything goes wrong, i'll pull this from a file for collab purposes later
/* I should have done this the other $-based way, I know. */
// TODO: convert
app.get(`/refresh`, async (req, res) => {
  await db.query(`TRUNCATE TABLE listings; INSERT INTO listings (name, title, category, body, brief)
    VALUES
    ('Bill Higgins', 'System Administrator', 'jobs', 'body: Looking for a sysadmin for a role at  [...]', 'brief: text text text text'),
    ('Bob Darling', 'Grass Mower', 'jobs','body: test body text', 'brief: test body brief'),
    ('Trumbo Grublamps', 'Desk Scrubber', 'jobs','body: test body text', 'brief: test body brief'),
    ('Margolese Relentlesscan', 'Elephant Petting', 'activities','body: test body text', 'brief: test body brief'),
    ('Swamp Guy', 'Rascal', 'jobs','body: test body text', 'brief: test body brief'),
    ('Hypnotoad', 'Oscillator', 'get-togethers','body: test body text', 'brief: test body brief');`);
  res.send(`done`);
});

app.get(`/listings`, async (req, res) => {
  const queryStr = `SELECT * FROM listings`;
  const listingData = await db.query(`${queryStr}`);
  const rows = listingData.rows;
  res.status(200).json(rows);
  console.log("list request logged");
});

// Individual listing page
// GET to /listing/<listing id> to get only those items
app.get(`/listing/:id`, async (req, res) => {
  const queryStr = `SELECT * FROM listings WHERE id = $1`;
  const listingData = await db.query(`${queryStr}`, [req.params.id]);
  const rows = listingData.rows;
  res.status(200).json(rows);
  console.log("individual listing request");
});

// Individual category page
// GET to /category/<category name> to get only those items
app.get(`/category/:category`, async (req, res) => {
  const queryStr = `SELECT * FROM listings WHERE category = $1`;
  const listingData = await db.query(`${queryStr}`, [req.params.category]);
  const rows = listingData.rows; // partly keeping this step around to remind myself it exists
  res.status(200).json(rows);
  console.log("individual category request");
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

  res.send(`POST requested to /listings successfully:<br/>${submissionData}`);
});

// open port 3000
app.listen(3000, (req, res) => {
  console.log(`listening successfully on 3000!`);
});

/* now what i should do here is retrieve the data once, keep it around in a big cached array, and use it when needed. i will not be doing that yet */

// ((queryStr = `INSERT INTO reviews (name, rating, reviewText) VALUES ($1, $2, $3)`),
//   [userData.name, Number(userData.rating), userData.reviewText]);
