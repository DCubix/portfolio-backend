import express, { RequestHandler } from "express";
import pg from "pg";
import cors from "cors";

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json() as RequestHandler);
app.use(cors({
  origin: 'https://dcubix.github.io/'
}));

app.get("/", async (req, res) => {
  res.sendStatus(403);
});

app.get("/skills", async (req, res) => {
  const { rows } = await pool.query('select * from skill where active = true');
  res.header('Content-Type', 'application/json');
  res.json(rows);
});

app.get("/projects", async (req, res) => {
  const { rows } = await pool.query('select * from project where active = true');
  res.header('Content-Type', 'application/json');
  res.json(rows);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
