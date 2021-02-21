import React from 'react';
// react plugin for creating charts
import WN from "@material-ui/icons/Warning"
import E from "@material-ui/icons/Error"
import CheckCircle from "@material-ui/icons/CheckCircle"
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Loader from "react-loader-spinner";
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

dValue = "\0"
dValInt = 0
bandUpTramite = true
base64=null
countA = 0
constructor(props){
    super(props);
    this.state = {
        tr: false,
        iconSnack: '',
        messageSnack: "",
        trE: false,
        trE2: false,
        trA: false,
        classes: props.classes,
        classesM: props.classesM,
        disabledReg: false,
        iconTo: WN,
        opSnack: false,
        colorSnack:'info',
        bandLoad: true,
        topAna: 20,
        bandPost: false
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
  const pdfToUp = document.getElementById('pdfToUp')

  if (CTA.value === '') {
      this.showNotification("tr")
      CTA.focus()
      return false
  }

  if (nombre.value === '' || nombre.value === ' ' || nombre.value === '\0') {
    this.showNotification("tr")
    nombre.focus()
    return false
  }

  this.actualizarC()
  
  if(this.bandUpTramite===false||pdfToUp.value===""){
   // console.log(this.bandUpTramite)
    this.checkPorts()
  }

}

checkPorts = async() => {
  try{
    const sendUri = ip(2999);
    const CTA = document.getElementById('CTA').value
    const bodyJSON = {
      op: 0,
      CTA,
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
        const Smn1 = document.getElementById("Sm1")
        if(Smn1){
          Smn1.innerHTML=""
        }
        this.setState({iconTo: WN, colorSnack: 'info', opSnack: false, bandLoad: true, topAna: 20})
        this.regE(r.portEn.n);
       // this.setState({opSnack:1})
      }
  });
  }catch(e){
    console.log(e)
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

regE = async(port=3131,analize=false,npage=0)=>{
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
    regP.innerHTML = "Cargando... "+parseInt(this.countA/lengthE*100)+" %"
  }
  const bodyJSON = {
    CTA,
    tp,
    dataPart,
    lengthE,
    count: this.countA,
    fileName: pdfToUp.innerHTML,
    port,
    analize,
    npage
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
      }else if(r.next===0){
        //regP.innerHTML = " ANALIZANDO... " + parseInt(this.countA/lengthE*100)+" % "
        regP.innerHTML = "- CARGA COMPLETADA - " + parseInt(this.countA/lengthE*100)+" % "
        this.setState({opSnack: true})
        document.getElementById("analizeBtn").innerHTML=" ANALIZANDO... 0 % "
        //document.getElementById("snackAnaL").style.opacity=1
        this.setState({opSnack: true})

        this.regE(port,true)
      }else if(r.analising){
        document.getElementById("analizeBtn").innerHTML=`ANALIZANDO... ${r.p}, hoja ${r.npage} de ${r.lengthP}`
        this.regE(port,true,r.npage)
      }else if(r.analize){
        this.setUnPort(port);
        this.setState({iconTo: CheckCircle, colorSnack: 'success', bandLoad: false, topAna: 5})
        regP.innerHTML = "- CARGA COMPLETADA - " + parseInt(this.countA/lengthE*100)+" % "
        document.getElementById("analizeBtn").innerHTML=r.p
        this.countA=0
        this.showNotification("trA")
        
        if(r.S&&r.S!==null&&r.S!==undefined&&r.S!==""&&r.S!=="undefined"){
          r.S=r.S.split(" ").join("")
          if(r.S!==""){
            document.getElementById("m1").value=r.S
            document.getElementById("Sm1").innerHTML="*  Terreno: "+r.S+" m²"
          }
        }else{
          document.getElementById("Sm1").value=""
        }
      }

  });  
  }catch(e){
    console.log(e)
    this.countA -= (buffer-1)
    this.regE(port);
  }
}

updateNB = () => {
  const regP = document.getElementById('regP');
  regP.innerHTML="Actualizar Contribuyente"
}

