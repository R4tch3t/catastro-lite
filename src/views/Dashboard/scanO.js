import ip from "variables/ip.js";
import CheckCircle from "@material-ui/icons/CheckCircle"
import clearCheckCP from './clearCheckCP.js';
import clearCheck from './clearCheck.js';
import clearCheckM from './clearCheckM.js';
import clearCheckN from './clearCheckN.js';
import sumaT from './sumaT.js';
const scanO = async(c, port=3131, analize=false, npage=0)=>{
  const buffer = 64000
  try{
  const CTA = document.getElementById('CTANM').value
  let dataPart = '';
  let lengthE = c.base64.length;
  const check0 = document.getElementById('check0');
  const regP = document.getElementById('regP');
  const tp = check0.checked ? 'u':'r';
  const pdfToUp = document.getElementById('pdfToUp');
  const sendUri = ip(port)+"scanO";
  
  if(c.countA<lengthE){
      
    let auxA = c.countA + buffer;
    while(auxA>c.countA&&c.base64.length>c.countA){
      dataPart+=c.base64[c.countA]
      c.countA++
    }
    c.setState({labelW: "CARGANDO... "+parseInt(c.countA/lengthE*100)+" %"});
   // regP.innerHTML = "Cargando... "+parseInt(c.countA/lengthE*100)+" %"
  }

  const bodyJSON = {
    CTA:'0',
    tp,
    dataPart,
    lengthE,
    count: c.countA,
    fileName: pdfToUp.innerHTML,
    port,
    analize,
    npage
  }

  //console.log(`bodyJSON ${bodyJSON}`)
  //console.log(bodyJSON)
  //console.log(c.base64)
  
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
        scanO(c,port);
      }else if(r.nextNode){
        //console.log(r.currentCTA)
        c.countA=0;
        scanO(c,port+1)
      }else if(r.next===0){
        //regP.innerHTML = " ANALIZANDO... " + parseInt(this.countA/lengthE*100)+" % "
        //regP.innerHTML = "- CARGA COMPLETADA - " + parseInt(c.countA/lengthE*100)+" % "
        c.setState({labelW: "ANALIZANDO... 0.0 % "});
        c.setState({opSnack: true});
      //  document.getElementById("analizeBtn").innerHTML=" ANALIZANDO... 0 % "
        //document.getElementById("snackAnaL").style.opacity=1
        c.setState({opSnack: true})

        scanO(c,port,true)
      }else if(r.analising){
          c.setState({labelW: `ANALIZANDO... ${r.p}, hoja ${r.npage} de ${r.lengthP}`});
       // document.getElementById("analizeBtn").innerHTML=`ANALIZANDO... ${r.p}, hoja ${r.npage} de ${r.lengthP}`
        scanO(c,port,true,r.npage)
      }else if(r.analize){
       // c.setUnPort(port);
        c.setState({iconTo: CheckCircle, colorSnack: 'success', topAna: 5})
       // regP.innerHTML = "- CARGA COMPLETADA - " + parseInt(c.countA/lengthE*100)+" % "
        //document.getElementById("analizeBtn").innerHTML=r.p
        c.countA=0
        c.showNotification("trA")
        c.setState({labelW: "- CARGA COMPLETADA - 100 % "});
        const CTANM = document.getElementById("CTANM");
        const nombre = document.getElementById("nombre");
        const dateUp = document.getElementById("dateUp");
        const calle = document.getElementById("calle");
        const numCalle = document.getElementById("numCalle");
        const lote = document.getElementById("lote");
        const manzana = document.getElementById("manzana");
        const colonia = document.getElementById("colonia");
        const localidad = document.getElementById("localidad");
        const baseGravable = document.getElementById("baseGravable");
        const cantidadPago = document.getElementById("cantidadPago");
        const V0020401 = document.getElementById("0020401");
        const V0020403 = document.getElementById("0020403");
        const V0020802 = document.getElementById("0020802");
        const V0070201 = document.getElementById("0070201");
        const V0070202 = document.getElementById("0070202");
        const V0070203 = document.getElementById("0070203");
        const V0030101 = document.getElementById("0030101");
        const V0090701 = document.getElementById("0090701");
        const V0090702 = document.getElementById("0090702");
        const V0090703 = document.getElementById("0090703");
        const V0090704 = document.getElementById("0090704");
        const V0010804 = document.getElementById("0010804");
        //const check0 = document.getElementById("check0");
        const checks = r.tp === 'URBANO' || !r.tp  ? [0] : [1];
        const fa = (tp) => {
          let CTAnombre = document.getElementById('CTANM');
          //const {genCTA,idOrden} = this.props;
          //const checkU = document.getElementById('check0');
          //const tp = checkU.checked ? 'u' : 'r'
          // let key = 0;
          switch(CTAnombre.placeholder){
            case 'NOMBRE':
              //if(!this.bandLoading){
                c.padrones(CTAnombre.value, tp, 1, '');
              //}
              break;
            case 'FOLIO':
              c.buscarFolio()();
              break;
            case 'CTA':
              //if(!this.bandLoading){
                c.padrones(CTAnombre.value, tp, 0, '');
              //}
              break;
          }
          
          //this.handleUpper({which: 13});
        }
        clearCheckCP(checks,fa);
        if(dateUp.value===''||dateUp.value!==r.dateUp){
          clearCheck(c);
        }
        clearCheckM(c);
        clearCheckN(c);
        c.idOrden = 0
        /*if (r.bg>0){
          c.setBg()
        }*/
        c.setState({totalN: r.total,CTA: r.CTA?r.CTA:0,tipoPredio: (r.tp === 'URBANO' || !r.tp?'u':'r')});
        
        //if(nombre){
            nombre.value=r.nombre?r.nombre:'';
        //}
        calle.value=r.calle?r.calle:'';
        dateUp.style.color="red";
        dateUp.value=r.dateUp?r.dateUp:'';
        numCalle.value=r.numero?r.numero:'';
        lote.value=r.lote?r.lote:'';
        manzana.value=r.manzana?r.manzana:'';
        colonia.value=r.colonia?r.colonia:'';
        CTANM.value=r.CTA?r.CTA:'';
        localidad.value=r.localidad?r.localidad:'';
        baseGravable.value=r.bg?r.bg:0;//.split(',').join("")
        cantidadPago.value=r.total
        if(r.V0020401){
          V0020401.value = r.V0020401
        }
        if(r.V0020403){
          V0020403.value = r.V0020403
        }
        if(r.V0030101){
          V0030101.value = r.V0030101
        }
        if(r.V0020802){
          V0020802.value = r.V0020802
        }
        if(r.V0070202&&!r.V0090701&&!r.V0090702&&!r.V0090703&&!r.V0090704){
          V0070201.value = r.V0070202
          V0070202.value = r.V0070202
        }
        if(r.V0070203){
          V0070203.value = r.V0070203
        } 
        if(r.V0090701){
          V0090701.value=r.V0090701
        }
        if(r.V0090702){
          V0090702.value=r.V0090702
        }
        if(r.V0090703){
          V0090703.value=r.V0090703
        }
        if(r.V0090704){
          V0090704.value=r.V0090704
        }
        if(r.V0010804){
          V0010804.value=r.V0010804;
        }
        const orden = {}
         c.contribuyente={CTA: r.CTA,bg: baseGravable.value, contribuyente: r.nombre, escriturasPath:'',m1:0,m2:0,observaciones:'',
                          periodo: '2021', tc: 0, ubicacion: r.calle, zona: '1' }
         c.contribuyenteOld.contribuyente={contribuyente:r.nombre,observaciones:'',m1:0
    ,m2:0,tc:0,zona:'1',bg:baseGravable.value}
        c.contribuyenteOld.ubicacion={calle: calle.value, numero: numCalle.value, lote: lote.value,manzana: manzana.value,
    colonia: colonia.value, localidad: localidad.value}                 
        sumaT(c);      
       // console.log(r.bg)
        /*
        if(r.S&&r.S!==null&&r.S!==undefined&&r.S!==""&&r.S!=="undefined"){
          r.S=r.S.split(" ").join("")
          if(r.S!==""){
            document.getElementById("m1").value=r.S
            //document.getElementById("Sm1").innerHTML="*  Terreno: "+r.S+" m²"
          }
        }else{
          document.getElementById("Sm1").value=""
        }*/
      }

  });  
  }catch(e){
    console.log(e)
    c.countA -= (buffer-1)
    scanO(c,port);
  }
}
export default scanO