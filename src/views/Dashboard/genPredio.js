import getPredial from "./getPredial";
import clearCheck from './clearCheck.js';
import encrypt from "./encrypt";
import clearCheckN from "./clearCheckN";
export default (r,tp,c,byFolio) => {
  const genCarta = (CTA, nombre, ubi, tp, añoI, añoF) => {
    const {
      idRol
    } = c.props
    let url = idRol === '1' ? `#/admin/padron` : `#/usuario/padron`
    let subUrl = `?bandCarta=1&genCTA=${CTA}&nombre=${nombre}&ubi=${ubi}&tp=${tp}`
    subUrl += `&añoI=${añoI}&añoF=${añoF}`
    url += `?v=${encrypt(subUrl)}`;
    const win = window.open(url, '_blank');
    win.focus();
  }
  
   if (r.contribuyente) {
      const contribuyente = r.contribuyente[0]
      const ubicacion = r.ubicacion[0]
      const orden = r.orden
      const {Y} = c.state
      const cPeriodo = contribuyente.periodo
      contribuyente.ubi=ubicacion;
      contribuyente.orden=orden;
        c.setState({
          CTA: contribuyente.CTA
        });
        if (cPeriodo !== '') {
          document.getElementById('periodo').value = cPeriodo;
        }
        const sCarta = document.getElementById('sCarta');
        const nombre = document.getElementById('nombre');
        nombre.value = contribuyente.contribuyente;
        nombre.focus();
        const calle = document.getElementById('calle');
        const lote = document.getElementById('lote');
        const manzana = document.getElementById('manzana');
        const numCalle = document.getElementById('numCalle');
        const colonia = document.getElementById('colonia');
        const cp = document.getElementById('cp');
        const municipio = document.getElementById('municipio');
        const localidad = document.getElementById('localidad');
        const bg = document.getElementById('baseGravable');
        const m1 = document.getElementById('m1');
        const m2 = document.getElementById('m2');
        const tc = document.getElementById('tc');
        const zona = document.getElementById('zona');
        const periodo = document.getElementById('periodo');
        const obs = document.getElementById('observaciones');
        const dateUpL = document.getElementById('dateUp');
        const regB=document.getElementById('regB')
        regB.innerHTML = 'GENERAR ORDEN DE PAGO'
        dateUpL.style.color = 'red'
        dateUpL.value=""
        calle.value = ubicacion.calle;
        lote.value = ubicacion.lote;
        manzana.value = ubicacion.manzana;
        numCalle.value = ubicacion.numero;
        colonia.value = ubicacion.colonia;
        cp.value = ubicacion.cp === 0 ? 41100 : ubicacion.cp;
        municipio.value = ubicacion.municipio === '' ? 'CHILAPA DE ÁLVAREZ' : ubicacion.municipio;
        localidad.value = ubicacion.localidad === '' ? 'CHILAPA DE ÁLVAREZ' : ubicacion.localidad;;
        const ctasIndexes = []
        while (ctasIndexes.length < r.contribuyente.length && ctasIndexes.length < 20) {
          //ctasIndexes.push(r.contribuyente[ctasIndexes.length])
          const e = r.contribuyente[ctasIndexes.length];
          ctasIndexes.push({k: "rebu"+ctasIndexes.length, html: e.CTA, handleClickItem: ()=>{c.rebuscarCTA(0, e.CTA); return (i)=>{console.log(i)}}, i: ctasIndexes.length})
        }
        c.setState({ctasIndexes: ctasIndexes, tipoPredio: tp})
        
        document.getElementById('otroservicio').value=''
        clearCheck(c)
        clearCheckN(c)
        c.contribuyente = contribuyente
        if(!orden){
          if (calle.value===''){
            calle.value = contribuyente.ubicacion
          }
          
          m1.value = contribuyente.m1;
          m2.value = contribuyente.m2;
          bg.value = contribuyente.bg;
          tc.value = contribuyente.tc;
          obs.value = contribuyente.observaciones
          zona.value = contribuyente.zona;
          dateUpL.value = ''
          c.idOrden = 0
          c.setState({tc: tc.value, zona: zona.value, totalN: 0});
          if (bg.value>0){
            c.setBg()
          }
          return false;
        }
        if(orden.nombre){
          nombre.value = orden.nombre
        }
        /*m1.value = orden.m1
        m2.value = orden.m2*/
        m1.value = contribuyente.m1
        m2.value = contribuyente.m2
        //m1.value = orden.m1!==contribuyente.m1?contribuyente.m1:orden.m1
        //m2.value = orden.m2!==contribuyente.m2?contribuyente.m2:orden.m2
        //obs.value = orden.obs
        obs.value = contribuyente.observaciones
        let tzoffset = (new Date()).getTimezoneOffset() * 60000;
        let dateUp = new Date(orden.dateUp);
        
        const bandUp = ((parseInt(Y)) > parseInt(dateUp.getFullYear())&&!byFolio);
        if (bandUp){
          c.idOrden = 0;
          const añoI = dateUp.getFullYear()
          const añoF = new Date().getFullYear()
          periodo.value = añoF;
          if((añoF - añoI)>4){
              sCarta.style.display = 'block'
              let ubi = `${ubicacion.calle}`
              if (ubicacion.numero !== 0 && ubicacion.numero !== '') {
                ubi += `, No. ${ubicacion.numero}`
              }
              const predio = tp === 'r' ? 'RÚSTICO' : 'URBANO'

              sCarta.onclick = () => {
                genCarta(contribuyente.CTA,
                  contribuyente.contribuyente,
                  ubi, predio, añoI, añoF)
              }
          }
          
        }else{
          
        c.setState({currentD: dateUp, 
                    horas: dateUp.getHours(),
                    minutos: dateUp.getUTCMinutes(),
                    segundos: dateUp.getSeconds()
          })
          //dateUpL.value = new Date(dateUp-tzoffset).toISOString()///.slice(0, -1)
          //dateUpL.value = orden.dateUpL
          dateUpL.value = orden.dateUp
          c.dateUpL = orden.dateUpL
          regB.innerHTML = 'ACTUALIZAR ORDEN DE PAGO'
          c.idOrden = orden.idOrden
          document.getElementById('otroservicio').value=orden.otroservicio
          periodo.value = orden.periodo

        }
        
        
        c.setState({tc: contribuyente.tc, zona: contribuyente.zona, totalN: orden.total, labelConsta: orden.constancia, labelCerti: orden.certi});
       
       // bg.value = orden.bg;
        bg.value = contribuyente.bg;
            getPredial(orden.idOrden,tp,c,bandUp);
  }
}