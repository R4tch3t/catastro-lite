import React from "react";
import TablesMovs from "./TablesMovs.js";
import ShowMovs from "./ShowMovs.js";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import decrypt from "views/Dashboard/decrypt.js";

import stylesM from "assets/jss/material-dashboard-react/components/listItemStyle.js";
import stylesC from "assets/jss/material-dashboard-react/components/calendarItemStyle.js";

const useStyles = makeStyles(styles);
const useStylesM = makeStyles(stylesM);
const useStylesC = makeStyles(stylesC);

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
  const classesC = useStylesC();
  let urlDec = getParameterByName('v');
  urlDec = decrypt(urlDec);
  const bandCTA = getParameterByName('bandCTA', urlDec)
  const CTA = getParameterByName('CTA', urlDec)
  const idHistory = getParameterByName('idHistory', urlDec)
  const nombre = getParameterByName('nombre', urlDec)
  const tp = getParameterByName('tp', urlDec)
  const calle = getParameterByName('calle', urlDec)
  const numero = getParameterByName('numero', urlDec)
  const lote = getParameterByName('lote', urlDec)
  const manzana = getParameterByName('manzana', urlDec)
  const col = getParameterByName('col', urlDec)
  const cp = getParameterByName('cp', urlDec)
  const municipio = getParameterByName('municipio', urlDec)
  const localidad = getParameterByName('localidad', urlDec)
  const obs = getParameterByName('obs', urlDec)
  const m1 = getParameterByName('m1', urlDec)
  const m2 = getParameterByName('m2', urlDec)
  const tc = getParameterByName('tc', urlDec)
  const zona = getParameterByName('zona', urlDec)
  const bg = getParameterByName('bg', urlDec)
  const mov = getParameterByName('mov', urlDec)
  const dateIn = getParameterByName('dateIn', urlDec)
  const dateSI = getParameterByName('dateSI', urlDec)
  const dateSF = getParameterByName('dateSF', urlDec)  
  if(bandCTA){
    return (
    <ShowMovs
        classes={classes} classesM={classesM} classesC={classesC} 
        CTA={CTA} idHistory={idHistory} nombre={nombre} tp={tp}
        calle={calle} numero={numero} lote={lote} manzana={manzana}
        col={col} cp={cp} municipio={municipio} localidad={localidad}
        obs={obs} m1={m1} m2={m2} tc={tc} zona={zona} bg={bg} mov={mov}
        dateIn={dateIn}
        dateSI={dateSI} dateSF={dateSF} />
    );
  }else{
    return (
    <TablesMovs
        classes={classes} classesM={classesM} classesC={classesC} 
        dateSI={dateSI} dateSF={dateSF} />
    );
  }
}
