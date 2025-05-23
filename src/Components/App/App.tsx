import React from "react";
import Main from "../Main";
import Header from "../Header";
import Footer from "../Footer";
import "./App.css";
import Notes from "../Notes";

const App = () => {
  return (
    <div className="app">
      <div className="app__background">
        <div className="app__background-notes left">
          <Notes transformed={false} />
        </div>
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
        <div className="app__background-notes right">
          <Notes transformed={true} />
        </div>
      </div>
    </div>
  );
};

export default App;
