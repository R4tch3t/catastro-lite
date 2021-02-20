import React from "react";
import cookie from "react-cookies";
import EditarContraseña from "views/UserProfile/EditarContraseña.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import WN from "@material-ui/icons/Warning"
import E from "@material-ui/icons/Error"
import CheckCircle from "@material-ui/icons/CheckCircle"
import Snackbar from "components/Snackbar/Snackbar.js";

import decrypt from "views/Dashboard/decrypt.js";
import ls from 'local-storage'
import actualizar from "./actualizarU"
import AvatarClass from "./AvatarClass"


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

export default () => {
  var state = {
    avatar64: null
  }
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
        setMessageSnack('Se actualizó con éxito')
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

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const selectFile = async () => {    
    const file = document.querySelector('#file-input').files[0]
    const result = await toBase64(file).catch(e => e);
    if (result instanceof Error) {
      console.log('Error: ', result.message);
      return;
    }
    state.avatar64 = `'${result}'`
    document.getElementById('avatarProfile').src = result
  };


const changeToPass = () => {
  const divPass = document.getElementById('divPass')
  const divContainer = document.getElementById('divContainer')
  divPass.style.display = 'block'
  divContainer.style.display = 'none'
}

const idEmpleado = decrypt(cookie.load("idUsuario"))
const nombre = decrypt(cookie.load("nombre"))
const correo = decrypt(cookie.load("correo"))
const edad = decrypt(cookie.load("edad"))
const pass = decrypt(ls.get("pass"))

  const validarDatos = () => {
    const nombre = document.getElementById('nombre')
    const correo = document.getElementById('correo')
    const splitA = correo.value.toLowerCase().split("@")
    const edad = document.getElementById('edad')
    const pass = document.getElementById('passE')
    const passC = decrypt(ls.get('pass'))

    if (nombre.value === '' || nombre.value === ' ') {
      showNotification("tr")
      nombre.focus()
      
      return false
    }

    if (correo.value === '') {
      showNotification("tr")
      correo.focus()
      return false
    }

    if (splitA.length <= 1) {
      showNotification("trC")
      correo.focus()
      return false
    }

    const splitB = splitA[1].split(".")

    if (splitB[1] !== "com") {
      showNotification("trC")
      correo.focus()
      return false
    }

    if (edad.value === '' || isNaN(edad.value)) {
      showNotification("tr")
      edad.focus()
      return false
    }

    if (pass.value === '') {
      showNotification("tr")
      pass.focus()
      return false
    }
    //console.log(`pass: ${pass.value} passC: ${passC}`)
    if (passC !== pass.value) {
      showNotification("trP")
      pass.focus()
      return false
    }

    actualizar(idEmpleado,state.avatar64, showNotification);
  }

  return (
  <> 
    <EditarContraseña />
    <div id='divContainer'>
      
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
              <h4 className={classes.cardTitleWhite}>Editar registro</h4>
              <p className={classes.cardCategoryWhite}>Completar su perfil</p>
            </CardHeader>
            <CardBody>
              <CardAvatar profile>
                <input id="file-input" type="file" onChange={selectFile}  name="avatar" style={{display: 'none'}} />
                <a  style={{cursor: 'pointer'}} onClick={()=>{document.getElementById('file-input').click()}} >
                  <AvatarClass idEmpleado={idEmpleado} />
                </a>
              </CardAvatar>
              <GridContainer>
                <GridItem xs={4} sm={4} md={2}/> 
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    
                    labelText="N° de empleado"
                    id="idEmpleado"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'number',
                      readOnly: true,
                      defaultValue: idEmpleado
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nombre"
                    id="nombre"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      //value: nombre,
                      defaultValue: nombre
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={4} sm={4} md={2}/>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Correo"
                    id="correo"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: correo
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Edad"
                    id="edad"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'number',
                      defaultValue: edad
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={4} sm={4} md={4}/>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Contraseña"
                    id="passE"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'password',
                      autoFocus: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button 
                color="primary"  
                style={{
                  display: 'flex',
                  flex: 1, 
                  alignItems: 'center'
                }}
                onClick = {changeToPass}
                >
                Cambiar contraseña
              </Button>
            </CardFooter>
            <CardFooter>
              <Button id = 'actB'
                color="success"  
                style={{
                  display: 'flex',
                  flex: 1, 
                  alignItems: 'center'
                }}
                onClick = {validarDatos}
                >
                Guardar cambios
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
    </>
  );

}
/*}
return (<EditClass />)*/
//}
