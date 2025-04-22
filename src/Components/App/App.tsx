import React from "react";
import Main from "../Main";
import Header from "../Header";
import Footer from "../Footer";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="app__container">
        <div className="app__inner-container">
          <header>
            <Header />
          </header>
          <main>
            <Main />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
