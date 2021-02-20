import ip from "variables/ip";
import removeCoockies from "views/UserProfile/RemoveCoockies";
import saveCookies from "views/UserProfile/SaveCookies";
export default async (idUsuario,avatar64, showNotification) => {
    try {
      // console.log(this.nombre)
      //  console.log(this.nombre.current.value)
      const sendUri = ip("3009")+"actualizarU";
      //const sendUri = "http://34.66.54.10:3016/";
      //const sendUri = 'http://localhost:3016/'
      //const sendUri = "http://192.168.1.74:3011/";
     // document.getElementById('idUsuario').value=12
      //const CVE_ID = document.getElementById('idEmpleado').defaultValue
      const nombre = document.getElementById('nombre').value.toUpperCase()
      const correo = document.getElementById('correo').value
      const edad = document.getElementById('edad').value

      const bodyJSON = {
        idUsuario,
        nombre,
        correo,
        edad,
        avatar64,
        idRol: 0
      };

      const response = await fetch(sendUri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyJSON)
      })

      const responseJson = await response.json().then(r => {
        //console.log(`Response1: ${r}`)
        if (r[0] !== undefined && r[0].correo === correo) {
          removeCoockies()
          saveCookies(idUsuario, r[0].nombre, r[0].correo, r[0].edad, r[0].idRol, r[0].pass)
          showNotification("trA")
        } else if (r.error.name === 'error01') {
          showNotification("trE1")
        } else if (r.error.name === 'error02') {
          showNotification("trE2")
        }
      })


    } catch (e) {
      showNotification("trE1")
      console.log(`Error: ${e}`)
    }
  };