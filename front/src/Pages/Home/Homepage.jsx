import Header from "../../Componenents/Header/Header";
import Hero from "../../Componenents/Hero/Hero";
import Valeur from "../../Componenents/Valeur/Valeur";
import Commencer from "../../Componenents/Commencer/Commencer";
import Steps from "../../Componenents/Steps/Steps";

import React from "react";

function Homepage() {
  return (
    <div style={{ overflow: "hidden" }}>
      <Header />
      <Hero />
      <Valeur />
      <Steps/>
      <Commencer />
    </div>
  );
}

export default Homepage;
