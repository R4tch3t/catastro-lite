import React from "react";
import cookie from "react-cookies";
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

import ip from "variables/ip";
import decrypt from "views/Dashboard/decrypt.js";
import encrypt from "views/Dashboard/encrypt.js";
import ls from 'local-storage'

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

export default function EditarContraseña() {
  const [tr, setTR] = React.useState(false);
  const [colorSnack, setColorSnack] = React.useState();
  const [iconSnack, setIconSnack] = React.useState();
  const [messageSnack, setMessageSnack] = React.useState("");

  const classes = useStyles();
  const showNotification = place => {
    switch (place) {
      case "tr":
        setColorSnack("warning")
        setIconSnack(WN)
        setMessageSnack('Advertencia, rellenar todos los campos')
        
        break;
      case "trE1":
      case "trE2":  
      case "trP":
      case "trC":
        setColorSnack("danger")
        setIconSnack(E)
        switch(place){
          case "trE1":
            setMessageSnack('Error, no hay conexion a internet')
            break;
          case "trE2":
            setMessageSnack('Error, el N° de empleado no existe')
            break;
          case "trC":
            setMessageSnack('Error, correo inválido')
          break;
          default:
            setMessageSnack('Error, contraseña incorrecta')
          break;
        }
      break;
      case "trA":
        setColorSnack("success")
        setIconSnack(CheckCircle)
        setMessageSnack('Contraseña actualizada con éxito')
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

const validarPass = () => {
  const pass = decrypt(ls.get('pass'))
  const passChange = document.getElementById('passChange')
  const passN = document.getElementById('passN')
  const passC = document.getElementById('passC')
  if (passChange.value === '') {
    showNotification("tr")
    passChange.focus()
    return false
  }

  if (passN.value === '') {
    showNotification("tr")
    passN.focus()
    return false
  }

  if (passC.value === '') {
    showNotification("tr")
    passC.focus()
    return false
  }

  if (passChange.value !== pass) {
    showNotification("trP")
    passChange.focus()
    return false
  }

  if (passN.value !== passC.value) {
    showNotification("trP")
    passN.focus()
    return false
  }

  actualizarPass(passN.value)
}

const actualizarPass = async (pass) => {
  try {
    // console.log(this.nombre)
    //  console.log(this.nombre.current.value)
        const sendUri = ip("3017")+"actualizarP";
       // const sendUri = "http://34.66.54.10:3017/";
       // const sendUri = 'http://localhost:3017/'
        //const sendUri = "http://192.168.1.74:3017/";
        //const pass = this.newPass.current.value
        const CVE_ID = decrypt(cookie.load("idUsuario"))

        const bodyJSON = {
          idUsuario: CVE_ID,
          pass: pass
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
          if(r[0]!==undefined&&`${r[0].idUsuario}`===`${CVE_ID}`){
            //cookie.remove("pass", { path: "/" });
            ls.remove("pass");
            ls.set("pass",encrypt(pass));
            //cookie.save("pass", pass, { path: "/" });
            showNotification("trA")
          } else if (r.error.name === 'error01') {
            showNotification("trE1")
          } 
        })
        

    } catch (e) {
        console.log(`Error: ${e}`)
    }
};

const changeToEdit = () => {
  const divPass = document.getElementById('divPass')
  const divContainer = document.getElementById('divContainer')
  divPass.style.display = 'none'
  divContainer.style.display = 'block'
}

  return (
    <div id='divPass' style={{display: 'none'}} >
      <GridContainer>
        <Snackbar
          place="tr"
          color={colorSnack}
          icon={iconSnack}
          message={messageSnack}
          open={tr}
          closeNotification={() => setTR(false)}
          close
        />
        
        <GridItem xs={8} sm={8} md={2}>         
        </GridItem> 
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Actualizar contraseña</h4>
              <p className={classes.cardCategoryWhite}>Completar los campos</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={4} sm={4} md={4}/>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Contraseña actual"
                    id="passChange"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'password'
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={4} sm={4} md={2}/>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Nueva contraseña"
                    id="passN"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'password'
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Confirmar contraseña"
                    id="passC"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'password'
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button id = 'actPB'
                color="success"  
                style={{
                  display: 'flex',
                  flex: 1, 
                  alignItems: 'center'
                }}
                onClick = {validarPass}
                >
                Guardar cambios
              </Button>
            </CardFooter>
            <CardFooter>
              <Button
                color="danger"  
                style={{
                  display: 'flex',
                  flex: 1, 
                  alignItems: 'center'
                }}
                onClick = {changeToEdit}
                >
                Atras
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  );
}
