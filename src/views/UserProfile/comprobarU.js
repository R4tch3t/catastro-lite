import ip from "variables/ip.js";
import saveCookies from "./SaveCookies.js";
import removeCookies from "./RemoveCoockies.js";
export default async (idUsuario, pass, nombre, correo, edad, idRol,showNotification) => {
   try {
     
    //const sendUri = "http://localhost:3012/";
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
           window.history.pushState(null, 'Usuario', '#/usuario/creditos')
           window.history.go()
         } else if (r[0].idRol === 1) {
           window.history.pushState(null,'Administrador','#/admin/creditos')
           window.history.go() 
         }
       } else if (r.error.name === "errorH") {
         //showNotification("trE1")
        removeCookies();
        window.history.pushState(null, 'reloadBySecurity', '#')
        window.history.go()
       }else if (r.error.name === "error01") {
         showNotification("trE1")
       } else if (r.error.name === "error02") {
         showNotification("trE2")
       }
     });
   } catch (e) {
       if(showNotification){
            showNotification("trE3")
       }
     console.log(`Error: ${e}`);
   }
};