import React from 'react';
// react plugin for creating charts
import WN from "@material-ui/icons/Warning"
import E from "@material-ui/icons/Error"
import CheckCircle from "@material-ui/icons/CheckCircle"
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import ip from 'variables/ip';

import Snackbar from 'components/Snackbar/Snackbar';
import FormRegistro from './FormRegistro';



export default class TableRender extends React.Component {
dValue = ""
dValInt = ''
bandUpTramite = true
base64=null
countA = 0
constructor(props){
    super(props);
    this.state = {
        tr: false,
        colorSnack: "",
        iconSnack: "",
        messageSnack: "",
        classes: props.classes,
        classesM: props.classesM,
        disabledReg: false
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

validarDatos = () => {
  const CTA = document.getElementById('CTA')
  const nombre = document.getElementById('nombre')
  
  if (CTA.value === '') {
      this.showNotification("tr")
      CTA.focus()
      return false
  }

  if (nombre.value === '' || nombre.value === ' ') {
    this.showNotification("tr")
    nombre.focus()
    return false
  }
  

  this.registrarC()
}
updateNB = () => {
  const regP = document.getElementById('regP');
  regP.innerHTML="Registrar Contribuyente"
}

checkPorts = async() => {
  try{
    const sendUri = ip(2999);
    const CTA = document.getElementById('CTA').value
    const bodyJSON = {
      op: 0,
      CTA,
    }
  //console.log(`bodyJSON ${bodyJSON}`)
  //console.log(bodyJSON)
  //console.log(this.base64)
  
  const response = await fetch(sendUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyJSON)
    });
  const responseJson = await response.json().then(r => {
      //console.log(`Response1: ${r}`)

      if (r.portEn) {
        this.regE(r.portEn.n);
      }
  });
  }catch(e){

  }
}

setUnPort = async(port) => {
  try{
    const sendUri = ip(2999);
    const CTA = document.getElementById('CTA').value
    const bodyJSON = {
      op: 1,
      CTA,
      port
    }
  const response = await fetch(sendUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyJSON)
    });
  const responseJson = await response.json().then(r => {
      //console.log(`Response1: ${r}`)

      if (r.portEn) {
       // this.regE(r.portEn.n);
      }
  });
  }catch(e){

  }
}

regE = async(port=3031)=>{
  const buffer = 64000
  try{
  const CTA = document.getElementById('CTA').value
  let dataPart = '';
  let lengthE = this.base64.length;
  const check0 = document.getElementById('check0');
  const regP = document.getElementById('regP');
  const tp = check0.checked ? 'u':'r';
  const pdfToUp = document.getElementById('pdfToUp');
  const sendUri = ip(port);
  
  if(this.countA<lengthE){
    let auxA = this.countA + buffer;
    while(auxA>this.countA&&this.base64.length>this.countA){
      dataPart+=this.base64[this.countA]
      this.countA++
    }
    regP.innerHTML = "Cargando..." + parseInt(this.countA/lengthE*100)+" %"
  }
  const bodyJSON = {
    CTA,
    tp,
    dataPart,
    lengthE,
    count: this.countA,
    fileName: pdfToUp.innerHTML,
    port
  }
  //console.log(`bodyJSON ${bodyJSON}`)
  //console.log(bodyJSON)
  //console.log(this.base64)
  
  const response = await fetch(sendUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyJSON)
    });
  const responseJson = await response.json().then(r => {
      //console.log(`Response1: ${r}`)
//console.log(bodyJSON);
      if (r.next) {
        this.regE(port);
      }else if(r.nextNode){
        //console.log(r.currentCTA)
        this.countA=0;
        this.regE(port+1)
      }else{
        this.setUnPort(port);
        regP.innerHTML = "- CARGA COMPLETADA - " + parseInt(this.countA/lengthE*100)+" % "
        this.countA=0
        this.showNotification("trA")
      }
  });  
  }catch(e){
    console.log(e)
    this.countA -= (buffer-1)
    this.regE(port);
  }
}

