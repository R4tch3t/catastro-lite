
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Corte from "views/Predial/Corte.js";
import Padrones from "views/Predial/Padrones.js";
import Orden from "views/Dashboard/Orden.js";
import Editar from "views/UserProfile/Editar.js";
import Registro from "views/UserProfile/Registro.js";
import RegistrarP from "views/Predial/RegistrarP";
import ActualizarP from "views/Predial/ActualizarP";

const dashboardRoutes = [
  {
    path: "/orden",
    name: "Orden de pago",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Orden,
    layout: "/admin"
  },
  {
    path: "/padron",
    name: "Lista de Contribuyentes",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Padrones,
    layout: "/admin"
  },
  {
    path: "/corte",
    name: "Corte de caja",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Corte,
    layout: "/admin"
  },
  {
    path: "/registrarPredio",
    name: "Registrar Contribuyente",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: RegistrarP,
    layout: "/admin"
  },
  {
    path: "/actualizarPredio",
    name: "Actualizar Contribuyente",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ActualizarP,
    layout: "/admin"
  },
  {
    path: "/perfil",
    name: "Perfil de usuario",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Editar,
    layout: "/admin"
  }, {
    path: "/registrarse",
    name: "Registrar usuario",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Registro,
    layout: "/admin"
  }
  
];

export default dashboardRoutes;
