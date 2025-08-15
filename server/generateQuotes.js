const { writeFile } = require("fs/promises");
const { resolve } = require("path");
const { retrieveQuotes } = require("./randomQuote");

async function generateStaticQuotes() {
  try {
    console.log("🔄 Génération du fichier quotes.js...");
    const quotes = await retrieveQuotes();
    const jsContent = `// Fichier généré automatiquement - ne pas modifier manuellement
export const quotes = ${JSON.stringify(quotes, null, 2)};
`;
    const outputPath = resolve(__dirname, "../public/quotes.js");
    await writeFile(outputPath, jsContent, "utf-8");
    console.log("✅ Fichier quotes.js généré avec succès dans /public/");
  } catch (error) {
    console.error("❌ Erreur lors de la génération:", error.message);
    process.exit(1);
  }
}

// Lance la génération
generateStaticQuotes();