registrarC=async()=>{
    try {

       //const sendUri = "http://34.66.54.10:3015/";
       this.setState({disabledReg: true})
       const sendUri = ip("3024")+"registrarC";
       const CTA = document.getElementById('CTA').value
       const nombre = document.getElementById('nombre').value.toUpperCase()
       const calle = document.getElementById('calle').value.toUpperCase()
       let lote = document.getElementById('lote').value.toUpperCase()
       lote = lote === '' ? 0 : lote
       let manzana = document.getElementById('manzana').value.toUpperCase()
       manzana = manzana === '' ? 0 : manzana
       let numCalle = document.getElementById('numCalle').value.toUpperCase()
       numCalle = numCalle === ''? 0:numCalle
       const colonia = document.getElementById('colonia').value.toUpperCase()
       let cp = document.getElementById('cp').value
       cp = cp === ''? 0:cp
       const municipio = document.getElementById('municipio').value.toUpperCase()
       const localidad = document.getElementById('localidad').value.toUpperCase()
       const m1 = document.getElementById('m1').value
       const m2 = document.getElementById('m2').value
       const tc = document.getElementById('tc').value
       const zona = document.getElementById('zona').value
       const bg = document.getElementById('baseGravable').value;
       const check0 = document.getElementById('check0')
       const tp = check0.checked ? 'u':'r'
       const periodo = document.getElementById('periodo').value
       const pdfToUp = document.getElementById('pdfToUp')
       const obs = document.getElementById('obs').value
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       const bodyJSON = {
         CTA,
         nombre,
         calle,
         lote,
         manzana,
         numCalle,
         colonia,
         cp,
         municipio,
         localidad,
         tp,
         m1,
         m2,
         tc,
         zona,
         bg,
         periodo,
         escrituraPath: pdfToUp.value,
         obs
       }
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {
            //  console.log(`Response1: ${r}`)
            if (r.contribuyente) {
              //if(CAT===r.contribuyente[0].CTA)
              if(this.bandUpTramite===false||pdfToUp.value===""){
                this.checkPorts()
              }else{
                this.showNotification("trA")
              }
            }else
              if (r.error) {
                if (r.error.name === "error01") {
                  this.showNotification("trE")
              }
            }
            
        });
    } catch (e) {
        this.showNotification("trE2")
        this.setState({disabledReg: false})
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
showNotification = place => {
  const {tr} = this.state
    switch (place) {
      case "tr":
        this.setState({colorSnack: 'warning',iconSnack: WN, messageSnack: 'Advertencia, rellenar todos los campos'});
        break;
        case "trE":
        this.setState({colorSnack: 'danger',iconSnack: E, messageSnack: 'Error, el número de cuenta ya éxiste'});
        break;
        case "trE2":
        this.setState({colorSnack: 'danger',iconSnack: E, messageSnack: 'Error en la conexión'});
        break;
        case "trA":
        this.setState({colorSnack: 'success',iconSnack: CheckCircle, messageSnack: 'Contribuyente registrado con éxito'});
        break;
      default:
        break;
    }
    if (!tr) {
          this.setState({tr: true})
          setTimeout(() => {
            this.setState({tr: false})
          }, 6000);
        }
  };

render() {
  const {
    tr,
    colorSnack,iconSnack,messageSnack,
    classes,
    disabledReg
  } = this.state;
 
  return (
    <CardIcon>
      <GridContainer>
        <Snackbar
          place="tr"
          color={colorSnack}
          icon={iconSnack}
          message={messageSnack}
          open={tr}
          closeNotification={() => this.setState({tr: false})}
          close
        />
        
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>PADRON</h4>
              <p className={classes.cardCategoryWhite}>
                Registrar Contribuyente
              </p>
            </CardHeader>
            <CardBody>
              <FormRegistro c={this} a={false} />
              <CardFooter>
              <Button id = 'regP'
                color="success"  
                style={{
                  display: 'flex',
                  flex: 1, 
                  alignItems: 'center'
                }}
                onClick = {this.validarDatos}
                disabled={disabledReg}
                >
                Registrar Contribuyente
              </Button>
            </CardFooter>

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        
      </GridContainer>
      
    </CardIcon>
  )
}

}