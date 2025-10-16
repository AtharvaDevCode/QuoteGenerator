// script.js
const api_url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/quotes/");

async function getQuotes() {
  try {
    const response = await fetch(api_url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const fullData = await response.json();
    // The proxy returns the target data in the 'contents' field
    const data = JSON.parse(fullData.contents);
    
    // Get a random quote from the array
    const randomIndex = Math.floor(Math.random() * data.length);
    const quoteData = data[randomIndex];
    
    document.getElementById("quote").textContent = `"${quoteData.q}" — ${quoteData.a}`;
  } catch (error) {
    console.error("Error fetching quote:", error);
    document.getElementById("quote").textContent = "Could not fetch quote at the moment.";
  }
}

document.getElementById("generate-btn").addEventListener("click", getQuotes);

// Get a quote on page load
getQuotes();