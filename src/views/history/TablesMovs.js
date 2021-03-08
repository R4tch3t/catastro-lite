import React from 'react';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
//import Pdf from "./renderPDF";
//import PdfG from "./renderPDFG";
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
import {
  corte,
} from "variables/charts.js";
import encrypt from 'views/Dashboard/encrypt';

let Pdf = <></>
let PdfG = <></>

export default class TablesCorte extends React.Component {
handleCloseDash = () => {
  this.setState({openDash: null})
};

constructor(props){
    super(props);
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const date = new Date(Date.now() - tzoffset)
    let dateSI = new Date(Date.now() - tzoffset)
    let dateSF = new Date(Date.now() - tzoffset)
    const lastD = date.getMonth()
    dateSI.setHours(0,0,0,0)
    dateSF.setHours(0,0,0,0)
    corte.options.high = 1000000
    corte.data.labels = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
    corte.data.series = [[]]
    this.state = {
      dataTable: [],
      classes: props.classes,
      openDash: null,
      setOpenDash: null,
      lastD: lastD,
      dateSI: dateSI,
      dateSF: dateSF,
      total: 0,
      porcentaje: 0,
      porcentaje2: 0
    };    
    //this.obtenerQ(this.state.idUsuario,this.state.idQuincena)
}
count = 0
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

getMov=async(fi,ff)=>{
    try {
        const sendUri = ip("3014")+"getMov";
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        fi = (new Date(fi - tzoffset))//.toISOString()//.slice(0, -1);
       // tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        ff = (new Date(ff - tzoffset))//.toISOString().slice(0, -1);
        const bodyJSON = {
            fi: fi,
            ff: ff,
            count: this.count,
            op: 1
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
            // console.log(`Response1: ${r}`)

            if (r.history) {
              let data = [];
              let i = 0;
              this.count = r.count;
             // console.log(r.history);
              r.history.forEach(e => { 
                //e.dateIn = new Date(e.dateIn)
                //e.dateIn = new Date(e.dateIn-tzoffset)
                data.push({
                  key: `${e.CTA}${i}u`,
                  idHistory: e.idHistory,
                  mov: e.mov,
                  idUsuario: e.idUsuario,
                  CTA: e.CTA,
                  idOrden: e.idOrden,
                  folio: e.folio,
                  dateIn: e.dateIn
                  //dateIn: new Date(e.dateIn - tzoffset).toISOString().slice(0, -1),
                })
                i++
              });
              //console.log(data)
              //console.log(total)
              /*
              const objects = Object.entries(data.objects)//.sort();
              //console.log(objects)
              if (objects.length<16){
                for (let [key, value] of objects) {
                  data.labels.push(key)
                  data.totales.push(value)
                  if(value>high){
                    high=value
                  }
                  porcentaje++
                }
              }else if(objects.length<30&&objects.length>15){
                let semC = 0
                dateLabel = new Date(dateSI)
                //console.log(`dateLabel: ${dateLabel}`)
                dateLabel.setDate(dateLabel.getDate() + 7)
                //console.log(`dateLabelAf: ${dateLabel}`)
                totalD = 0
                i=0
                
                for (let [key, value] of objects) {
                  //console.log(`key: ${key.split("/").join("-")}`)
                  //console.log(`dateKey: ${new Date(key.split("/").join("-"))}`)
                  const keyDate = new Date()
                  const arrKey = key.split("/")
                  //keyDate.setDate(arrKey[0])
                  //keyDate.setMonth(arrKey[1])
                  keyDate.setFullYear(arrKey[2], arrKey[1]-1, arrKey[0])
                  //console.log(`keyDate: ${keyDate}`)
                  //console.log(`dateLabel: ${dateLabel}`)
                  //console.log(`keyDate > dateLabel ${keyDate > dateLabel}`)
                  i++
                  if (keyDate > dateLabel || i === objects.length) {
                    if (i === objects.length){
                        totalD += value
                        if (totalD > high) {
                          high = totalD
                        }
                       }
                      semC++
                      data.labels.push(`SEMANA ${semC}`)
                      data.totales.push(totalD)
                      totalD=0
                      dateLabel = new Date(keyDate)
                      dateLabel.setDate(dateLabel.getDate() + 7)
                   

                    porcentaje++
                  }
                  totalD+=value
                  if (totalD > high) {
                    high = totalD
                  }
                  
                }
                //console.log(data)
              } else {
                dateLabel = new Date(dateSI)
                dateLabel.setMonth(dateLabel.getMonth() + 1)
                totalD = 0
                i = 0
               // console.log(dateLabel)
                for (let [key, value] of objects) {
                  const keyDate = new Date()
                  const arrKey = key.split("/")
                  keyDate.setFullYear(arrKey[2], arrKey[1] - 1, arrKey[0])

                  i++
                  if (keyDate > dateLabel || i === objects.length) {
                    if (i === objects.length) {
                      totalD += value
                      if (totalD > high) {
                        high = totalD
                      }
                    }
                    data.labels.push(this.mes(dateLabel.getMonth()-1))
                    data.totales.push(totalD)
                    totalD = 0
                    dateLabel = new Date(keyDate)
                    dateLabel.setMonth(dateLabel.getMonth() + 1)
                    

                    porcentaje++
                  }
                  totalD += value
                  if (totalD > high) {
                    high = totalD
                  }

                }
                
              }
//console.log(data)
              
              //porcentaje = ((objects.length / (porcentaje)) / objects.length) * 100
              const media = total/data.length
              porcentaje2 = total / porcentaje
             // console.log(total)
              //console.log(data.length)
              //porcentaje = ((media / porcentaje)) // * 100
              //porcentaje = ((media)/(objects.length))
              porcentaje2 = (porcentaje2 / total) * 100
              porcentaje = ((media) / total)*100
          //    console.log(porcentaje)
              if (isNaN(porcentaje)){
                porcentaje = 0
                data.totales = [1]
              }else{
                const arrPor = porcentaje.toString().split(".")
                porcentaje = this.round(porcentaje, 4)
              }
              corte.options.high = high
              corte.data.labels = data.labels
              corte.data.series = [data.totales]*/
              
              //porcentaje = isNaN(porcentaje) ? 0:this.round(porcentaje)
              this.setState({dataTable: data});
              
              
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

onChangeDI = date => {
  const {dateSF} = this.state
  let dateNSF = new Date(dateSF)
  dateNSF.setDate(dateSF.getDate() + 1);
  this.getMov(date, dateNSF)
  this.setState({ dateSI: date })
}

onChangeDF = date => {
  const {dateSI} = this.state
  let dateNSF = new Date(date);
  dateNSF.setDate(date.getDate() + 1);
  this.getMov(dateSI, dateNSF);
  this.setState({ dateSF: date })
}

recorte = () => {
  const {dateSF} = this.state
  const {dateSI} = this.state
  let dateNSF = new Date(dateSF);
  dateNSF.setDate(dateSF.getDate() + 1);
  this.getMov(dateSI, dateNSF);
}

componentDidMount = () => {
  this.recorte();
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
  let url = `#/admin/corte`
  //let url = `orden/admin#/admin/corte`
  //let url = idRol === '1' ? `orden/admin#/admin/padron` : `orden/usuario#/usuario/padron`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}

informe = () => {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000;
  let {dateSF} = this.state
  let {dateSI} = this.state
  let dateNSF = new Date(dateSF);
  dateNSF.setDate(dateSF.getDate() + 1);
  dateSI = new Date(dateSI - tzoffset).toISOString().slice(0, -1)
  dateNSF = new Date(dateNSF - tzoffset).toISOString().slice(0, -1)
  let subUrl = `?bandInfo=1&dateSI=${dateSI}&dateSF=${dateNSF}`
  //let url = `orden/admin#/admin/corte`
  let url = `#/admin/corte`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}


render() {
  const {bandInfoG,bandInfo} = this.props;
  const {classes} = this.state;
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
  const {dateSI, dateSF} = this.state;
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
  ]

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
                </GridContainer>
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
                  <Button
                    id="infoA"
                    color="info"
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center"
                    }}
                    onClick={this.informeG}
                  >
                    INFORME GENERAL
                  </Button>
                </GridContainer>
                <GridContainer>
                  <Button
                    id="infoB"
                    color="primary"
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center"
                    }}
                    onClick={this.informe}
                  >
                    INFORME MENSUAL
                  </Button>
                </GridContainer>
                <GridContainer>
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
                    GENERAR RECORTE
                  </Button>
                  </GridContainer>
                
              </div>

              <Table
                tableHeaderColor="info"
                tableHead={headCells}
                tableData={dataTable}
              />
              <Table
                tableHeaderColor="info"
                tableHead={headCells}
                tableData={dataTable}
              />
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
              <p className={classes.cardCategory}>SUMA TOTAL DEL CORTE: </p>
              <h3 className={classes.cardTitle}>{`$`}{total}</h3>
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
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={corte.data}
                type="Bar"
                options={corte.options}
                listener={corte.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Gráfica de TOTALES</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} />{" "}
                  {porcentaje}%
                </span>{" "}
                de ingresos por predio.
              </p>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} />{" "}
                  {porcentaje2}%
                </span>{" "}
                de ingresos por día.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> {`Periodo del ${dateSI.toLocaleDateString()} al ${dateSF.toLocaleDateString()}`}
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