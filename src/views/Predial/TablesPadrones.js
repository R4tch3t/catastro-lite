import React from 'react';
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import {isMobile} from "react-device-detect";
import Loader from "react-loader-spinner";
//import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TablePadrones from "components/Table/TablePadrones.js";
import classNames from "classnames";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
//import Tasks from "components/Tasks/Tasks.js";
//import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import Poppers from "@material-ui/core/Popper";
import ip from 'variables/ip';
import comprobarU from 'views/UserProfile/comprobarU';
import decrypt from "views/Dashboard/decrypt.js";
import ls from 'local-storage'
import cookie from "react-cookies";

export default class TableRender extends React.Component {
state={
    dataTable: [],
    classes: null,
    openDash: null,
    setOpenDash: null,
    labelB: null,
    bandLoad: false
}
tipoB = 1
handleCloseDash = () => {
 // setOpenDash(null);
 //const {setOpenDash} = this.state
 this.setState({openDash: null})
};
constructor(props){
    super(props);
    this.state = {
        dataTable: [],
        classes: props.classes,
        classesM: props.classesM,
        openDash: null,
        setOpenDash: null,
        labelB: 'NOMBRE',
        bandLoad: false,
        bandPost: true
    };
    
}

round = (num, decimales = 2)=>{
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;
  if (decimales === 0) //con 0 decimales
    return signo * Math.round(num);
  // round(x * 10 ^ decimales)
  num = num.toString().split('e');
  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
  // x * 10 ^ (-decimales)
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}
countP = 0
allPadrones=async(CTAnombre,bandInit)=>{
    try {
      this.setState({bandLoad: false})
       //const sendUri = "http://34.66.54.10:3015/";
       const sendUri = ip("3023")+"allPadrones";
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       const bodyJSON = {
         CTAnombre: CTAnombre,
         tipoB: this.tipoB,
         countP: this.countP
       }
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
             //   "Access-Control-Allow-Methods":"POST",
                //'Access-Control-Allow-Origin': '*',
                //'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {
            //  console.log(`Response1: ${r}`)
            //this.setState({bandPost: false});
            let data = [];
            let i = 0
            let calle = "";
            let lote = "";
            let manzana = "";
            let numero = "";
            let colonia = "";
            if (r.contribuyenteu) {
             // console.log(r.contribuyenteu)
             r.contribuyenteu.forEach(e => {
               if(r.ubiprediou&&r.ubiprediou[`${e.CTA}`]!==undefined){
                calle = r.ubiprediou[`${e.CTA}`].calle;
                lote = r.ubiprediou[`${e.CTA}`].lote;
                manzana = r.ubiprediou[`${e.CTA}`].manzana;
                numero = r.ubiprediou[`${e.CTA}`].numero;
                colonia = r.ubiprediou[`${e.CTA}`].colonia;
              //  i++;
               }else{
                calle = "";
                lote = "";
                manzana = "";
                numero = "";
                colonia = "";
               }
               
                data.push({
                  key: `${e.CTA}u`,
                  cta: e.CTA,
                  NOMBRE: e.contribuyente,
                  ubi: (calle?"CALLE: "+calle+", ":"")+(lote?"LOTE: "+lote+", ":"")+(manzana?"MZA: "+manzana+", ":"")+(numero?"N°: "+numero+", ":"")+(colonia?"COL: "+colonia:""),
                  localidad: e.localidad,
                  bg: e.orden?e.orden.bg:e.bg,
                  tp: 'URBANO',
                  escriturasPath: e.escriturasPath
                })
               // i++;
             })

            }
            if (r.contribuyenter) {
             // i=0;
              r.contribuyenter.forEach(e => {
               if(r.ubipredior&&r.ubipredior[`${e.CTA}`]!==undefined){
                calle = r.ubipredior[`${e.CTA}`].calle;
                lote = r.ubipredior[`${e.CTA}`].lote;
                manzana = r.ubipredior[`${e.CTA}`].manzana;
                numero = r.ubipredior[`${e.CTA}`].numero;
                colonia = r.ubipredior[`${e.CTA}`].colonia;
              //  i++;
               }else{
                calle = "";
                lote = "";
                manzana = "";
                numero = "";
                colonia = "";
               }
                data.push({
                  key: `${e.CTA}r`,
                  cta: e.CTA,
                  NOMBRE: e.contribuyente,
                  ubi: (calle?"CALLE: "+calle+", ":"")+(lote?"LOTE: "+lote+", ":"")+(manzana?"MZA: "+manzana+", ":"")+(numero?"N°: "+numero+", ":"")+(colonia?"COL: "+colonia:""),
                  localidad: e.localidad,
                  bg: e.orden?e.orden.bg:e.bg,
                  tp: 'RÚSTICO',
                  escriturasPath: e.escriturasPath
                })
              })

            }
            this.setState({dataTable: data, bandLoad: true, bandPost: false});
            
            /*else if (r.error.name === "error01") {
                       this.removeCookies()
                       confirmAlert({
                         title: "¡Error!",
                         message: "La contraseña es incorrecta.",
                         buttons: [{
                           label: "Aceptar",
                           onClick: () => {
                             this.props.history.push("/entrar");
                           }
                         }]
                       });
                     }*/
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

getParameterByName=(name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


changeDash = event => {
  const {openDash} = this.state;
  if (openDash && openDash.contains(event.target) ) {
    //setOpenDash(null);
    this.setState({openDash: null});
  } else {
    //setOpenDash(event.currentTarget);
    this.setState({openDash: event.currentTarget});
  }
}

handleClickDash = event => {
  this.changeDash(event);
};
selectionStartNombre = null
selectionEndNombre = null
bandLoading = false;
handleUpper = e => {
  if(!isMobile){
    if (e.which === 32 || e.which > 39) {
      this.selectionStartNombre = e.target.selectionStart
      this.selectionEndNombre = e.target.selectionEnd
      e.target.value = e.target.value.toUpperCase()
      e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
    }
  }
  //if (e.target.value === '') {
    //this.allPadrones(e.target.value)
    if(!this.state.bandPost){
                this.allPadrones(e.target.value)
            }else{
                if(!this.bandLoading){
                    this.bandLoading=true;
                    this.waitPost();
                }
            }
  //}
}

waitPost = async() => {
  const CTAnombre = document.getElementById('CTANM');
  while(this.state.bandPost){
      await this.sleep(300);    
  }
  this.allPadrones(CTAnombre.value)
  this.bandLoading=false;

}
sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
}
buscarCTA = (key) => (event) => {
  const CTAnombre = document.getElementById('CTANM').value;
  //const checkU = document.getElementById('check0');
  this.tipoB = key
  const labelB = key===0?'CTA':'NOMBRE'
  this.setState({labelB})
  //if (CTAnombre !== '') {
  this.allPadrones(CTAnombre)    
 // }
}


componentDidMount(){
  this.allPadrones('');
  const idUsuario = decrypt(cookie.load("idUsuario"));
  const pass = decrypt(ls.get("pass"));
  const nombre = decrypt(cookie.load("nombre"));
  const correo = decrypt(cookie.load("correo"));
  const edad = decrypt(cookie.load("edad"));
  const idRol = decrypt(ls.get("idRol"));
  comprobarU(idUsuario,pass,nombre,correo,edad,idRol);
}

render() {
  const {
    dataTable,
    classes,
    classesM,
    openDash,
    labelB
  } = this.state;
  const headCells = [
    { id: 'cta', numeric: true, disablePadding: true, label: 'CTA' },
    { id: 'NOMBRE', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'tp', numeric: false, disablePadding: false, label: 'Tipo' },
    { id: 'carta', numeric: false, disablePadding: false, label: 'Carta' },
    { id: 'certi', numeric: false, disablePadding: false, label: 'Certificado' },
    { id: 'escritura', numeric: false, disablePadding: false, label: 'Expediente' },
   // { id: 'construccion', numeric: true, disablePadding: false, label: 'Construccion' },
  ]
  return (
    <CardIcon>
      
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>PREDIAL</h4>
              <p className={classes.cardCategoryWhite}>
                Lista de contribuyentes
              </p>
            </CardHeader>
            <CardBody>
              {/*<Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  r1
                ]}
              />*/              
              }
              <div className={classes.searchWrapper}>
                
                <Loader
                  type="BallTriangle"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  visible={!this.state.bandLoad}
                  style={{position:'absolute', top: "50%", left: '42%'}}
                  //timeout={3000} //3 secs
                />

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      formControlProps={{
                        className: classes.margin + " " + classes.search
                      }}
                      id="CTANM"
                      inputProps={{
                        placeholder: labelB,
                        type: "text",
                        onKeyUp: this.handleUpper,
                      //  onMouseUp: this.handleUpper,
                        //value: idUsuario,

                        inputProps: {
                          "aria-label": "Search"
                        }
                      }}
                    />
                    <Button
                      color="white"
                      onClick={this.handleClickDash}
                      aria-label="edit"
                      aria-owns={openDash ? "profile-menu-list-grow" : null}
                      aria-haspopup="true"
                      justIcon
                      round
                    >
                      <Search />
                    </Button>

                    <Poppers
                      open={Boolean(openDash)}
                      anchorEl={openDash}
                      transition
                      disablePortal
                      className={
                        classNames({ [classesM.popperClose]: !openDash }) +
                        " " +
                        classesM.popperNav
                      }
                      style={{ zIndex: 9999 }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="profile-menu-list-grow"
                          style={{
                            transformOrigin:
                              placement === "bottom" ? "center top" : "center bottom"
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={this.handleCloseDash}>
                              <MenuList role="menu">
                                <MenuItem
                                  key={"cuenta"}
                                  className={classesM.dropdownItem}
                                  onClick={this.buscarCTA(0)}
                                >
                                  Por CTA.
                                </MenuItem>
                                <MenuItem
                                  key={"nombre"}
                                  className={classesM.dropdownItem}
                                  onClick={this.buscarCTA(1)}
                                >
                                  Por nombre
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Poppers>
                  </GridItem>
                  
                </GridContainer>
              </div>
              
              <TablePadrones
                tableHeaderColor="warning"
                tableHead={headCells}
                tableData={dataTable}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        {/*<GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <LocalAtm />
              </CardIcon>
              <p className={classes.cardCategory}>Crédito FOVISSTE</p>
              <h3 className={classes.cardTitle}>{`TOTAL: $`}{totalC}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Últimos {lastD} meses
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <LocalAtm />
              </CardIcon>
              <p className={classes.cardCategory}>Seguro de daños FOVISSTE</p>
              <h3 className={classes.cardTitle}>{`TOTAL: $`}{totalS}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Últimos {lastD} meses
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/*<GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={creditoFovisste.data}
                type="Line"
                options={creditoFovisste.options}
                listener={creditoFovisste.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Credito FOVISSTE</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> {porcentajeC}%
                </span>{" "}
                créditos por quincena.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Créditos de 2019
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        </GridContainer>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={seguroFovisste.data}
                type="Bar"
                options={seguroFovisste.options}
                responsiveOptions={seguroFovisste.responsiveOptions}
                listener={seguroFovisste.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Seguro de daños FOVISSTE</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> {porcentajeS}%
                </span>{" "}
                seguro por quincena.</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Seguros de 2019
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/*<GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>*/
        }
      </GridContainer>
      
    </CardIcon>
  )
}

}