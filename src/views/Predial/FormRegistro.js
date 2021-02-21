import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import {isMobile} from "react-device-detect";
import Checker from './Checker';
import { makeStyles } from "@material-ui/core/styles";
import stylesM from "assets/jss/material-dashboard-react/components/listItemStyle.js";
import Button from "components/CustomButtons/Button.js";
import {Popper} from "components/Popper";
import genItemsTC from "views/Dashboard/genItemsTC"
import genItemsZU from "views/Dashboard/genItemsZU"
import genItemsZR from "views/Dashboard/genItemsZR"
const useStylesM = makeStyles(stylesM);
export default (props) => {
    const {c} = props;
    let selectionStartNombre = null;
    let selectionEndNombre = null;
    let bandLoading=false;
    const d = new Date()
    const Y = d.getFullYear()
    const [openTC, setOpenTC] = React.useState(false);
    const [openZona, setOpenZona] = React.useState(false);
    const classesM = useStylesM();
    const checkU = document.getElementById('check0');

    const handleUpper = e => {
        c.updateNB();
        noDisabled(e);
        if (e&&(e.which === 32 || e.which > 39) && !isMobile) {
            selectionStartNombre = e.target.selectionStart
            selectionEndNombre = e.target.selectionEnd
            e.target.value = e.target.value.toUpperCase()
            e.target.setSelectionRange(selectionStartNombre, selectionEndNombre);
        }
    }
    const padrones=()=>{
        const checkU = document.getElementById('check0');
        const tp = checkU.checked ? 'u' : 'r'
        c.padrones(tp)
    }

    const noDisabled=e=>{
        c.setState({
            disabledReg: false
        })
    }

    const handleKUpper = e => {
        c.updateNB();
        noDisabled(e);
        if(props.a){
            if(!c.state.bandPost){
                padrones()
            }else{
                if(!bandLoading){
                    bandLoading=true;
                    waitPost()
                }
            }
        }
    }

    const waitPost = async() => {
        
        while(c.state.bandPost){
            await sleep(300);    
        }
        padrones()
        bandLoading=false;
    }
    
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const handleMUpper = e => {
        c.updateNB();
        noDisabled(e)
        if(props.a){
            if(!c.state.bandPost){
                padrones()
            }else{
                if(!bandLoading){
                    bandLoading=true;
                    waitPost()
                }
            }
        }
    }

    const changeTC = event => {
        if (openTC && openTC.contains(event.target)) {
            setOpenTC(null);
        } else {
            setOpenTC(event.currentTarget);
        }
    }

    const handleClickTC = event => {
        changeTC(event);
    };

    const handleKeyTC = event => {
        setOpenTC(event.currentTarget);
    };

    const handleCloseTC = () => {
        setOpenTC(null);
    };

    const tcHandle = (tc) => (e) => {
        document.getElementById('tc').value=tc;
        handleUpper()
        handleCloseTC();
        const zona = document.getElementById('zona').value
        calcBG(tc,zona);
    }

    const calcBG = async (tc = document.getElementById('tc').value, zona = document.getElementById('zona').value) => {
        if (!zona) {
            zona = 0 
        }
        if (!tc) {
            tc = 0
        }
        const checkU = document.getElementById('check0');
        const bg = document.getElementById('baseGravable');
        let m1 = document.getElementById('m1').value;
        const m2 = document.getElementById('m2').value;
        const tp = checkU.checked ? 'u' : 'r'
        if(tp==='r'&&zona>300){
            m1/=10000
        }
        let p1 = m1;
        let p2 = m2;
        let umaZ = 89.63 * zona;
        let umaC = 89.63 * tc;
        p1 = p1 * umaZ
        p2 = p2 * umaC

        bg.value = p1 + p2;
        bg.value = Math.round(bg.value)
        c.setState({disabledReg: false})
        
    }

    const zonaHandle = (zona) => (e) => {
        document.getElementById('zona').value=zona
        handleUpper()
        handleCloseZona();
        const tc = document.getElementById('tc').value
        calcBG(tc, zona);
    }

    const handleCloseZona = () => {
        setOpenZona(null)
    };

    const changeZona = event => {
        if (openZona && openZona.contains(event.target)) {
            setOpenZona(null)
        } else {
            setOpenZona(event.currentTarget)
        }
    }

    const handleClickZona = event => {
        
        changeZona(event);

    };

    const handleKeyZona = event => {
        setOpenZona(event.currentTarget)
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
        document.getElementById("file-input").value=""
        if (result instanceof Error) {
        console.log('Error: ', result.message);
            return;
        }
        c.base64 = `${result}`
        document.getElementById('pdfToUp').innerHTML = file.name
        c.bandUpTramite = false
        noDisabled()
        c.updateNB()
    };

return(
    <>
    
    <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            
            labelText="CTA"
            id="CTA"
            formControlProps={{
                fullWidth: true
            }}
            inputProps = {{
                type: 'number',
                defaultValue: c.dValInt,
                onKeyUp: handleKUpper,
                onMouseUp: handleMUpper
            }}
            />
            
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
            <CustomInput
            labelText="NOMBRE"
            id="nombre"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
            defaultValue: c.dValue,
            onKeyUp: handleUpper,
            onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridContainer>
        <Checker
            checkedIndexes={[0]}
            tasksIndexes={[0, 1]}
            strs={["URBANO", "RUSTICO"]}
            ids={["check", "check"]}
            fa={props.fa}
        />
        </GridContainer>
    </GridContainer>
    <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText="CALLE:"
            id="calle"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                defaultValue: c.dValue,
                onKeyUp: handleUpper,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
            <CustomInput
            labelText="NUMERO EXT:"
            id="numCalle"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                defaultValue: c.dValInt,
                onKeyUp: handleUpper,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
         <GridItem xs={12} sm={12} md={2}>
            <CustomInput
            labelText="LOTE:"
            id="lote"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                defaultValue: c.dValue,
                onKeyUp: handleUpper,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
            <CustomInput
            labelText="MANZANA:"
            id="manzana"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                defaultValue: c.dValue,
                onKeyUp: handleUpper,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText="COLONIA:"
            id="colonia"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                defaultValue: c.dValue,
                onKeyUp: handleUpper,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
            <CustomInput
            labelText="C.P:"
            id="cp"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "number",
                defaultValue: 41100,
                onKeyUp: handleUpper,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText="MUNICIPIO:"
            id="municipio"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                defaultValue: 'CHILAPA DE ÁLVAREZ',
                onKeyUp: handleUpper,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText="LOCALIDAD:"
            id="localidad"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                defaultValue: 'CHILAPA DE ÁLVAREZ',
                onKeyUp: handleUpper,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText="PERIODO:"
            id="periodo"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                defaultValue: Y,
                onKeyUp: handleUpper,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
    </GridContainer>

    <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText = "TERRENO (M²):"
            id="m1"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "number",
                defaultValue: 0,
                onBlur: e => {
                    calcBG()
                },
                onMouseUp: e => {
                    handleUpper()
                    calcBG()
                },
                onKeyUp: e => {
                    handleUpper()
                    calcBG()
                }
            }}
            />
        </GridItem>

        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText = "CONSTRUCCIÓN (M²):"
            id="m2"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "number",
                defaultValue: 0,
                onBlur: e => {
                    calcBG()
                },
                onMouseUp: e => {
                    handleUpper()
                    calcBG()
                },
                onKeyUp: e => {
                    handleUpper()
                    calcBG()
                }
            }}
            />
        </GridItem>

        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText="TIPO DE CONSTRUCCIÓN:"
            id="tc"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "number",
                onKeyUp: handleKeyTC,
                onClick: handleClickTC,
                defaultValue: 0,
              //  disabled: CBG
            }}
            />

            <Popper handleClickItem={()=>{}} handleCloseDash={handleCloseTC} openDash={openTC} classesM={classesM} 
              Items={genItemsTC(tcHandle)}  />
        </GridItem>

        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText="ZONA:"
            id="zona"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "number",
                onKeyUp: handleKeyZona,
                onClick: handleClickZona,
                defaultValue: 0,
             //   disabled: CBG
            }}
            />

             <Popper handleClickItem={()=>{}} handleCloseDash={handleCloseZona} openDash={openZona} classesM={classesM} 
                Items={checkU&&checkU.checked?genItemsZU(zonaHandle):genItemsZR(zonaHandle)} />  
            
        </GridItem>
    </GridContainer>
    <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
            <CustomInput
            labelText="BASE GRAVABLE:"
            id="baseGravable"
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "number",
                defaultValue: 0,
                onKeyUp: c.KUEnter,
                onBlur: c.setBg,
                onMouseUp: handleUpper
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={9}>
            <CustomInput
                labelText="OBSERVACIONES:"
                id="obs"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    defaultValue: c.dValue,
                    onKeyUp: c.KUEnter,
                    //onBlur: c.setBg,
                    onMouseUp: handleUpper
                }}
            />
        </GridItem>
        </GridContainer>
        <GridContainer>
        <GridItem xs={12} sm={12} md={3}>    
            <input id="file-input" type="file" onChange={selectFile} name="avatar" style={{display: 'none'}} />
                <a  /*style={{cursor: 'pointer'}}*/ >  
                  <div style={{height: 28}} >Subir expediente:</div>
                  <div style={{height: 28, width: 600, color: 'red'}} id='pdfToUp' ></div>
                    <Button
                        color="primary"  
                        style={{
                            display: 'flex',
                            flex: 1, 
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={()=>{document.getElementById('file-input').click()}}
                    >
                        Seleccionar archivo
                    </Button>
                </a>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>    
            <input id="file-input" type="file" onChange={selectFile} name="avatar" style={{display: 'none'}} />
             <div style={{height: 28}} ></div>
                    
        </GridItem>
    </GridContainer>        
    </>
)
}