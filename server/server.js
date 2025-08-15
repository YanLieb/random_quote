const express = require("express");
const cors = require("cors");
const { writeFile } = require("fs/promises");
const { resolve } = require("path");

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

async function generateStaticQuotes() {
  try {
    const quotes = await retrieveQuotes();
    const jsContent = `// Fichier généré automatiquement - ne pas modifier manuellement
export const quotes = ${JSON.stringify(quotes, null, 2)};
`;
    const outputPath = resolve(__dirname, "../public/quotes.js");
    await writeFile(outputPath, jsContent, "utf-8");
    console.log("✅ Fichier quotes.js généré dans /public/");
  } catch (error) {
    console.error("❌ Erreur lors de la génération:", error.message);
  }
}

app.get("/generate", async (req, res) => {
  try {
    await generateStaticQuotes();
    res.json({ message: "Fichier quotes.js généré avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la génération" });
  }
});

generateStaticQuotes();

app.listen(PORT, () =>
  console.log(`Server launched on http://localhost:${PORT}`)
);
