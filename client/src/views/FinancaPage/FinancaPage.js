import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ControleSection from "./Sections/ControleSection.js";
import HeaderLinks from "components/Header/HeaderLinks.js";




const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  
  

  
 


  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Controle Financeiro Pessoal"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />

      



      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Bootcamp Full Stack - Desafio Final</h1>
              <h4>
              Uma aplicação web para Controle Financeiro Pessoal com MongoDB + Node.js +
React e implantação no Heroku<br/> (BASE GERADA ALEATORIAMENTE)
              </h4>
              <br />
              
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ControleSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
