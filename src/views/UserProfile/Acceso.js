import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import WN from "@material-ui/icons/Warning"
import E from "@material-ui/icons/Error"
import CheckCircle from "@material-ui/icons/CheckCircle"
import Snackbar from "components/Snackbar/Snackbar.js";

import comprobarU from './comprobarU'
 
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Acceso(props) {
  const {setBandLoad,showNotification} = props;
  const [tr, setTR] = React.useState(false);
//  const [bandLoad, setBandLoad] = React.useState(false);
  const [iconSnack, setIconSnack] = React.useState();
  const [colorSnack, setColorSnack] = React.useState("");
  const [L, setL] = React.useState("")
  const classes = useStyles();
  /*const showNotification = place => {
    
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
  };*/
  
  

  const validarDatos = () => {
    const CVE_ID = document.getElementById('idUsuario')
    const pass = document.getElementById('pass')
    if (CVE_ID.value === '') {
      showNotification("tr")
      CVE_ID.focus()
      return false
    }

    if (pass.value === '') {
      showNotification("tr")
      pass.focus()
      return false
    }
    comprobarU(CVE_ID.value, pass.value, null,null,null,null,showNotification,setBandLoad);
  }

const accesoKey = (e) =>{
  if (e.which === 13) {
    validarDatos();
  }
}

  return (<>
    
    <div>
      <GridContainer>
        <Snackbar
          place="tr"
          color={colorSnack}
          icon={iconSnack}
          message={L}
          open={tr}
          closeNotification={() => setTR(false)}
          close
        />
        <GridItem xs={8} sm={8} md={4}></GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Acceder al sistema</h4>
              <p className={classes.cardCategoryWhite}>
                Favor de ingresar su número de empleado y contraseña
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={4} sm={4} md={3} />
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="ID de empleado"
                    id="idUsuario"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      onKeyUp: accesoKey
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={4} sm={4} md={3} />
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Contraseña"
                    id="pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      onKeyUp: accesoKey
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button
                id="regB"
                color="success"
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center"
                }}
                onClick={validarDatos}
              >
                Entrar
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
    </>
  );
}
