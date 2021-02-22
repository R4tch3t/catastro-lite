import React from 'react';
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import WN from "@material-ui/icons/Warning"
import Calendar from "react-calendar";
import Maps from "./Maps2";
import Checker from "./Checker.js";
import Impuestos from "./Impuestos"
import SnackbarContent from 'components/Snackbar/SnackbarContent';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import genItemsTC from './genItemsTC';
import genItemsZU from './genItemsZU';
import genItemsZR from './genItemsZR';
import {Popper} from "components/Popper";
export default (props) => {
    const {c} = props
    const {classes, classesM} = c.props
    const {horas, minutos, segundos, openDash, openCalendar, CBG, zona, openZona, tc, openTC, 
           CTA, openCTA, ctasIndexes, Y, totalN, disabledReg, currentD} = c.state
    const controls = {
      backgroundColor: "#fff",
      borderRadius: "2px",
      border: "1px solid transparent",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
      boxSizing: "border-box",
      fontFamily: "Roboto",
      fontSize: "15px",
      fontWeight: 300,
      height: "29px",
      marginLeft: "17px",
      marginTop: "10px",
      outline: "none",
      padding: "0 11px 0 13px",
      textOverflow: "ellipsis",
    }
    let h = 0
    let m = 0
    let s = 0
    
    const onChangeDI = (date) => {
      let tzoffset = (new Date()).getTimezoneOffset() * 60000;
      date.setHours(h)
      date.setMinutes(m)
      date.setSeconds(s)
      let newDate = new Date(date-tzoffset)
      c.setState({currentD: date, horas: h, minutos: m, segundos: s})
      const dateUpV = document.getElementById('dateUp')
      dateUpV.value = newDate.toISOString().slice(0, -1)
      c.handleCloseCalendar()
    }
    const valueH=(value)=>{
      h = value
      return `${value}`;
    }
    const valueM = (value) => {
      m = value
      return `${value}`;
    }
    const valueS = (value) => {
      s = value
      return `${value}`;
    }
    
    return (
      <div id="bodyOrden">
        <div className={classes.searchWrapper}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                formControlProps={{
                  className: classes.margin + " " + classes.search
                }}
                id="CTANM"
                inputProps={{
                  placeholder: "CTA",
                  type: "text",
                  onKeyUp: c.handleUpper,
                  inputProps: {
                    "aria-label": "Search"
                  }
                }}
              />
              <Button
                color="white"
                onClick={c.handleClickDash}
                aria-label="edit"
                aria-owns={openDash ? "profile-menu-list-grow" : null}
                aria-haspopup="true"
                justIcon
                round
              >
                <Search />
              </Button>

              <Popper handleClickDash={c.handleClickDash} handleClickItem={c.buscarCTA} handleCloseDash={c.handleCloseDash} openDash={openDash} classesM={classesM} 
              Items={[{k: "CTA", html: "Por CTA."},{k: "nombre", html: "Por nombre."},{k: "folio", handleClickItem: c.buscarFolio, html: "Por folio."}]} />
            </GridItem>
            <GridContainer id='checkerCP' >
              
            </GridContainer>
            
          </GridContainer>
        </div>
        <div>
          <GridContainer >
              <GridItem id='sCarta' onMouseEnter={e=>{e.target.style.cursor='pointer'}} 
              xs={12} sm={12} md={12} style={{display: 'none'}} >
              <SnackbarContent
                icon={WN}
                message={
                  '¡ADVERTENCIA! - Candidato a CARTA INVITACIÓN'
                }
                color="danger"
                
              />

              </GridItem>
          </GridContainer>
          <GridContainer id='checkerM' >

          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
              <CustomInput
                labelText="NOMBRE O RAZÓN SOCIAL:"
                id="nombre"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="FECHA DE REGISTRO:"
                id="dateUp"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onClick: c.handleClickCalendar,
                  readOnly: true,
                  
                }}
              />
               <Popper handleClickDash={c.handleClickCalendar} handleClickItem={()=>{}} handleCloseDash={c.handleCloseCalendar} openDash={openCalendar} classesM={classesM} 
              Items={[{k: "calendar", html: <>
                      <Typography id="discrete-slider" gutterBottom>
                              HORAS
                            </Typography>  
                            <Slider
                              defaultValue={horas}
                              getAriaValueText={valueH}
                              //onMouseLeave={valueLM}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              step={1}
                              marks
                              min={0}
                              max={23}
                            />
                            <Typography id="discrete-slider" gutterBottom>
                              MINUTOS
                            </Typography>  
                            <Slider
                              defaultValue={minutos}
                              getAriaValueText={valueM}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              step={1}
                              marks
                              min={0}
                              max={59}
                            />
                            <Typography id="discrete-slider" gutterBottom>
                              SEGUNDOS
                            </Typography>  
                            <Slider
                              defaultValue={segundos}
                              getAriaValueText={valueS}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              step={1}
                              marks
                              min={0}
                              max={59}
                            />
                            <Calendar onChange={onChangeDI} value={currentD} />
                    </>}]} />
            </GridItem>
            <GridItem id='checkerN' xs={12} sm={12} md={3}> </GridItem>
            
          </GridContainer>
          {/*<Map c={c} />*/}
          {/*<div><iframe frameBorder='0' height='450' src='https://www.mapdevelopers.com/area_calculator_adv.php?zoom=1&lat=40&lng=-73&height=450&width=500&button_color=eeeeee&text_color=000000&' width='500'></iframe><div style={{fontSize: 10}}><a href="https://www.mapdevelopers.com/area_finder.php">Area calculator</a> provided by <a href="https://www.mapdevelopers.com">Map Developers</a></div></div>*/}
            <div style={{display: 'none'}} id="infowindow-content">
              <span id="place-name" style={{fontWeight: 'bold'}}></span><br/>
              <span id="place-barr" ></span><br/>
              <span id="place-city" ></span><br/>
              <span id="place-country" ></span><br/>
              
            </div>
            <div style={{display: 'none'}}>
              <input id='su' type='text' style={controls}  defaultValue='Chilapa' />
              <button id='tbm' style={controls}  > TERRENO </button>
              <button id='cbm' style={controls}  > CONSTRUCCION </button>
              <button id='et' style={controls}  > ELIMINAR TRAZOS </button>  
            </div>
            <Maps c={c} />
            
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="CALLE:"
                id="calle"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  //style: {"textTransform": "uppercase"}
                  onKeyUp: c.handleUpper,
                  onBlur: c.blurCalle
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
                labelText="NÚMERO EXT:"
                id="numCalle"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: 0,
                  onKeyUp: c.handleUpper
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
              labelText="LOTE:"
              id="lote"
              formControlProps={{
                  fullWidth: true
              }}
              inputProps={{
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
              }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
              labelText="MANZANA:"
              id="manzana"
              formControlProps={{
                  fullWidth: true
              }}
              inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
              }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="COLONIA:"
                id="colonia"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
                  /* onClick: getinfoReg,
                        onChange: getinfoReg*/
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
                labelText="C.P:"
                id="cp"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  defaultValue: 41100
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="MUNICIPIO:"
                id="municipio"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "CHILAPA DE ÁLVAREZ",
                  onKeyUp: c.handleUpper
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="LOCALIDAD:"
                id="localidad"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="OBSERVACIONES:"
                id="observaciones"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "\0",
                  onKeyUp: c.handleUpper
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <Checker
              checkedIndexes={[0]}
              tasksIndexes={[0]}
              strs={["CALCULAR BASE GRAVABLE"]}
              ids={["cbg"]}
              fa={c.calcB}
            />
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText = "TERRENO (M²):"
                id="m1"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  defaultValue: 0,
                  onBlur: e => {
                    c.setZona(document.getElementById("zona").value);
                  },
                  disabled: CBG
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText = "CONSTRUCCIÓN (M²):"
                id="m2"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  defaultValue: 0,
                  onBlur: e => {
                    c.setZona(document.getElementById("zona").value);
                  },
                  disabled: CBG
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="TIPO DE CONSTRUCCIÓN:"
                id="tc"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  onKeyUp: c.handleKeyTC,
                  onClick: c.handleClickTC,
                  value: tc,
                  disabled: CBG
                }}
              />

             <Popper handleClickItem={()=>{}} handleCloseDash={c.handleCloseTC} openDash={openTC} classesM={classesM} 
              Items={genItemsTC(c.tcHandle)}  />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="ZONA:"
                id="zona"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  onKeyUp: c.handleKeyZona,
                  onClick: c.handleClickZona,
                  value: zona,
                  disabled: CBG
                }}
              />

              <Popper handleClickItem={()=>{}} handleCloseDash={c.handleCloseZona} openDash={openZona} classesM={classesM} 
                Items={c.state.tipoPredio==="u"?genItemsZU(c.zonaHandle):genItemsZR(c.zonaHandle)} /> 
            </GridItem>
          </GridContainer>
          
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="BASE GRAVABLE:"
                id="baseGravable"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  defaultValue: 0,
                  onKeyUp: c.KUEnter,
                  onBlur: c.setBg
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="NÚMERO DE CUENTA:"
                id="CTA"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  value: CTA,
                  onKeyUp: c.handleKeyCTA,
                  onClick: c.handleClickCTA
                }}
              />
              <Popper handleCloseDash={c.handleCloseCTA} openDash={openCTA} classesM={classesM} 
                Items={ctasIndexes} />
             
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="PERIODO DE PAGO:"
                id="periodo"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  defaultValue: Y,
                  onBlur: c.blurPeriodo,
                  onKeyUp: c.blurPeriodo
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="PÁGUESE LA CANTIDAD DE:"
                id="cantidadPago"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "number",
                  value: totalN
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
        <div style={{ height: 40 }} />

        <Impuestos classes={classes} classesM={classesM} c={c} />

        <div style={{ height: 40 }} />

        <div>
          <GridContainer>
            <Button
              id="regB"
              color="success"
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center"
              }}
              onClick={c.registrarO}
              disabled={disabledReg}
            >
              GENERAR ORDEN DE PAGO
            </Button>
          </GridContainer>
        </div>
      </div>
    );
}