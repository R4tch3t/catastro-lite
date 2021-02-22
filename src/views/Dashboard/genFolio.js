import ip from "variables/ip.js";
import encrypt from "./encrypt";
const genFolio = async (idFolio, c, t, idOrden, tp, url, arrSub, bandF) => {
    try {

        const sendUri = ip('3029')+"genFolio";
        
        const bodyJSON = {
          idFolio: idFolio,
          idOrden: idOrden,
          tp: `${tp}${idFolio}`,
          bandF: bandF
        }
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });

        await response.json().then(r => {
            
            if (r.idFolio !== undefined) {
              c++;
              let labelF = r.idFolio.toString()
              while (labelF.length < 5) {
                  labelF = `0${labelF}`
              }
              if (arrSub[c] !== '') {
                  arrSub[c] += `&folio=${labelF}`
              }
              //console.log(arrSub[c])
              if(c<t){
                //c++
                genFolio(r.idFolio + 1, c, t, idOrden, tp, url, arrSub, false)
              }else{
                  if (arrSub[5] !== '') {
                      window.open(`${url}?v=${encrypt(arrSub[5])}`, '_blank');
                  }
                  if (arrSub[4] !== '') {
                      window.open(`${url}?v=${encrypt(arrSub[4])}`, '_blank');
                  }
                  if (arrSub[3] !== '') {
                      window.open(`${url}?v=${encrypt(arrSub[3])}`, '_blank');
                  }
                  if (arrSub[2] !== '') {
                      window.open(`${url}?v=${encrypt(arrSub[2])}`, '_blank');
                  }
                  if (arrSub[1] !== '') {
                      window.open(`${url}?v=${encrypt(arrSub[1])}`, '_blank');
                  }
                  if (arrSub[0].length > 0) {
                      let win = window.open(`${url}?v=${encrypt(arrSub[0])}`, '_blank');
                      win.focus();
                  }
              }
            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}
export default genFolio