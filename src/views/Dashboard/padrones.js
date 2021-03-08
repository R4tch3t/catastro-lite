import ip from "variables/ip.js";
import genPredio from "./genPredio";

export default async (CTAnombre, tp, tipoB, idOrden, c) => {
  
    try {
        c.setState({bandLoad: false})
        const sendUri = ip('3015')+"padrones";
        const bodyJSON = {
          CTAnombre: CTAnombre,
          tp: tp,
          tipoB: tipoB,
          idOrden: idOrden
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
            c.setState({bandLoad: true, bandPost: false})
            genPredio(r,tp,c)
            
        });
    } catch (e) {
        c.setState({bandLoad: true, bandPost: false})
        console.log(`Error: ${e}`);
    }
   
}