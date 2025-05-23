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
          <img src="./valeurimg.jpg" alt="Valeurs" />
        </div>

        {/* right side */}
        <div className="flexcolstart v-right">
          <span
            style={{ fontSize: "45px", fontWeight: "bolder", color: "#3372e3" }}
          >
            Ce que nous souhaitons vous transmettre
          </span>
          <span>
             Partagez vos trajets réguliers ou occasionnels et récupérez une
            partie de vos frais. Notre processus de vérification assure votre
            sécurité et celle de vos passagers, inscriez-vous pour devenir
            conducteur. <br />
           
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
    </section>
  );
}

export default Valeur;
