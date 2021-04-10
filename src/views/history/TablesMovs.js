import React from 'react';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
//import Pdf from "./renderPDF";
//import PdfG from "./renderPDFG";
//import Skeleton from 'react-loading-skeleton';
import SkTables from 'views/Predial/skTables'
import SkSingle from 'views/Predial/skSingle'
import LocalAtm from "@material-ui/icons/LocalAtm";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TableMovs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Calendar from "react-calendar";
import ip from "variables/ip.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import {
  corte,
} from "variables/charts.js";
import encrypt from 'views/Dashboard/encrypt';
import {Popper} from "components/Popper";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import GRI from "@material-ui/icons/History";
import Search from "@material-ui/icons/Search";

let Pdf = <></>
let PdfG = <></>

export default class TablesCorte extends React.Component {
handleCloseDash = () => {
  this.setState({openDash: null})
};
constructor(props){
    super(props);
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const date = new Date()
    let difHours = -6
    
    if(date.getMonth()>2&&date.getMonth()<10){
     difHours = -5
    }

    let dateSI = new Date(Date.now())
    let dateSF = new Date(Date.now())
    
     let labelISOF = new Date(Date.now())
    let labelISOI = new Date(Date.now())

    const lastD = date.getMonth()
    dateSI.setHours(0,0,0,0)
    dateSF.setHours(0,0,0,0)
    labelISOF.setHours(difHours,0,0,0)
    labelISOI.setHours(difHours,0,0,0)
    labelISOF.setDate(labelISOF.getDate()+1)
    labelISOF=labelISOF.toISOString();
    labelISOI=labelISOI.toISOString();
   
    corte.options.high = 1000000
    corte.data.labels = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
    corte.data.series = [[]]
    this.state = {
      dataTable: [],
      classes: props.classes,
      classesM: props.classesM,
      openDash: null,
      setOpenDash: null,
      lastD: lastD,
      dateSI: dateSI,
      dateSF: dateSF,
      total: 0,
      porcentaje: 0,
      porcentaje2: 0,
      bandLoad: false,
      bandPost: true,
      openCalendarI: false,
      openCalendarF: false,
      horasI: 0,
      minutosI: 0,
      segundosI: 0,
      horasF: 0,
      minutosF: 0,
      segundosF: 0,
      lengthH: 0,
      lengthHID:0,
      bandLoad2: false,
      labelISOI,
      labelISOF
    };
    this.countP = 0;
    this.nextP = 50;
    //this.nextPR.setDate(this.nextPR.getDate()+1);
    //this.countPR = new Date();
    //this.obtenerQ(this.state.idUsuario,this.state.idQuincena)
}

  h = 0
  m = 0
  s = 0
  
  hF = 0
  mF = 0
  sF = 0
  pI = 0
  rpI = 5
    /*onChangeDI = (date) => {
      let tzoffset = (new Date()).getTimezoneOffset() * 60000;
      date.setHours(this.h)
      date.setMinutes(this.m)
      date.setSeconds(this.s)
      let newDate = new Date(date-tzoffset)
      this.setState({currentD: date, horas: this.h, minutos: this.m, segundos: this.s})
      const dateUpV = document.getElementById('dateUp')
      dateUpV.value = newDate.toISOString().slice(0, -1)
      this.handleCloseCalendarI()
    }*/
    valueH=(value)=>{
      this.h = value
      return `${value}`;
    }
    valueM = (value) => {
      this.m = value
      return `${value}`;
    }
    valueS = (value) => {
      this.s = value
      return `${value}`;
    }

    valueHF=(value)=>{
      this.hF = value
      return `${value}`;
    }
    valueMF = (value) => {
      this.mF = value
      return `${value}`;
    }
    valueSF = (value) => {
      this.sF = value
      return `${value}`;
    }

