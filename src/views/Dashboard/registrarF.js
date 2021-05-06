import ip from "variables/ip.js";
import encrypt from "./encrypt";
const responseMov = async (sendUri, bodyJSON)=>{
  const r = await fetch(sendUri, {
                  method: "POST",
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(bodyJSON)
                });
                r.json().then(r => {
                  console.log(r);
                });
              }
export default async(c) => {
   try {
        
        const idImpuestos = [];
        const removI = [];
        let I0010804 = document.getElementById('I0010804').checked;
        let V0010804 = document.getElementById('0010804').value
        let I0090701 = document.getElementById('I0090701').checked;
        let V0090701 = document.getElementById('0090701').value
        if(I0010804||V0010804>0){
          I0010804=true
          idImpuestos.push({id: 22, val: V0010804});
        }else{
          removI.push({id: 22});
        //  return
        }
        if(I0090701||V0090701>0){
          I0090701=true;
          idImpuestos.push({id: 16, val: V0090701});
        }else{
          removI.push({id: 16});
        //  return
        }
        c.setState({disabledReg:true})
        const sendUri = ip('3027')+"registrarF";
        const nombre = document.getElementById('nombre');
        const dateUp = document.getElementById('dateUp');
        const calle = document.getElementById('calle');
        let lote = document.getElementById('lote');
        let manzana = document.getElementById('manzana');
        let numCalle = document.getElementById('numCalle');
        const colonia = document.getElementById('colonia');
        let cp = document.getElementById('cp').value;
        const municipio = document.getElementById('municipio').value;
        const localidad = document.getElementById('localidad');
        const idEmpleado = c.props.idUsuario;
        const obs = document.getElementById('observaciones').value.toUpperCase();
        const m1 = document.getElementById('m1').value
        const m2 = document.getElementById('m2').value
        const tc = document.getElementById('tc').value
        const zona = document.getElementById('zona').value
        const bg = document.getElementById('baseGravable').value
        let {totalN} = c.state;
        let d=''
        if (dateUp.value !== '' && dateUp.value !== "\0") {
         // let tzoffset = (new Date()).getTimezoneOffset() * 60000;
          //d = new Date(dateUp.value)
          d=dateUp.value
          //d = new Date(d - tzoffset).toISOString().slice(0, -1)
        }
        if (nombre.value === '\0'){
          nombre.value = ''
        }
        if (nombre.value[0] === '\0') {
          nombre.value = nombre.value.substring(1);
        }
        if (calle.value === '\0') {
          calle.value = ''
        }
        if (lote.value === '\0') {
          lote.value = ''
        }
        if (manzana.value === '\0') {
          manzana.value = ''
        }
        if (numCalle.value === '\0') {
          numCalle.value = ''
        }
        if (colonia.value === '\0') {
          colonia.value = ''
        }
        if (localidad.value === '\0') {
          localidad.value = ''
        }
        const bodyJSON = {
          nombre: nombre.value,
          idOrden: c.idOrden,
          dateUp: d,
          idEmpleado: idEmpleado,
          total: totalN,
          tp: 'f',
          calle: calle.value,
          numero: numCalle.value,
          lote: lote.value,
          manzana: manzana.value,
          colonia: colonia.value,
          cp: 41100,
          municipio: 'CHILAPA DE ÁLVAREZ',
          localidad: localidad.value,
          idImpuestos: idImpuestos,
          obs,
          m1,
          m2,
          tc,
          zona,
          bg,
          removI: removI
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
            if (r.exito !== undefined) {
              
              
              if(r.exito===0){
                const sendUri = ip('3016')+"setMov";
                //if(c.contribuyente){
                bodyJSON.contribuyente=c.contribuyente
                bodyJSON.contribuyente.contribuyente=bodyJSON.nombre
                //}
                bodyJSON.idMov=r.idMov;
                bodyJSON.idOrden=r.idOrden;
                bodyJSON.folio=r.folio;
                
                if(c.contribuyenteOld.contribuyente){
                  bodyJSON.contribuyenteOld=c.contribuyenteOld
                }else{
                  bodyJSON.contribuyenteOld={contribuyente: {contribuyente: '',obs,m1,m2,tc,zona,bg},
                  ubicacion:
                  {calle: bodyJSON.calle, numero: bodyJSON.numero, lote: bodyJSON.lote,
                  manzana: bodyJSON.manzana, colonia: bodyJSON.colonia, cp: bodyJSON.cp,
                  municipio: bodyJSON.municipio, localidad: bodyJSON.localidad}}
                }
                  

                responseMov(sendUri,bodyJSON);
                
                c.showNotification("trA")
                const nombre = document.getElementById('nombre').value;
                const {idRol} = c.props
                let url = idRol === '1' ? `orden/admin#/admin/orden` : `orden/usuario#/usuario/orden`
                //let url = idRol === '1' ? `#/admin/orden` : `#/usuario/orden`
                if(lote.value==='0'){
                  lote.value = ''
                }
                if(manzana.value==='0'){
                  manzana.value = ''
                }
                if(cp==='0'){
                  cp = ''
                }
                c.idOrden = r.idOrden
                let folio = r.folio ? r.folio.toString():''
                while (folio.length<5){
                  folio = `0${folio}`
                }
                
                let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
                let d=null
                d = new Date(r.dateUp) - tzoffset
                d = new Date(d)
                dateUp.style.color='red'
                //dateUp.value = d.toISOString().slice(0, -1)
                dateUp.value = r.dateUpV
                let constaQ = 0
                let {labelConsta} = c.state
                if (I0090701) {
                  constaQ = V0090701 * 0.15
                  constaQ = Math.round(constaQ)
                  //totalN += constaQ * 2
                  V0090701 = V0090701.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  V0090701 = `${V0090701}.00`
                  constaQ = constaQ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  constaQ = `${constaQ}.00`
                  
                }
                let subUrl = `?bandPdf=1&folio=${folio}&nombre=${nombre}&calle=${calle.value}&lote=${lote.value}&manzana=${manzana.value}`
                subUrl += `&numero=${numCalle.value}&colonia=${colonia.value}&cp=${cp}&municipio=${municipio}&localidad=${localidad.value}`
                subUrl += `&total=${totalN}&dateUp=${dateUp.value}&V0020401=0&V0020402=0&V0020403=0`
                subUrl += `&V0020801=0&V0020802=0&V0020803=0&V0020804=0&V0030101=0`
                subUrl += `&V0070101=0&V0070201=0&V0070202=0&V0070203=0&V0090101=0`
                subUrl += `&V0090106=0&V0090107=0&V0090701=${V0090701}&V0090702=0&V0090703=0`
                subUrl += `&V0090704=0&V00913=0&V0091301=0&V0010804=${V0010804}&V0010101=0`
                subUrl += `&V21173001001=0&constaQ=${constaQ}&constaL=${labelConsta}`
                url += `?v=${encrypt(subUrl)}`;
                const win = window.open(url, '_blank');
                win.focus();
                c.setState({disabledReg: false})
              }             
            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}