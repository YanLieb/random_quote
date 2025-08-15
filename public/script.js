import { quotes } from './quotes.js';

async function getQuotes() {
  try {
    if (!quotes) throw new Error(`No quotes found`);
    return quotes;
  } catch (err) {
    console.error("Error while loading quotes", err.message);
    return [];
  }
}

async function displayQuote() {
  const quoteElem = document.querySelector(".quote");
  const characterElem = document.querySelector(".character");

  if (!quoteElem) throw new Error(`Missing .quote element`);
  if (!characterElem) throw new Error(`Missing .character element`);

  try {
    const quotes = await getQuotes();
    const characters = Object.keys(quotes);
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    const characterQuotes = quotes[randomCharacter];
    const randomQuote = characterQuotes[Math.floor(Math.random() * characterQuotes.length)];
    quoteElem.innerHTML = randomQuote;
    characterElem.innerHTML = randomCharacter;
  } catch (err) {
    console.error(err.message);
  }
}

function randomizeQuote() {
  const btn = document.querySelector(".randomizeQuoteBtn");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    displayQuote();
  });
}

function darkMode() {
  const btn = document.querySelector(".darkModeBtn");
  let darkMode = localStorage.getItem("darkMode") === "true";

  btn.innerHTML = darkMode ? "Light Mode" : "Dark Mode";
  if (darkMode) document.body.classList.add("dark-mode");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
    btn.innerHTML = darkMode ? "Light Mode" : "Dark Mode";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayQuote();
  randomizeQuote();
  darkMode();
});
