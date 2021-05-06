import React from 'react';
import LocalAtm from "@material-ui/icons/LocalAtm";
import DateRange from "@material-ui/icons/DateRange";
import CheckCircle from "@material-ui/icons/CheckCircle"
//import Pdf from "./renderPDF.js";
import WN from "@material-ui/icons/Warning"
import Error from "@material-ui/icons/Error"
import SC from "@material-ui/icons/Check"
import Add from "@material-ui/icons/Add"
import WN2 from "@material-ui/icons/Info"
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Snackbar from 'components/Snackbar/Snackbar';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {isMobile} from "react-device-detect";
import setZona from "./setZona";
import setTC from "./setTC";
import setBg from "./setBg";
import GridsOrden from "./GridsOrden";
import sumaT from './sumaT.js';
import changeI from './changeI.js';
import rezago from './rezago.js';
import clearCheckCP from './clearCheckCP.js';
import clearCheckM from './clearCheckM.js';
import registrarO from './registrarO.js';
import padrones from './padrones.js';
import registrarF from './registrarF.js';
import ByFolio from './ByFolio.js';
import clearCheckN from './clearCheckN.js';
import Button from "components/CustomButtons/Button.js";

let Pdf = <></>;

if (!String.prototype.splice) {
  /**
   * {JSDoc}
   *
   * The splice() method changes the content of a string by removing a range of
   * characters and/or adding new characters.
   *
   * @this {String}
   * @param {number} start Index at which to start changing the string.
   * @param {number} delCount An integer indicating the number of old chars to remove.
   * @param {string} newSubStr The String that is spliced in.
   * @return {string} A new string with the spliced substring.
   */
  String.prototype.splice = function (start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  };
}

