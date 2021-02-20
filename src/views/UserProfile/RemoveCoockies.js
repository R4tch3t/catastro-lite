import cookie from "react-cookies";
import ls from 'local-storage'
export default () => {
    cookie.remove("idUsuario", { path: "/" });
    cookie.remove("nombre", { path: "/" });
    cookie.remove("correo", { path: "/" });
    cookie.remove("edad", { path: "/" });
    ls.remove("idRol");
    ls.remove("pass");
    //cookie.remove("idRol", { path: "/" });
    //cookie.remove("pass", { path: "/" });
  
}