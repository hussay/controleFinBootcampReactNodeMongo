/*eslint-disable*/
import React,{useState,useEffect,useRef} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { Icon } from "@material-ui/core";

//api//api
import * as api from "../../api/apiService.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const meubutton = useRef(null);
  
  

  
  var contatador = 0;
  const restoreBaseDadosNovo = async ()=>{
    if(!myVar){
      
      myFunction();
    }else{
      
      myStopFunction();
    }
    
    
  }
  const restore = async ()=>{
   
     
      const restoreBD = await api.getRestore();
      meubutton.current.innerHTML = "<span style='color:green'> Restaurado </span>";
      setTimeout(function(){ 
        myStopFunction();
       }, 3000);
      
      
  }


  var myVar;
  const myFunction = () => {
    
    meubutton.current.innerHTML = "<span style='color:red'> Restauração Em andamento</span>";
    document.querySelector("#nomelink").textContent = "<span style='color:red'> Restauração Em andamento</span>";
    myVar = setTimeout(function(){ restore() }, 5000);
  }
  
  const myStopFunction = () => {
    clearTimeout(myVar);
    myVar = null;
    meubutton.current.innerHTML = "Restaura BD";
     
  }


  return (
    <List className={classes.list}>
      
     
      <ListItem className={classes.listItem}>
        <Button
          onClick={restoreBaseDadosNovo}
          color="transparent"
          target="_blank"
          className={classes.navLink}
          id="buttonRecarregar"
         
        >
          <Icon>refresh</Icon> <span id="nomelink" ref={meubutton}>Restaura BD</span>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        
        <Tooltip
          id="instagram-twitter"
          title="Projeto disponível no meu Github"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://github.com/hussay"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-github"} />
          </Button>
        </Tooltip>
      </ListItem>
      
    </List>
  );
}
