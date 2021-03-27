import ip from "variables/ip";
import spellNumber from "views/Dashboard/spellNumber";
export default async (fi, ff, c)=>{
  const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
  const dias = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO']
  
  try {
      const dateFI = new Date(fi)
      let dateFF = new Date(ff)
      const sendUri = ip("3025")+"informeG";
      fi = new Date (fi)
      ff = new Date (ff)
      fi.setHours(0,0,0,0)
      ff.setHours(0,0,0,0)
      const bodyJSON = {
        fi: fi,
        ff: ff,
        bandG: true
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
        //  console.log(`Response1: ${r}`)
        let tzoffset = (new Date()).getTimezoneOffset() * 60000;
        if (r.dataTable) {
          const {dataTable,total,totalSs} = r
         const totalS = spellNumber(totalSs)
          dateFF.setDate(dateFF.getDate() - 1);
          c.setState({
            diaLI: dias[dateFI.getDay()],
            diaI: dateFI.getDate(),
            mesI: meses[dateFI.getMonth()],
            añoI: dateFI.getFullYear(),
            diaLF: dias[dateFF.getDay()],
            diaF: dateFF.getDate(),
            mesF: meses[dateFF.getMonth()],
            añoF: dateFF.getFullYear(),
            dataTable,
            total: total,
            renderPDF: true,
            totalS
          });

        }
      });
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };
