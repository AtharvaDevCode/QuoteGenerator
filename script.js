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

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Disable common copy/paste shortcuts
document.addEventListener('keydown', (e) => {
  // Disable Ctrl+U (View Source), Ctrl+Shift+I (DevTools), F12 (DevTools)
  if (
    e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S') ||
    e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i') ||
    e.key === 'F12' ||
    e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'x' || e.key === 'X')
  ) {
    e.preventDefault();
  }
});

// Disable text selection
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

// Disable drag and drop
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Apply user-select: none via JavaScript as a fallback
document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';
document.body.style.mozUserSelect = 'none';
document.body.style.msUserSelect = 'none';
