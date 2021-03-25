import ip from "variables/ip";
export default async (fi, ff, c)=>{
  const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
  
  try {
      const dateFI = new Date(fi)
      const sendUri = ip("3025")+"informeG";
      
      const bodyJSON = {
        fi: fi,
        ff: ff,
        bandG: false
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
        //  console.log(`Response1: ${r}`)
        let tzoffset = (new Date()).getTimezoneOffset() * 60000;
        console.log(r)
        if (r.dataTable) {
          const {dataTable, total} = r
          c.setState({
            dia: dateFI.getDate(),
            mes: meses[dateFI.getMonth()],
            año: dateFI.getFullYear(),
            dataTable,
            total,
            renderPDF: true
          });

        }
      });
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };
