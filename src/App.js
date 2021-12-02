import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [cytaty, setCytaty] = useState([]);
  const [wylosowaneCytaty, setWylosowaneCytaty] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    (async () => {
      const rawResponse = await fetch(
        "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json",
        {}
      );
      const content = await rawResponse.json();
      setCytaty(content);
    })();
  }, []);

  function random1(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function setQuote() {
    setWylosowaneCytaty((prev) => {
      return [...prev, cytaty[random1(0, cytaty.length - 1)]];
    });
  }

  function handleNext() {
    if (currentQuote === wylosowaneCytaty.length) {
      setQuote();
      setCurrentQuote((prev) => prev + 1);
    } else {
      setCurrentQuote((prev) => prev + 1);
    }
  }

  function handlePrev() {
    if (currentQuote > 1) {
      setCurrentQuote((prev) => prev - 1);
    }
  }

  return (
    <div className="App">
      <h1>Twój cytat</h1>
      {wylosowaneCytaty.length > 0 && (
        <article>
          <p>"{wylosowaneCytaty[currentQuote - 1].quote}"</p>
          <p>{wylosowaneCytaty[currentQuote - 1].author}</p>
        </article>
      )}
      <div className="buttons">
        <button onClick={handlePrev}>Poprzedni</button>
        <button onClick={handleNext}>Następny</button>
      </div>
    </div>
  );
}

export default App;
