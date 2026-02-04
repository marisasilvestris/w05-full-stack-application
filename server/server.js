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
  res.render("index");
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

  console.log(rows);
});

// Individual listing page?
app.get(`/listings/:id`, async (req, res) => {
  const queryStr = `SELECT * FROM listings WHERE id = ${req.params.id}`;
  const listingData = await db.query(`${queryStr}`);
  const rows = listingData.rows; // partly keeping this step around to remind myself it exists
  console.log(rows);
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

/* I am just turning this off until I improve it */
// // TODO - make more intelligent
// app.delete(`/listings:id`, async (req, res) => {
//   const dbQuery = await db.query(
//     `DELETE FROM listings WHERE id = ${req.params.id} OR name = '${req.params.name}' OR title = '${req.params.title}' OR category = '${req.params.category}' OR body = '${req.params.body}' OR brief = '${req.params.brief}'`,
//   );
// });

// open port 3000
app.listen(3000, (req, res) => {
  console.log(`listening successfully on 3000!`);
});

/* now what i should do here is retrieve the data once, keep it around in a big cached array, and use it when needed. i will not be doing that yet */

// ((queryStr = `INSERT INTO reviews (name, rating, reviewText) VALUES ($1, $2, $3)`),
//   [userData.name, Number(userData.rating), userData.reviewText]);
