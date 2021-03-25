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
  const nombreOld = getParameterByName('nombreOld', urlDec)
  const nombre = getParameterByName('nombre', urlDec)
  const tpOld = getParameterByName('tpOld', urlDec)
  const tp = getParameterByName('tp', urlDec)
  const calleOld = getParameterByName('calleOld', urlDec)
  const calle = getParameterByName('calle', urlDec)
  const numeroOld = getParameterByName('numeroOld', urlDec)
  const numero = getParameterByName('numero', urlDec)
  const loteOld = getParameterByName('loteOld', urlDec)
  const lote = getParameterByName('lote', urlDec)
  const manzanaOld = getParameterByName('manzanaOld', urlDec)
  const manzana = getParameterByName('manzana', urlDec)
  const colOld = getParameterByName('colOld', urlDec)
  const col = getParameterByName('col', urlDec)
  const cpOld = getParameterByName('cpOld', urlDec)
  const cp = getParameterByName('cp', urlDec)
  const municipio = getParameterByName('municipio', urlDec)
  const municipioOld = getParameterByName('municipioOld', urlDec)
  const localidadOld = getParameterByName('localidadOld', urlDec)
  const localidad = getParameterByName('localidad', urlDec)
  const obsOld = getParameterByName('obsOld', urlDec)
  const obs = getParameterByName('obs', urlDec)
  const m1Old = getParameterByName('m1Old', urlDec)
  const m1 = getParameterByName('m1', urlDec)
  const m2Old = getParameterByName('m2Old', urlDec)
  const m2 = getParameterByName('m2', urlDec)
  const tcOld = getParameterByName('tcOld', urlDec)
  const tc = getParameterByName('tc', urlDec)
  const zonaOld = getParameterByName('zonaOld', urlDec)
  const zona = getParameterByName('zona', urlDec)
  const bgOld = getParameterByName('bgOld', urlDec)
  const bg = getParameterByName('bg', urlDec)
  const mov = getParameterByName('mov', urlDec)
  const dateIn = getParameterByName('dateIn', urlDec)
  const dateSI = getParameterByName('dateSI', urlDec)
  const dateSF = getParameterByName('dateSF', urlDec)  
  if(bandCTA){
    return (
    <ShowMovs
        classes={classes} classesM={classesM} classesC={classesC} 
        CTA={CTA} idHistory={idHistory} nombre={nombre} nombreOld={nombreOld} tpOld={tpOld} tp={tp}
        calleOld={calleOld} calle={calle} numeroOld={numeroOld} numero={numero} loteOld={loteOld} lote={lote} manzanaOld={manzanaOld} manzana={manzana}
        colOld={colOld} col={col} cpOld={cpOld} cp={cp} municipioOld={municipioOld} municipio={municipio} localidadOld={localidadOld} localidad={localidad}
        obsOld={obsOld} obs={obs} m1Old={m1Old} m1={m1} m2Old={m2Old} m2={m2} tcOld={tcOld} tc={tc} zonaOld={zonaOld} zona={zona} bgOld={bgOld} bg={bg} mov={mov}
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