    handleCloseCalendarI = () => {
  this.setState({
    openCalendarI: null
  })
};

changeCalendarI = event => {
  const {openCalendarI} = this.state;
  if (openCalendarI && openCalendarI.contains(event.target) ) {
    this.setState({openCalendarI: null});
  } else {
    this.setState({openCalendarI: event.currentTarget});
  }
}

handleClickCalendarI = event => {
  this.changeCalendarI(event);
};

handleCloseCalendarF = () => {
  this.setState({
    openCalendarF: null
  })
};

changeCalendarF = event => {
  const {openCalendarF} = this.state;
  if (openCalendarF && openCalendarF.contains(event.target) ) {
    this.setState({openCalendarF: null});
  } else {
    this.setState({openCalendarF: event.currentTarget});
  }
}

handleClickCalendarF = event => {
  this.changeCalendarF(event);
};

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

mes = (i) => {
  switch(i){
    case 0:
      return 'ENERO'
    case 1:
      return 'FEBRERO'
    case 2:
      return 'MARZO'
    case 3:
      return 'ABRIL'
    case 4:
      return 'MAYO'
    case 5:
      return 'JUNIO'
    case 6:
      return 'JULIO'
    case 7:
      return 'AGOSTO'
    case 8:
      return 'SEPTIEMBRE'
    case 9:
      return 'OCTUBRE'
    case 10:
      return 'NOVIEMBRE'
    default:
      return 'DICIEMBRE'
  }
}

addEx=async()=>{
  //console.log('addEx')
  const sendUri = ip("3030");
  const bodyJSON = {
      exStr: ''
  };
  const response = await fetch(sendUri, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyJSON)
  });

  const responseJson = await response.json().then(r => {
  
  });
}

getLength = async(dateSI, dateNSF, op, CTA) => {  
  try {
    this.setState({bandLoad: false,bandLoad2: false});
 //   this.getCharts(dateSI, dateNSF);
    const sendUri = ip("3023")+"getMov";
    
    const bodyJSON = {
         s: 1,
         op,
         CTA,
         fi: dateSI,
         ff: dateNSF,
    }
    console.log(bodyJSON);
    const response = await fetch(sendUri, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyJSON)
    });

    const responseJson = await response.json().then(r => {
      console.log(r);
      //this.setState({bandLoad2: true});

      if(r){
        this.countP=r.countP?r.countP:0
        this.nextP=r.nextP?r.nextP:0
        console.log(r.lengthH)
        this.setState({lengthH: r.lengthH?r.lengthH:0,lengthHID: r.lengthHID?r.lengthHID:0, dataTable:[], bandLoad2: true});
        this.getMov(dateSI, dateNSF, op, CTA);
        if(this.state.bandPost){
            if(!this.bandLoading){
                this.bandLoading=true;
                this.waitPost();
            }
        }
      }

    });
  }catch(e){

  }
}

