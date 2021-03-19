import ip from "variables/ip.js";
import saveCookies from "./SaveCookies.js";
import removeCookies from "./RemoveCoockies.js";

export default async (idUsuario, pass, nombre, correo, edad, idRol,showNotification,setBandLoad) => {
   try {
     
    //const sendUri = "http://localhost:3012/";
    if(setBandLoad){
      setBandLoad(false)
     } 
     const sendUri = `${ip('3012')}predial/login`;
     const bodyJSON = {
       idUsuario,
       pass,
       nombre,
       correo,
       edad,
       idRol
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
       
      if (
         r[0] !== undefined &&
         (`${r[0].idUsuario}` === `${idUsuario}`) && !nombre
       ) {
         
         saveCookies(idUsuario, r[0].nombre, r[0].correo, r[0].edad, r[0].idRol, pass)
         if (r[0].idRol === 0) {
           window.history.pushState(null, 'Usuario', '#/inicio/acceso')
           window.history.go()
         } else if (r[0].idRol === 1) {
           window.history.pushState(null,'Administrador','#/inicio/acceso')
           window.history.go() 
         }
       } else if (r.error.name === "errorH") {
         //showNotification("trE1")
        removeCookies();
        window.history.pushState(null, 'reloadBySecurity', '#')
        window.history.go()
       }else if (r.error.name === "error01") {
        if(setBandLoad){
            setBandLoad(true)
        }  
        showNotification("trE1")
       } else if (r.error.name === "error02") {
         if(setBandLoad){
            setBandLoad(true)
        }
         showNotification("trE2")
       }
     /*if(setBandLoad){
      setBandLoad(true)
     } */
     });
   } catch (e) {
     if(setBandLoad){
      setBandLoad(true)
     } 
      //while(this.state.bandPost){
       // await sleep(6000);    
      //}
       if(showNotification){
            showNotification("trE3")
       }
     console.log(`Error: ${e}`);
   }
};