export default class TableRender extends React.Component {
map = null;
google = null;
markersC = [];
markersT = [];
markerInfo = null;
infoWindow=null;
polylines = [];
widthPol = [];
polygonC = null;
polygonT = null;
bandC = false;
bandT = false;
polyC=null;
polyT=null;
street = '';
barr = '';
saveZ = 0;
idOrden=0;
esAlta=false;
contribuyente = {}
contribuyenteOld = {}
constructor(props){
    super(props);
    const date = new Date()
    this.state = {
      nombre: "",
      center: {
        lat: 17.594955957692278,
        lng: -99.18065842793638
      },
      centerP: {
        lat: 17.594955957692278,
        lng: -99.18065842793638
      },
      zoom: 19,
      CTA: "",
      calle: "",
      tipoPredio: "u",
      classes: props.classes,
      openDash: null,
      openCalendar: null,
      openZona: null,
      openTC: null,
      openCTA: null,
      labelConsta: '',
      labelCerti: '',
      lastD: date,
      currentD: date,
      ctasIndexes: [],
      Y: date.getFullYear(),
      horas: date.getHours(),
      minutos: date.getUTCMinutes(),
      segundos: date.getSeconds(),
      totalN: 0.0,
      CBG: false,
      zona: 0,
      tc: 0,
      readOnly: this.props.idRol==='0',
      disabledReg: false,
      labelW: '',
      labelW2: '',
      tr: false,
      tr2: false,
      colorSnack: 'primary',
      colorSnack2: 'warning',
      iconSnack: WN,
      iconSnack2: WN,
      placeSnack: 'tr',
      placeSnack2: 'tc',
      bandLoad: true,
     // bandPost: true,
      
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



padrones=async(CTAnombre, tp, tipoB, idOrden, bandPost)=>{
  padrones(CTAnombre, tp, tipoB, idOrden, this,bandPost)
}

_registrarO=async()=>{
  const {CTA} = this.state;
  const nombre = document.getElementById('nombre');
  this.setState({tr2: false})
  if (nombre.value === '' || nombre.value === '\0') {
    const labelW = 'Advertencia, NOMBRE INVÁLIDO'
    nombre.focus()
    this.setState({labelW})
    this.showNotification('tr')
  }else{
    let CTAnombre = document.getElementById('CTANM').value;
    /*switch(CTAnombre.placeholder){
      case ''
    }*/
    if((CTA!==''&&this.contribuyente.CTA)||(CTAnombre&&!this.contribuyente.form)){
      registrarO(CTA,this)
    }else{
      registrarF(this)
    }
  }
}
setNewOrder=()=>{
  const dateUpL = document.getElementById('dateUp');
      const regB = document.getElementById('regB');
      this.setState({tr2: false})
    this.oldDateUpL = dateUpL.value
      this.oldIdOrden = this.idOrden
      this.oldCurrentD = this.state.currentD
  //    regB.innerHTML = 'GENERAR ORDEN DE PAGO';
      this.idOrden = 0;
      dateUpL.value=''
      this._registrarO()
}

registrarO=async()=>{
 // const CTA = document.getElementById('CTA').value;
 let I0030101 = false;
 let V0030101 = 0
 try{
    I0030101 = document.getElementById('I0030101').checked;
    V0030101 = document.getElementById('0030101').value
  }catch(e){
    I0030101=false;
    V0030101=0
    console.log(e)
  }
if (!this.esAlta && this.idOrden > 0 && (I0030101||V0030101>0) /*&& !c.state.readOnly*/) {
      const o = {}
      o.title='¡Advertencia!'
      o.lines=['-> Sí se tiene que actualizar la Orden de Pago nuevamente, dar click en "Actualizar Orden de Pago"',
               '-> Sí realmente se está haciendo un cambio de propiedad, dar click en "Generar Nueva Orden de Pago"',
               '* Nota: Los datos pueden llegar a comprometerse y duplicarse entre Ordenes de Pago Predial y Ordenes Sobre Adquisición de Bienes Inmuebles, dependiendo del cambio en el movimiento actual.']
      this.showNotification('tc',o)
      /*const dateUpL = document.getElementById('dateUp');
      const regB = document.getElementById('regB');
      c.oldDateUpL = dateUpL.value
      c.oldIdOrden = c.idOrden
      c.oldCurrentD = c.state.currentD
     // dateUpL.value = '';
      regB.innerHTML = 'GENERAR ORDEN DE PAGO';
      c.idOrden = 0;
      */
     // c.state.currentD = new Date()
}else{
  this._registrarO()
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
selectionStartNombre = 0
selectionEndNombre = 0
handleNombre = e => {
  this.selectionStartNombre=e.target.selectionStart
  this.selectionEndNombre=e.target.selectionEnd
  if(e.which>47||e.which===32){
    let c = null
    switch(e.which){
      case 192:
        c = 'Ñ'
        break;
      case 190:
        c = '.'
        break;
      case 189:
        c = '-'
      break;
      default: 
      c=String.fromCharCode(e.which);
      break;
    }
    const val = e.target.value.splice(this.selectionStartNombre, 0, c);
    this.setState({nombre: val})
  }else
  if(e.which===8){
    let val = ''
    if (this.selectionStartNombre === this.selectionEndNombre){
      this.selectionEndNombre-=1
      this.selectionStartNombre-=1
      val = e.target.value.slice(this.selectionStartNombre - this.selectionEndNombre, this.selectionStartNombre);
      val += e.target.value.slice(this.selectionStartNombre + 1);
    }else{
      val = e.target.value.slice(0, this.selectionStartNombre);
      val += e.target.value.slice(this.selectionEndNombre);
      this.selectionEndNombre = this.selectionStartNombre
    }
      this.setState({nombre: val})  
  }
  
}

handleNombreUp = e => {
  this.setState({nombre: e.target.value}) 
}

handleKup = event => {
  if (event.which===13){
  }
}

handleCloseDash = () => {
  this.setState({
    openDash: null
  });
};

changeDash = event => {
  const {openDash} = this.state;
  if (openDash && openDash.contains(event.target) ) {
    this.setState({openDash: null});
  } else {
    this.setState({openDash: event.currentTarget});
  }
}

handleClickDash = event => {
  this.changeDash(event);
};

handleCloseCalendar = () => {
  this.setState({
    openCalendar: null
  })
};

changeCalendar = event => {
  const {openCalendar} = this.state;
  if (openCalendar && openCalendar.contains(event.target) ) {
    this.setState({openCalendar: null});
  } else {
    this.setState({openCalendar: event.currentTarget});
  }
}

handleClickCalendar = event => {
  this.changeCalendar(event);
};

handleCloseZona = () => {
  this.setState({
    openZona: null
  })
};

changeZona = event => {
  const {openZona} = this.state;
  if (openZona && openZona.contains(event.target)) {
    this.setState({openZona: null});
  } else {
    this.setState({openZona: event.currentTarget});
  }
}

handleClickZona = event => {
  if (this.state.CBG) {
    return false;
  }
  this.changeZona(event);
};

handleKeyZona = event => {
  if (this.state.CBG) {
    return false;
  }
  this.setState({openZona: event.currentTarget});
};

handleCloseTC = () => {
  this.setState({
    openTC: null
  })
};

changeTC = event => {
  const {openTC} = this.state;
  if (openTC && openTC.contains(event.target)) {
    this.setState({openTC: null});
  } else {
    this.setState({openTC: event.currentTarget});
  }
}

handleClickTC = event => {
  if (this.state.CBG) {
    return false;
  }
  this.changeTC(event);
};

handleKeyTC = event => {
  if (this.state.CBG) {
    return false;
  }
  this.setState({openTC: event.currentTarget});
};

handleCloseCTA = () => {
  this.setState({
    openCTA: null
  })
};

changeCTA = event => {
  const {openCTA} = this.state;
  if (openCTA && openCTA.contains(event.target)) {
    this.setState({openCTA: null});
  } else {
    this.setState({openCTA: event.currentTarget});
  }
}

handleClickCTA = event => {
  this.changeCTA(event);
};

handleKeyCTA = event => {
  this.setState({openCTA: event.currentTarget});
};

handleUpper = e => {
  if(e.which===13){
    let CTAnombre = document.getElementById('CTANM');
    switch(CTAnombre.placeholder){
      case 'NOMBRE':
        this.buscarCTA(1)();
        break;
      case 'FOLIO':
        this.buscarFolio()();
        break;
      case 'CTA':
        this.buscarCTA(0)();
        break;
    }
    
  }
  if ((e.which === 32 || e.which > 39) && !isMobile) {
    this.selectionStartNombre = e.target.selectionStart
    this.selectionEndNombre = e.target.selectionEnd
    e.target.value = e.target.value.toUpperCase()
    e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
  }
}

bandLoading=true
bandPost = true;
buscarCTA = (key) => (event) => {
  let CTAnombre = document.getElementById('CTANM');
  const checkU = document.getElementById('check0');
  CTAnombre.placeholder = key===0?'CTA':'NOMBRE';
  const tp = checkU.checked?'u':'r';
  if (CTAnombre !== '') {
    
    this.padrones(CTAnombre.value, tp, key, '')
    if(!this.bandPost){
               
            }else{
                if(!this.bandLoading){
                    this.bandLoading=true;
                    this.waitPost(key);
                }
            }
  
  }
}

waitPost = async(key) => {
  let CTAnombre = document.getElementById('CTANM');
  const checkU = document.getElementById('check0');
  CTAnombre.placeholder = key===0?'CTA':'NOMBRE'
  const tp = checkU.checked?'u':'r'
  while(this.bandPost){
      await this.sleep(300);    
  }
  this.padrones(CTAnombre.value, tp, key, '', true);
  this.bandLoading=false;
  //this.setState({bandPost: true});

}

sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
}
buscarFolio = () => async (event) => {
  let CTAnombre = document.getElementById('CTANM');
  CTAnombre.placeholder = 'FOLIO'
  if (CTAnombre !== '') {
    ByFolio(CTAnombre.value,this)
  }
}

rebuscarCTA = (key, CTA) => (e) => {
  const checkU = document.getElementById('check0');
  const tp = checkU.checked ? 'u' : 'r'
  this.handleCloseCTA()
  if (CTA !== '') {
    this.padrones(CTA, tp, key, '')
  }
}

calcB = (e)=>{
  const cbg = document.getElementById('cbg0')
  const band = cbg.checked !== this.state.CBG ? cbg.checked : !cbg.checked
  this.setState({CBG: band}) 
}

tcHandle = (n) => (e) => {
  this.setTC(n);
}

zonaHandle = (n) => (e) => {
  this.setZona(n);
}

setTC = async (n) => {
  this.handleCloseTC()
  setTC(n, this)
}

setZona = async(n) => {
  this.handleCloseZona()
 setZona(n,this)
}

setBg = async () => {
  const periodo = document.getElementById('periodo').value;
  rezago(this, periodo);
  setBg(this);
  sumaT(this);
}

KUEnter = e => {
  if (e.which===13){
    this.setBg()
  }
}

handleImp = async e => {
  if (e.which === 13) {
    sumaT(this);
  }
}

addImpuesto = async (id) => {
    if(id === '0070201'||id === '0070202'){
      const vi = document.getElementById(id);
      const bg = document.getElementById('baseGravable').value;
      let t = (bg * 0.004)*0.15;
      t = Math.round(t)
      vi.value=t;
    }else
    if (id === '0020401' || id === '0020402' || id === '0020403') {
        const {tipoPredio} = this.state;
        const bg = document.getElementById('baseGravable').value;
        let t = (bg * 0.004);
        t = Math.round(t)
        const vi = document.getElementById(id);
        if (tipoPredio === 'u' && id !== '0020403') {
          vi.value = t;
        } else if (tipoPredio === 'r' && id !== '0020401' && id !== '0020402') {
          vi.value = t;
        }
    } else {
      changeI(id,this)
    } 
    sumaT(this)
    
}

sumaT=async()=>{
  sumaT(this)
}
dateUpL = ''
oldDateUpL=''
oldIdOrden=0
oldCurrentD=null
setZero=async(id)=>{
  const i = document.getElementById(id);
  i.blur();
  i.value = 0;
  if (id === '0030101'){
    this.esAlta=true
  if (this.oldCurrentD!==null) {
    const dateUpL = document.getElementById('dateUp');
    const regB = document.getElementById('regB');
    dateUpL.value = this.oldDateUpL;
    regB.innerHTML = 'ACTUALIZAR ORDEN DE PAGO';
    this.idOrden = this.oldIdOrden;
    this.setState({currentD: this.oldCurrentD});
  }
}
  sumaT(this)
}
mNoti=(m)=>{

}
showNotification = (place,labelW) => {
const {tr,tr2} = this.state
let timeO = 6000;
  switch (place) {
      case "tr":
        this.setState({placeSnack:'tr',colorSnack: 'warning', iconSnack: WN});
      break;
      case "trE":
        this.setState({placeSnack:'tr',colorSnack: 'danger', iconSnack: Error,labelW});
      break;
      case "trA":
        this.setState({placeSnack:'tr',colorSnack: 'success', iconSnack: CheckCircle, labelW: 'Orden registrada con éxito'});
      break;
      case "trB":
        this.setState({placeSnack:'tr',colorSnack: 'info', iconSnack: WN2, labelW});
        timeO = 64000
        //timeO = 6001
      //this.setState({tr: true})
      break;  
      case 'tc':
        labelW=<div style={{width: 800, height: 300}} >
            <div style={{textAlign: 'center',fontSize: 40}}>{labelW.title}</div>
            <div style={{height: 40}} />
            <div style={{textAlign: 'left',fontSize: 20}}>{labelW.lines[0]}</div>
            <div style={{height: 40}} />
            <div style={{textAlign: 'left',fontSize: 20}}>{labelW.lines[1]}</div>
            <div style={{height: 20}} />
            <div style={{textAlign: 'left',fontSize: 15}}>{labelW.lines[2]}</div>
            <div style={{height: 20}} />
            <Button color='success' onClick={this._registrarO} ><SC />Actualizar Orden de Pago </Button> <Button color='info' style={{left: 300}} onClick={this.setNewOrder} ><Add />Generar Nueva Orden de Pago </Button>
        </div>
        this.setState({placeSnack2:'bc',colorSnack2: 'warning', iconSnack2: WN2, labelW2: labelW});
        //timeO = 64000;
        if (!tr2/*&&timeO<6001*/) {
          this.setState({tr2: true})
          setTimeout(() => {
            //this.setState({tr2: false})
          }, timeO);
        }
        break;
    default:
      break;
  }
  
  if (!tr/*&&timeO<6001*/) {
    this.setState({tr: true})
    setTimeout(() => {
      this.setState({tr: false})
    }, timeO);
  }
};

showMap=()=>{
  const map=document.getElementById('rootMap')
  map.style.display='block'
}
hideMap = () => {
  const map = document.getElementById('rootMap')
  map.style.display = 'none'
}

blurPeriodo=async(e)=>{
  rezago(this,e.target.value)
  sumaT(this)
}
componentDidMount(){
  const {bandPdf,bandCTA,genCTA,tp,idOrden} = this.props;
  const checks = tp === 'u' || tp === '' ? [0] : [1];
  
  if (bandPdf !== '1') {
    const fa = (tp) => {
      let CTAnombre = document.getElementById('CTANM');
      //const {genCTA,idOrden} = this.props;
      //const checkU = document.getElementById('check0');
      //const tp = checkU.checked ? 'u' : 'r'
      // let key = 0;
      switch(CTAnombre.placeholder){
        case 'NOMBRE':
          //if(!this.bandLoading){
            this.padrones(CTAnombre.value, tp, 1, '');
          //}
          break;
        case 'FOLIO':
          this.buscarFolio()();
          break;
        case 'CTA':
          //if(!this.bandLoading){
            this.padrones(CTAnombre.value, tp, 0, '');
          //}
          break;
      }
      
      //this.handleUpper({which: 13});
    }
    clearCheckCP(checks,fa);
    clearCheckM(this);
    clearCheckN(this);
   // document.getElementById('dateUp').style.color='black'

  }
  if (bandCTA==='1'){
    document.getElementById('CTANM').value=genCTA
    if(tp!=="f"){
      this.padrones(genCTA, tp, 0,idOrden)
    }else{
      this.buscarFolio()(); 
    }
  }
  
}

render() {
  const {bandPdf} = this.props
  const {classes} = this.props;
  if(bandPdf==='1'){
    const {CTA} = this.props;
    const {folio} = this.props;
    const {nombre} = this.props;
    const {calle} = this.props;
    const {lote} = this.props;
    const {manzana} = this.props;
    const {numero} = this.props;
    const {colonia} = this.props;
    const {cp} = this.props;
    const {municipio} = this.props;
    const {localidad} = this.props;
    const {tipoP} = this.props;
    const {bg} = this.props;
    const {periodo} = this.props;
    const {dateUp} = this.props;
    const {total} = this.props;
    const {V0020401,V0020402,V0020403,V0020801,V0020802,
           V0020803,V0020804,V0030101,V0070101,V0070201,
           V0070202,V0070203,V0090101,V0090106,V0090107,
           V0090701,V0090702,V0090703,V0090704,V00913,
           V0091301,V0010804,V0010101,V21173001001, 
           otroservicio,servQ,constaQ,constaL,certiL,certiQ} = this.props;
    
     return(<Pdf classes={classes} CTA={CTA} folio={folio} nombre={nombre} 
                 calle={calle} lote={lote} manzana={manzana} numero={numero} colonia={colonia}
                 cp={cp} municipio={municipio} localidad={localidad}
                 tipoP={tipoP} bg={bg} periodo={periodo} dateUp={dateUp} total={total}
                 V0020401={V0020401} V0020402={V0020402} V0020403={V0020403}
                 V0020801={V0020801} V0020802={V0020802} V0020803={V0020803}
                 V0020804={V0020804} V0030101={V0030101} V0070101={V0070101}
                 V0070201={V0070201} V0070202={V0070202} V0070203={V0070203}
                 V0090101={V0090101} V0090106={V0090106} V0090107={V0090107} 
                 V0090701={V0090701} V0090702={V0090702} V0090703={V0090703}
                 V0090704={V0090704} V00913={V00913} V0091301={V0091301}
                 V0010804={V0010804} V0010101={V0010101} V21173001001={V21173001001}
                 otroservicio={otroservicio} servQ={servQ} constaQ={constaQ} 
                 constaL={constaL} certiL={certiL} certiQ={certiQ} /> )
  }else
  if(bandPdf==='0'){
    const {Y, labelW, labelW2, tr, tr2, colorSnack, iconSnack,placeSnack, colorSnack2, iconSnack2,placeSnack2} = this.state;
    const {totalN} = this.state;
    return (
      <CardIcon>
        <Snackbar
          place={placeSnack}
          color={colorSnack}
          icon={iconSnack}
          message={labelW}
          open={tr}
          closeNotification={() => this.setState({tr: false})}
          close
        />

        <Snackbar
          place={placeSnack2}
          color={colorSnack2}
          icon={iconSnack2}
          message={labelW2}
          open={tr2}
          closeNotification={() => this.setState({tr2: false})}
          close
        />
        
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>PREDIAL</h4>
                <p className={classes.cardCategoryWhite}>
                  Orden de pago
                </p>
              </CardHeader>
              <CardBody>
                  
                  <GridsOrden c={this} />
                
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
                <p className={classes.cardCategory}>IMPORTE NETO: </p>
                <h3 className={classes.cardTitle}>{`$`}{totalN}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  {`Periodo ${Y}`}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
        </GridContainer>
        {/*<Alert style={{position: 'fixed', zIndex:99999, width:500, height: 150, bottom: 50 }} severity="warning">This is a warning alert — check it out!</Alert>*/}
      </CardIcon>
    )
  }
}


}