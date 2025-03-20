async function getQuotes() {
  try {
    const response = await fetch("http://localhost:2609/quotes");
    const { quotes } = await response.json();

    if (!quotes) throw new Error(`No quotes found in ${response.json()}`);

    return quotes.perceval;
  } catch (err) {
    console.error("Error while loading quotes", err.message);
    return [];
  }
}

async function displayQuote(quoteElemClass) {
  const quoteElem = document.querySelector(quoteElemClass);

  if (!quoteElem) throw new Error(`Missing ${quoteElemClass} element`);

  try {
    const quotes = await getQuotes();

    if (!quotes || quotes.length === 0)
      throw new Error(`No quotes found in ${quotes}`);

    let lastQuote = null;
    let randomQuote;
    do {
      randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (randomQuote === lastQuote);

    lastQuote = randomQuote;
    quoteElem.innerHTML = randomQuote;
  } catch (err) {
    console.error(err.message);
  }
}

function randomizeQuote(btnElemClass) {
  const btn = document.querySelector(btnElemClass);

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    displayQuote(".quote");
  });
}

function darkMode(btnElemClass) {
  const btn = document.querySelector(btnElemClass);
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

function displayQuoteComponent() {
  const pageContent = document.querySelector(".page-content");
  pageContent.innerHTML = html`
    <button type="button" class="darkModeBtn">Light Mode</button>
    <div class="quote-container">
      <p class="quote">Click on the button to get a random Perceval Quote</p>
    </div>
    <button class="randomizeQuoteBtn" type="submit">New quote</button>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  displayQuoteComponent();
  displayQuote(".quote");
  randomizeQuote(".randomizeQuoteBtn");
  darkMode(".darkModeBtn");
});
