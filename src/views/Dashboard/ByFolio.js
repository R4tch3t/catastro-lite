import ip from "variables/ip.js";
import genImp from "./genImp";
import genPredio from "./genPredio";

export default async (CTAnombre, c) => {
    try {
      c.setState({bandLoad: false})
        const sendUri = ip('3028')+"byFolio";
        c.idOrden = 0
        const bodyJSON = {
          idFolio: CTAnombre
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
            if(r.folio){
              c.setState({bandLoad: true})
              const tp = r.folio.tp
              genPredio(r, tp, c, true)
              if(!r.contribuyente&&r.orden){
                let tzoffset = (new Date()).getTimezoneOffset() * 60000;
                const orden = r.orden[0]
                const total = orden.total
                const nombre = document.getElementById('nombre')
                const dateUp = document.getElementById('dateUp')
                dateUp.style.color='red'
                nombre.value = orden.nombre
                orden.dateUp = new Date(orden.dateUp)
                dateUp.value = new Date(orden.dateUp - tzoffset).toISOString().slice(0, -1)
                
                if (r.formas){
                  genImp(r.formas, c);
                }
                c.idOrden = orden.idOrden
                c.setState({totalN: total});
              }
            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
   
}