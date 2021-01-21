const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

//Show Loading
const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

//Hide loading
const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

//Get quote from API
const getQuote = async () => {
  showLoadingSpinner();
  //using the proxyUrl to get over the CORS: https://cors-anywhere.herokuapp.com/
  //or http://api.allorigins.win/get?url=
  //https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
  const proxyUrl = "http://api.allorigins.win/get?url=";
  const apiUrl = "http://api.quotable.io/random";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { _id, tags, content, author, length } = data;
    //If author is blank, set it to unknown
    if (author === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = author;
    }

    //Reduce font size for long quotes
    if (length >= 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = content;
    //Stop loader, show quote
    removeLoadingSpinner();
  } catch (error) {
    //getQuote()
    console.log("Error message: ", error);
  }
};

//Tweet quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const TwitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(TwitterUrl, "_blank");
};

//Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuote();
