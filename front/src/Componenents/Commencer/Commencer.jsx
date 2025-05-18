import React from 'react'
import './Commencer.css'
import { Link } from 'react-router-dom';

function Commencer() {
  return (
    <section className="g-wrapper">
      <div className="padding innerwidth">
        <div className="flexcolcenter inner-container">
          <span className="first-text">Venez faire un tour !</span>
          <br />
          <span className="second-text">Inscrivez vous sur CEVROUTE</span>
          <br />

          <span className="second-text">
            Rouler ensemble,c’est rouler plus malin… et plus fun !
          </span>
          <div>
            <br />

            <Link to="./login" className="com-button ">
              Commencer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Commencer