getMov=async(fi,ff, op, CTA)=>{
    try {
      this.setState({bandLoad: false});
      const sendUri = ip("3014")+"getMov";
      let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      fi = (new Date(fi - tzoffset))//.toISOString()//.slice(0, -1);
      // tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      ff = (new Date(ff - tzoffset))//.toISOString().slice(0, -1);
        const bodyJSON = {
            fi,
            ff,
            countP: this.countP,
            nextP: this.nextP,
            CTA,
            op
        };
        console.log(bodyJSON)
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {
            // console.log(`Response1: ${r}`)

            if (r.history) {
              const {dataTable} = this.state;
              //let data = [];
              //let i = 0;
             // this.count = r.count;
             // console.log(r.history);
              r.history.map((v,i)=>{ 
                  dataTable.push(v);
                //i++
              });
              this.setState({bandLoad: true});
              //this.setState({dataTable: data});
              
            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

obtenerOF=async(fi,ff, op, CTA)=>{
    try {
        this.setState({bandLoad: false});
        const sendUri = ip("3014")+"obtenerOF";
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        fi = (new Date(fi - tzoffset));//.toISOString()//.slice(0, -1);
       // tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        ff = (new Date(ff - tzoffset));//.toISOString().slice(0, -1);
        this.countPR=new Date(this.countPR)
        this.nextPR=new Date(this.nextPR)
        this.countPU=new Date(this.countPU)
        this.nextPU=new Date(this.nextPU)
        this.countPR.setHours(0,0,0,0)
        this.nextPR.setHours(0,0,0,0)
        this.countPU.setHours(0,0,0,0)
        this.nextPU.setHours(0,0,0,0)
        const bodyJSON = {
            fi,
            ff,
            op,
            s: -1,
            CTA,
            countPU: this.countPU,
            nextPU: this.nextPU,
            countPR: this.countPR,
            nextPR: this.nextPR,
        };

        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {
            if (r.dataTable) {
             
              const {dataTable} = r
              /*corte.options.high = high
              corte.data.labels = r.labels
              corte.data.series = [r.totales]*/
              
              if(dataTable.length>0){
                dataTable.map((v,i)=>{
                  this.state.dataTable.push(v)
                });
              }
              this.countPU = r.countPU?r.countPU:this.countPU;
              this.nextPU = r.nextPU?r.nextPU:this.nextPU;
              this.countPR = r.countPR?r.countPR:this.countPR;
              this.nextPR = r.nextPR?r.nextPR:this.nextPR;
              this.setState({/*total, porcentaje, porcentaje2, */bandLoad: true, bandPost: false});          
              
            }
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
//upBand = false
handleKup = event => {
  //console.log(event.which)
  if (event.which===13){
  //  this.upBand = true
    //this.setState({openDash: event.currentTarget});
  }
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
bandLoading=true

onChangeDI = date => {
  const {dateSF,horasI,minutosI,segundosI} = this.state
  let dateNSF = new Date(dateSF)
  //dateNSF.setDate(dateSF.getDate() + 1);
 // this.obtenerOF(date, dateNSF)
  this.countPU=new Date(date);
  this.countPR=new Date(date);
  if(date.getMonth()<dateNSF.getMonth()){
   this.nextPU=new Date(date);
   this.nextPU.setDate(this.nextPU.getDate()+7);
   this.nextPR=new Date(date);
   this.nextPR.setDate(this.nextPR.getDate()+7);
  }
  this.getLength(date, dateNSF, 0);
  this.setState({ dateSI: date , horasI: this.h,minutosI: this.m, segundosI: this.s})
  //new Date()
  date.setHours(this.h)
  date.setMinutes(this.m)
  date.setSeconds(this.s)
  const newDate = new Date(date);
  newDate.setHours(date.getHours()-6);
  document.getElementById("dateUpI").value=newDate.toISOString();
}

onChangeDF = date => {
  const {dateSI} = this.state
  let dateNSF = new Date(date);
  dateNSF.setDate(dateNSF.getDate() + 1);
 // this.obtenerOF(dateSI, dateNSF);
 //this.getCharts(dateSI, dateNSF);
 //this.countPU=date
  //this.nextPU=dateNSF
  this.nextPU=new Date(dateNSF);
  this.nextPR=new Date(dateNSF);
  if(this.nextPU.getMonth()>dateSI.getMonth()){
   this.nextPU=new Date(dateSI);
   this.nextPU.setDate(this.nextPU.getDate()+7);
   this.nextPR=new Date(dateSI);
   this.nextPR.setDate(this.nextPR.getDate()+7);
  }
  this.getLength(dateSI, dateNSF, 0);
  this.setState({ dateSF: date , horasF: this.hF, minutosF: this.mF, segundosF: this.sF})
  //new Date()
  date.setHours(this.hF)
  date.setMinutes(this.mF)
  date.setSeconds(this.sF)
  const newDate = new Date(dateNSF);
  newDate.setHours(date.getHours()-6);
  document.getElementById("dateUpF").value=newDate.toISOString();
}

recorte = () => {
  const {dateSF} = this.state
  const {dateSI} = this.state
  let dateNSF = new Date(dateSF);
  dateNSF.setDate(dateSF.getDate() + 1);

  this.getLength(dateSI, dateNSF,0);
  
}

waitPost = async(key) => {
  //const CTAnombre = document.getElementById('CTANM');
  const {dateSI, dateSF} = this.state
  while(this.state.bandPost){
      await this.sleep(300);    
  }
  this.obtenerOF(dateSI, dateSF,0);
  this.bandLoading=false;

}
sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
}

informeG = () => {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000;
  let {dateSF} = this.state
  let {dateSI} = this.state
  let dateNSF = new Date(dateSF);
  dateNSF.setDate(dateSF.getDate() + 1);
  dateSI = new Date(dateSI - tzoffset).toISOString().slice(0, -1)
  dateNSF = new Date(dateNSF - tzoffset).toISOString().slice(0, -1)
  let subUrl = `?bandInfoG=1&dateSI=${dateSI}&dateSF=${dateNSF}`
  //let url = `#/admin/corte`
  let url = `orden/admin#/admin/corte`
  //let url = idRol === '1' ? `orden/admin#/admin/padron` : `orden/usuario#/usuario/padron`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}

informe = () => {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000;
  let {dateSF} = this.state;
  let {dateSI} = this.state;
  let dateNSF = new Date(dateSF);
  dateNSF.setDate(dateSF.getDate() + 1);
  dateSI = new Date(dateSI - tzoffset).toISOString().slice(0, -1)
  dateNSF = new Date(dateNSF - tzoffset).toISOString().slice(0, -1)
  let subUrl = `?bandInfo=1&dateSI=${dateSI}&dateSF=${dateNSF}`
  let url = `orden/admin#/admin/corte`
  //let url = `#/admin/corte`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}

buscarCTA = (key) => (event) => {
  let CTAnombre = document.getElementById('CTANM');
 // const checkU = document.getElementById('check0');
  switch(key){
    case 0:
      CTAnombre.placeholder = 'CTA'
      break;
    case 1:
      CTAnombre.placeholder = 'NOMBRE'
      break;
    case 2:
      CTAnombre.placeholder = 'FOLIO'
      break;    
  }
 // const tp = checkU.checked?'u':'r'
  const {dateSI, dateSF} = this.state
  const dateNSF = new Date(dateSF);
  dateNSF.setDate(dateNSF.getDate()+1)
  if (CTAnombre.value) {
    this.getLength(dateSI, dateNSF, key+1, CTAnombre.value);
    /*this.obtenerOF(dateSI, dateNSF, key+1, CTAnombre.value);
    if(!this.state.bandPost){
               
            }else{
                if(!this.bandLoading){
                    this.bandLoading=true;
                    this.waitPost(key);
                }
            }*/
  
  }
}
buscarFolio = (key) => (event) =>{
  
}
componentDidMount(){
  this.recorte();
}

render() {
  const {bandInfoG,bandInfo,classesM,classesC} = this.props;
  const {classes,lengthH,openCalendarI,openCalendarF,horasI,minutosI,segundosI,horasF,minutosF,segundosF,labelISOI,labelISOF} = this.state;
  if(bandInfoG==='1'){
    const {dateSI, dateSF} = this.props;
    return(<PdfG classes={classes}
            dateSI={dateSI} dateSF={dateSF} /> )
  }else if(bandInfo==='1'){
    const {dateSI, dateSF} = this.props;
    return(<Pdf classes={classes}
            dateSI={dateSI} dateSF={dateSF} /> )
  }else{
  const {dataTable} = this.state
  const {dateSI, dateSF,openDash} = this.state;
  //const {setOpenDash} = this.state;
  const {total} = this.state;
  const {porcentaje} = this.state;
  const {porcentaje2} = this.state;
  const headCells = [
    { id: 'idHistory', numeric: true, disablePadding: true, label: '#' },
    { id: 'mov', numeric: false, disablePadding: false, label: 'Movimiento' },
    { id: 'idUsuario', numeric: false, disablePadding: false, label: 'Empleado' },
    { id: 'cta', numeric: false, disablePadding: false, label: 'CTA' },
    { id: 'idOrden', numeric: false, disablePadding: false, label: 'N° de orden' },
    { id: 'folio', numeric: false, disablePadding: false, label: 'Folio' },
    { id: 'fecha', numeric: true, disablePadding: false, label: 'Fecha del movimiento' },
  ];

  return (
    <CardIcon>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>HISTORIAL</h4>
              <p className={classes.cardCategoryWhite}>
                Historial de movimientos por fechas
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
                  placeholder: "CTA",
                  type: "text",
                  onKeyUp: this.handleUpper,
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

              <Popper handleClickDash={this.handleClickDash} handleClickItem={this.buscarCTA} handleCloseDash={this.handleCloseDash} openDash={openDash} classesM={classesM} 
              Items={[{k: "CTA", html: "Por CTA."},{k: "nombre", html: "Por nombre."},{k: "folio", html: "Por folio."}]} />
            </GridItem>
            
          </GridContainer>
                <GridContainer>
                   <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="FECHA DE MOVIMIENTOS INICIAL:"
                id="dateUpI"
                
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  style: {color: 'red'},
                  defaultValue: labelISOI,
                  onClick: this.handleClickCalendarI,
                  readOnly: true,
                  
                }}
              />
               <Popper handleClickDash={this.handleClickCalendarI} handleClickItem={()=>{}} handleCloseDash={this.handleCloseCalendarI} openDash={openCalendarI} classesM={classesC} 
              Items={[{k: "calendar", html: <>
                      <Typography id="discrete-slider" gutterBottom>
                              HORAS
                            </Typography>  
                            <Slider
                              defaultValue={horasI}
                              getAriaValueText={this.valueH}
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
                              defaultValue={minutosI}
                              getAriaValueText={this.valueM}
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
                              defaultValue={segundosI}
                              getAriaValueText={this.valueS}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              step={1}
                              marks
                              min={0}
                              max={59}
                            />
                            <Calendar onChange={this.onChangeDI} value={dateSI} />
                    </>}]} />
            </GridItem>
            <GridItem xs={12} sm={12} md={6} />
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="FECHA DE MOVIMIENTOS FINAL:"
                id="dateUpF"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  style: {color: 'red'},
                  defaultValue: labelISOF,
                  onClick: this.handleClickCalendarF,
                  readOnly: true,
                  
                }}
              />
               <Popper handleClickDash={this.handleClickCalendarF} handleClickItem={()=>{}} handleCloseDash={this.handleCloseCalendarF} openDash={openCalendarF} classesM={classesC} 
              Items={[{k: "calendar2", html: <>
                      <Typography id="discrete-slider" gutterBottom>
                              HORAS
                            </Typography>  
                            <Slider
                              defaultValue={horasF}
                              getAriaValueText={this.valueHF}
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
                              defaultValue={minutosF}
                              getAriaValueText={this.valueMF}
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
                              defaultValue={segundosF}
                              getAriaValueText={this.valueSF}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              step={1}
                              marks
                              min={0}
                              max={59}
                            />
                            <Calendar onChange={this.onChangeDF} value={dateSF} />
                    </>}]} />
            </GridItem>
                </GridContainer>
                {/*<GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <h4 className={classes.cardTitleBlack}>
                      Fecha de corte inicial:
                    </h4>
                    <Calendar onChange={this.onChangeDI} value={dateSI} />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <h4 className={classes.cardTitleBlack}>
                      Fecha de corte final:
                    </h4>
                    <Calendar onChange={this.onChangeDF} value={dateSF} />
                  </GridItem>
                </GridContainer>*/}
                <div style={{height: 30}} />
                {/*<GridContainer>
                  <Button
                    id="add Excel"
                    color="warning"
                    style={{
                      //display: "none",
                      flex: 1,
                      alignItems: "center"
                    }}
                    onClick={this.addEx}
                  >
                    AGREGAR EXCEL
                  </Button>
                </GridContainer>*/}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}/>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      id="regB"
                      color="success"
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }}
                      onClick={this.recorte}
                    >
                    <GRI />  GENERAR HISTORIAL
                    </Button>
                  </GridItem>
                  </GridContainer>
                
              </div>
              <SkTables height={50} c={this.rpI} bandLoad={this.state.bandLoad} />
              { this.state.bandLoad &&
                <Table
                  tableHeaderColor="info"
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
                <GRI />
              </CardIcon>
              <p className={classes.cardCategory}>NUMERO TOTAL DE MOVIMIENTOS: </p>
              <SkSingle height={50} bandLoad={this.state.bandLoad2} c={1} />
              {this.state.bandLoad2 && <h3 className={classes.cardTitle}>{`N° `}{lengthH}</h3> }
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {`Periodo del ${dateSI.toLocaleDateString()} al ${dateSF.toLocaleDateString()}`}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>

    </CardIcon>
  );
  }
}

}