const express = require("express");
const cors = require("cors");

const { retrieveQuotes } = require("./randomQuote");

const PORT = 2609;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/quotes", async (req, res) => {
  try {
    const quotes = await retrieveQuotes();
    res.json({ quotes });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching quotes" });
  }
});

app.listen(PORT, () =>
  console.log(`Server launched on http://localhost:${PORT}`)
);
