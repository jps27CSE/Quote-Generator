const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter');
const NewQuoteButton = document.getElementById('new-quote');

//Get Quote From API

async function GetQuote() {
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length >= 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;


    } catch (error) {
        GetQuote();

    }

}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

NewQuoteButton.addEventListener('click',GetQuote);
twitterBtn.addEventListener('click', tweetQuote);

// ON Load

GetQuote();