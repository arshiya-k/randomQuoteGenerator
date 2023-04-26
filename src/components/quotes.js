import React, { useEffect, useState } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import axios from "axios";


//function that is used to generate a random quote
const quoteGenerator = ({ allQuotes }) => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    //a random number between 0 and the length of the quotes array is generated
    const random = Math.floor(Math.random() * allQuotes.length);
    //the quote at the random index is selected
    const selectedQuote = allQuotes[random];
    //the quote and author are set to the state
    setQuote(selectedQuote.text);
    setAuthor(selectedQuote.author);
    //clicked is set to true so that the quote and tweet button are rendered
    setClicked(true);
  };

  //render the random quote and author
  //use react-share to create a button that allows users to share to twitter
  return (
    <div className="randomQuote">
      <button onClick={handleClick}>Get Quote</button>
      {clicked && (
        <>
          <div className="random-quote-content">
            <p>{quote}</p>
            <p>{author}</p>
          </div>
          <div className="tweet">
            <TwitterShareButton title={`"${quote}" - ${author}`} url="https://www.letswork.io/">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </>
      )}
    </div>
  );
};

//this is the main component that handles all the components/pieces related to the quotes
const Quotes = () => {
  //this is the state that holds all the quotes - initialize as an empty array
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    //callback is an async function that fetches the quotes from the API
    async function fetchQuotes() {
      //get request from the API to fetch quotes
      const response = await axios.get("https://type.fit/api/quotes");
      //some of the quotes have null as the author, so we replace it with "Anonymous"
      const formattedQuotes = response.data.map((quote) => {
        if (quote.author === null) {
          quote.author = "Anonymous";
        }
        return quote;
      });
      //set the state to the formatted quotes
      setQuotes(formattedQuotes);
    }
    //call the callback function
    fetchQuotes();
  }, []);

  //this function creates the quotes HTML elements for the quotes
  const createQuotes = (allQuotes) => {
    return (
      <div className="quoteBox">
        <ul>
          {allQuotes.map((quote, index) => (
            <li key={index}>
              <p>
                "{quote.text}" - {quote.author}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  //the main return statement that renders the quotes component
  //the quotesContainer div contains the quotes and the quoteGenerator component
  return (
    <div className="quotes-body">
      <h1>Quotes</h1>
      <div className="quotesContainer">
        {createQuotes(quotes)}
        {quoteGenerator({ allQuotes: quotes })}
      </div>
    </div>
  );
};

export default Quotes;
