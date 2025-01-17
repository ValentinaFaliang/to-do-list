import React from "react";
import Main from "../Main";
import Header from "../Header";
import Footer from "../Footer";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <article className="app__container">
        <section className="app__inner-container">
          <header>
            <Header />
          </header>
          <main>
            <Main />
          </main>
          <footer>
            <Footer />
          </footer>
        </section>
      </article>
    </div>
  );
};

export default App;
