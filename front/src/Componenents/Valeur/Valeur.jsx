import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import "./Valeur.css";
import data from "../Accordion.jsx"; // Assure-toi que le chemin est correct

function Valeur() {
  //  Utilisation correcte de useState pour gérer les classes
  const [expandedItems, setExpandedItems] = useState({});

  const handleToggle = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: prev[index] === "expanded" ? "collapsed" : "expanded",
    }));
  };

  return (
    <section className="v-wrapper">
      <div className="padding innerwidth flexcenter v-container">
        {/* left side */}
        <div className="v-left  val-image">
          <img src="./COVOITURAGE3.jpg" alt="Valeurs" />
        </div>

        {/* right side */}
        <div className="flexcolstart v-right">
          <span
            style={{
              color: "#f8d149",
              fontSize: "larger",
              fontWeight: "bolder",
            }}
          >
            Nos Valeurs Et Aspirations
          </span>
          <span
            style={{ fontSize: "45px", fontWeight: "bolder", color: "#192c4a" }}
          >
            Ce que nous souhaitons vous transmettre
          </span>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <br />
            Magnam quos dignissimos nobis pariatur dicta totam in dolorem dolor
            minima illum!
          </span>

          <Accordion allowMultipleExpanded={false} preExpanded={[0]}>
            {data.map((item, i) => (
              <AccordionItem
                className={`accordionItem ${expandedItems[i] || "collapsed"}`}
                key={i}
                uuid={i}
              >
                <AccordionItemHeading>
                  <AccordionItemButton
                    className="flexcenter  accordionButtom"
                    onClick={() => handleToggle(i)}
                  >
                    <div className="flexcenter icon  left-icon">
                      {item.icon}
                    </div>
                    <span>{item.heading}</span>
                    <div className=" icon right-icon">
                      <MdOutlineArrowDropDown size={20} />
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <p className="secondaryText ">{item.detail}</p>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <footer className="footer">
        <p>© 2025 Covoiturage CEVROUTE - Tous droits réservés</p>
      </footer>
    </section>
  );
}

export default Valeur;
