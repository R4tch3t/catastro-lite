import React from 'react';
import {isMobile} from "react-device-detect";
//import Skeleton from 'react-loading-skeleton';
import SkTables from './skTables'
import SkSingle from './skSingle'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TablePadrones from "components/Table/TablePadrones.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import {Popper} from "components/Popper";
import ip from 'variables/ip';
import comprobarU from 'views/UserProfile/comprobarU';
import decrypt from "views/Dashboard/decrypt.js";
import ls from 'local-storage'
import cookie from "react-cookies";
import LocalAtm from "@material-ui/icons/AssignmentInd";
import CardFooter from "components/Card/CardFooter.js";
import DateRange from "@material-ui/icons/DateRange";

export default class TableRender extends React.Component {

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
        bandLoad2: false,
        bandPost: true,
        lengthUR: 0
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
nextP = 50
pI = 0;
rpI = 5;

getLength = async(op) => {
  try {
    this.setState({bandLoad2: false})
    const sendUri = ip("3023")+"allPadrones";
    const bodyJSON = {
         op
    }
    const response = await fetch(sendUri, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyJSON)
    });

    const responseJson = await response.json().then(r => {
      this.setState({bandLoad2: true});
        if(r&&r.lengthUR){
          this.setState({lengthUR: r.lengthUR});
        }
    });
  }catch(e){

  }
}

allPadrones=async(CTAnombre,bandInit,bandR)=>{
    try {
      this.setState({bandLoad: false})
       //const sendUri = "http://34.66.54.10:3015/";
       const sendUri = ip("3023")+"allPadrones";
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       
       const bodyJSON = {
         CTAnombre: CTAnombre,
         tipoB: this.tipoB,
         countP: this.countP,
         nextP: this.nextP
       }
       
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {
          /*if(bandInit){
            this.getLength();
          }*/
            //let data = [];
            const {dataTable} = this.state
            let i = 0
            let calle = "";
            let lote = "";
            let manzana = "";
            let numero = "";
            let colonia = "";
            let lengthUR = 0;
            if (r.contribuyenteu) {
              lengthUR+=r.contribuyenteu.length;
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
               
                dataTable.push({
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
              lengthUR+=r.contribuyenter.length;
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
                dataTable.push({
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

            if((this.tipoB===0||this.tipoB===1)&&CTAnombre){
              this.setState({/*dataTable: data,*/ lengthUR,bandLoad: true, bandPost: false});
            }else{
             // this.getLength(1);
              this.setState({/*dataTable: data,*/ bandLoad: true, bandPost: false});
            }
            
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
bandSD = false
handleUpper = e => {
  if(!isMobile){
    if (e.which === 32 || e.which > 39) {
      this.selectionStartNombre = e.target.selectionStart
      this.selectionEndNombre = e.target.selectionEnd
      e.target.value = e.target.value.toUpperCase()
      e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
    }
  }
  console.log(e.which)
  //if (e.target.value === '') {
    //this.allPadrones(e.target.value)
  //}
  //if(e.target.value){
    if(e.which===13&&!e.target.value){
      this._allPadrones('');
      this.bandSD=false
    }else{
      this.runSearch(e.target.value);
    }
  //}
}
handleDown = e => {
  
  if(e.target.value){
    this.bandSD=true
    //this._allPadrones('')
  }

}

_allPadrones = (CTAnombre) => {
  this.countP = 0
      this.nextP = 50
      this.pI=0;
      this.setState({dataTable: []});
      this.allPadrones(CTAnombre)
      if(!this.state.bandPost){
                
              }else{
                  if(!this.bandLoading){
                      this.bandLoading=true;
                      this.waitPost();
                  }
              }
}

runSearch=(CTAnombre)=>{
    if(!CTAnombre){
      this.getLength(1);
    }else{
      this._allPadrones(CTAnombre)
    }
}

waitPost = async() => {
  const CTAnombre = document.getElementById('CTANM');
  while(this.state.bandPost){
      await this.sleep(300);    
  }
  this.allPadrones(CTAnombre.value);
  this.bandLoading=false;

}
sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
}
buscarCTA = (key) => (event) => {
  const CTAnombre = document.getElementById('CTANM').value;
  //const checkU = document.getElementById('check0');
  
  this.tipoB = parseInt(key)
  const labelB = this.tipoB===0?'CTA':'NOMBRE'
  this.setState({labelB})
  //if (CTAnombre !== '') {
    this.runSearch(CTAnombre)  
 // }
}


componentDidMount(){
  this.getLength(1);
  this.allPadrones('',true);
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
    labelB,
    lengthUR
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
              
              <div className={classes.searchWrapper}>
                

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
                      <Popper handleClickItem={()=>{}} handleCloseDash={this.handleCloseDash} openDash={openDash} classesM={classesM} 
                         Items={[{k: "0", html: `Por CTA.`, handleClickItem: this.buscarCTA, i: 0},{k: "1", html: `Por nombre.`, handleClickItem: this.buscarCTA, i: 1}]}  />
                    
                  </GridItem>
                  
                </GridContainer>
              </div>
              <SkTables height={75} bandLoad={this.state.bandLoad} c={this.rpI} />
              { this.state.bandLoad &&
                <TablePadrones
                  tableHeaderColor="warning"
                  c={this}
                  tableHead={headCells}
                  tableData={dataTable}
                />
              }

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>

        <GridItem xs={12} sm={6} md={12}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <LocalAtm />
              </CardIcon>
              <p className={classes.cardCategory}>NÚMERO TOTAL DE CUENTAS REGISTRADAS: </p>
              {/*this.state.bandLoad2 || <Skeleton height={50} animation="wave" />*/}
              <SkSingle height={50} bandLoad={this.state.bandLoad2} c={1} />
              {this.state.bandLoad2 && <h3 className={classes.cardTitle}>{`N° `}{lengthUR}</h3> }
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {`FECHA: ${new Date().toLocaleDateString()} `}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
      <GridContainer>
        
      </GridContainer>
      
    </CardIcon>
  )
}

}