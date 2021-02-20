import cookie from "react-cookies";
import encrypt from "views/Dashboard/encrypt.js";
import ls from 'local-storage'
export default (idUsuario, nombre, correo, edad, idRol, pass) => {
        
        cookie.save("idUsuario", encrypt(idUsuario), { path: "/" });
        cookie.save("nombre", encrypt(nombre), { path: "/" });
        cookie.save("correo", encrypt(correo), { path: "/" });
        cookie.save("edad", encrypt(edad), { path: "/" });
       // cookie.save("idRol", encrypt(idRol), { path: "/" });
       // cookie.save("pass", encrypt(pass), { path: "/" });
       ls.set('idRol', encrypt(idRol));
      // console.log(decrypt(ls.get("idRol")))
       ls.set('pass', encrypt(pass));

  }