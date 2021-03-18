import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/NavbarLogin.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/SidebarInicio.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routesLogin.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-5.jpg";
import logo from "@material-ui/icons/Home";
import SkGrids from './skGrids'
import WN from "@material-ui/icons/Warning"
import E from "@material-ui/icons/Error"
import CheckCircle from "@material-ui/icons/CheckCircle"
import Snackbar from "components/Snackbar/Snackbar.js";

let ps;
const switchRoutes = (props)=>{return (
  <Switch>
    {routes({setBandLoad: props.setBandLoad,showNotification:props.showNotification}).map((prop, key) => {
      if (prop.layout === "/inicio") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/" to="/inicio/acceso" />
  </Switch>
);}

const useStyles = makeStyles(styles);

const Inicio=({ ...rest }) => {
  const [bandLoad, setBandLoad] = React.useState(true)
  // styles
  let bandFadeSide = [true]
  let posMain = ''
  let leftMain = 0
  if(window.innerWidth>=960){
    posMain='absolute'
    leftMain=260
  }
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const [tr, setTR] = React.useState(false);
  const [iconSnack, setIconSnack] = React.useState();
  const [colorSnack, setColorSnack] = React.useState("");
  const [L, setL] = React.useState("")
  const showNotification = place => {
    
    switch (place) {
      case "trC":
      case "tr":
        setColorSnack("warning")
        setIconSnack(WN)
        switch(place){
          case "tr":
            setL("Advertencia, rellenar todos los campos");
          break;
          default: 
            setL("Advertencia, correo inválido");
          break;
        }
        
        break;
      case "trA":
        setColorSnack("success")
        setIconSnack(CheckCircle)
        setL("Empleado registrado con éxito");
      
      break;
      case "trE3":
      case "trE2":
      case "trE1":
        setColorSnack("danger")
        setIconSnack(E)
        switch (place) {
          case "trE1":
            setL("Error, la contraseña es incorrecta");
            break;
          case "trE2":
            setL("Error, el N° de empleado no existe");
            break;
          default:
            setL("Error en la conexión");
            break
        }
      
      break;
      default:
        break;
    }
    if (!tr) {
        setTR(true);
        setTimeout(function () {
          setTR(false);
        }, 6000);
    }
  };
  const propsA = {setBandLoad,showNotification}
  
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };

  const resizeFunction = () => {
    const sideBtn = document.getElementById("sideBtn")
  
    if (window.innerWidth >= 960) {
      sideBtn.style.display='block'
      if(bandFadeSide[0]){
        sideBtn.nextSibling.nextSibling.style.left='260px'
        sideBtn.nextSibling.nextSibling.style.width=(window.innerWidth-260)+'px'
      }
     
      setMobileOpen(false);
    }else{
      sideBtn.style.display='none'
      sideBtn.nextSibling.nextSibling.style.left='0'
      sideBtn.nextSibling.nextSibling.style.width='100%'
    }
  };
  
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    
    try{
   if(bandLoad) {
      if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }
  }catch(e){
    console.log(e)
  }
  }, [mainPanel]);

  return (
    <>
    <Snackbar
          place="tr"
          color={colorSnack}
          icon={iconSnack}
          message={L}
          open={tr}
          closeNotification={() => setTR(false)}
          close
        />
    <SkGrids height={50} c={10} classes={classes} bandLoad={bandLoad} />
    {bandLoad && <div  className={classes.wrapper}  >
      
      <Sidebar
        
        routes={routes}
        logoText={"Bienvenido"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bandFadeSide={bandFadeSide}
        setMobileOpen={setMobileOpen}
        {...rest}
      />
      
      <div className={classes.mainPanel} style={{position: posMain, left:leftMain}} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes(propsA)}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes(propsA)}</div>
        )}
        {getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>}

    </>
  );
}
export default Inicio