padrones=async(tp)=>{
  try {
    this.setState({bandPost: true})
    let CTAnombre = document.getElementById('CTA');
    const nombre = document.getElementById('nombre')
    const calle = document.getElementById('calle')
    let lote = document.getElementById('lote')
    let manzana = document.getElementById('manzana')
    let numCalle = document.getElementById('numCalle')
    const colonia = document.getElementById('colonia')
    let cp = document.getElementById('cp')
    const municipio = document.getElementById('municipio')
    const localidad = document.getElementById('localidad')
    const m1 = document.getElementById('m1')
    const m2 = document.getElementById('m2')
    const tc = document.getElementById('tc')
    const zona = document.getElementById('zona')
    const bg = document.getElementById('baseGravable');
    const obs = document.getElementById('obs');
    const pdfToUp = document.getElementById('pdfToUp');
    const regP = document.getElementById('regP');
    const sendUri = ip('3015')+"padrones";
    const bodyJSON = {
      CTAnombre: CTAnombre.value,
      tp: tp,
      tipoB: 0,
      dateUp: ''
    }
    const response = await fetch(sendUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyJSON)
    });

    regP.innerHTML="Actualizar Contribuyente"
    nombre.value='';
    calle.value = '';
    lote.value = '';
    manzana.value = '';
    numCalle.value = 0;
    colonia.value = '';
    obs.value="";
    cp.value = 41100;
    municipio.value = 'CHILAPA DE ÁLVAREZ'
    localidad.value = 'CHILAPA DE ÁLVAREZ'
    m1.value = 0
    m2.value = 0
    tc.value = 0
    zona.value = 0
    bg.value = 0
    
    const responseJson = await response.json().then(r => {
      //console.log(`Response1: ${r}`)

      if (r.contribuyente) {
        const contribuyente = r.contribuyente[0]
        const ubicacion = r.ubicacion[0]
        const nameFile = contribuyente.escriturasPath
        nombre.value = contribuyente.contribuyente
        pdfToUp.innerHTML=nameFile
        if(nameFile!==""){  
          this.bandUpTramite=true
        }
        if(ubicacion){
          calle.value = ubicacion.calle;
          lote.value = ubicacion.lote;
          manzana.value = ubicacion.manzana;
          numCalle.value = ubicacion.numero;
          colonia.value = ubicacion.colonia;
          cp.value = ubicacion.cp === 0 ? 41100 : ubicacion.cp;
          municipio.value = ubicacion.municipio === '' ? 'CHILAPA DE ÁLVAREZ' : ubicacion.municipio;
          localidad.value = ubicacion.localidad === '' ? 'CHILAPA DE ÁLVAREZ' : ubicacion.localidad;
        }
        if(calle.value === ''){
          calle.value = contribuyente.ubicacion
        }
        m1.value = contribuyente.m1
        m2.value = contribuyente.m2
        obs.value = contribuyente.observaciones
        tc.value = contribuyente.tc ? contribuyente.tc:0
        zona.value = contribuyente.zona ? contribuyente.zona:0
        bg.value = contribuyente.bg ? contribuyente.bg : 0
        cp.value = cp.value === '' ? 0 : cp.value
        numCalle.value = numCalle.value === '' ? 0 : numCalle.value
        manzana.value = manzana.value === '' ? 0 : manzana.value
        lote.value = lote.value === '' ? 0 : lote.value
        
      }
      this.setState({bandPost: false});
      
    });
  } catch (e) {
    this.setState({bandPost: false});
    console.log(`Error: ${e}`);
  }
}

actualizarC=async()=>{
    try {
       this.setState({disabledReg: true})
       const sendUri = ip("3026")+"actualizarC";
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
              if(this.bandUpTramite){
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


showNotification = place => {
  const {tr} = this.state
    switch (place) {
      case "tr":
        this.setState({colorSnack: 'warning',iconSnack: WN, messageSnack: 'Advertencia, rellenar todos los campos'});
        break;
        case "trE":
        this.setState({colorSnack: 'danger',iconSnack: E, messageSnack: 'Error, el número de cuenta NO éxiste'});
        break;
        case "trE2":
        this.setState({colorSnack: 'danger',iconSnack: E, messageSnack: 'Error en la conexión'});
        break;
        case "trA":
        this.setState({colorSnack: 'success',iconSnack: CheckCircle, messageSnack: 'El Contribuyente se actualizó con éxito'});
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
    tr, colorSnack, iconSnack, messageSnack,
    classes,
    disabledReg
  } = this.state;
 
  return (
    <CardIcon>
      <GridContainer>
        
        <Snackbar
          place="tr"
          color={this.state.colorSnack}
          icon={this.state.iconTo}
          message={
              <div style={{width:250}} >
              <Loader
              type="BallTriangle"
              color="red"
              height={10}
              width={10}
              visible={this.state.bandLoad}
              style={{position:'absolute', top: `${this.state.topAna}px`, left: "45px"}}
              //timeout={3000} //3 secs
                  />
                  <div style={{position: 'absolute', top: this.state.topAna, left: 60}} id="analizeBtn" >
                      Analizando paginas...
                  </div>
                  <div style={{position: 'absolute', top: 25, left: 70}} id="Sm1" >
                      
                  </div>
              </div>
      
          }
          open={this.state.opSnack}
          closeNotification={() => this.setState({opSnack: false})}
          close
        />
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
                Actualizar Contribuyente
              </p>
            </CardHeader>
            <CardBody>
              <Loader
                  type="BallTriangle"
                  color="#00BFFF"
                  height={20}
                  width={20}
                  visible={this.state.bandPost}
                  style={{position:'absolute', top: "10px", left: '10px'}}
                  //timeout={3000} //3 secs
                />
              <FormRegistro c={this} a={true} fa={this.padrones} />
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
                Actualizar Contribuyente
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