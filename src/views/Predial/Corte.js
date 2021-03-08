import React from "react";
import TablesCorte from "./TablesCorte.js";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
//import stylesM from "assets/jss/material-dashboard-react/components/listItemStyle.js";calendarItemStyle
import stylesM from "assets/jss/material-dashboard-react/components/calendarItemStyle.js";
import decrypt from "views/Dashboard/decrypt.js";

const useStyles = makeStyles(styles);
const useStylesM = makeStyles(stylesM);
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
export default () => {
  const classes = useStyles();
  const classesM = useStylesM();
  let urlDec = getParameterByName('v');
  urlDec = decrypt(urlDec);
  const bandInfoG = getParameterByName('bandInfoG', urlDec)
  const bandInfo = getParameterByName('bandInfo', urlDec)
  const dateSI = getParameterByName('dateSI', urlDec)
  const dateSF = getParameterByName('dateSF', urlDec)  
 
  return (
   <TablesCorte
                classes={classes}
                classesM={classesM}
                bandInfoG={bandInfoG} bandInfo={bandInfo}
                dateSI={dateSI} dateSF={dateSF} />
  );
}
