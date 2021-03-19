import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { isMobile } from "react-device-detect";
export default (props) => {
    const {bandLoad, height,c,classes} = props
    let keys = [];
    const SK = ()=>{return <>
    <GridContainer>
      <GridItem xs={12} sm={12} md={3}/>
            <GridItem xs={12} sm={12} md={8}>
              {bandLoad || <Skeleton  height={height?height:50} animation="wave" />}
            </GridItem>

    </GridContainer>
    </>}
    while(keys.length<c){
      keys.push(keys.length);
    }
    if(bandLoad){
      return <> </>
    }else
    return <> 

          <GridContainer>
            <GridItem xs={12} sm={12} md={2}>
              {bandLoad || (!isMobile && <Skeleton variant="rect" animation="wave" style={{position: 'absolute', left: 0,top:0}} width={260}  height={window.innerHeight} />)}
            </GridItem>
            <GridItem xs={12} sm={12} md={8}/>
            <GridItem xs={12} sm={12} md={2}>
              {bandLoad || <Skeleton variant="circle" animation="wave"  style={{position: 'absolute', right: 5,top:5}} width={50} height={50} />}
            </GridItem>
            
          </GridContainer>
          <CardIcon>
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>{'\0'} </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>{'\0'} </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={3}/>
        <GridItem xs={12} sm={12} md={8}>
          {bandLoad || <Skeleton  animation="wave" height={150} />}
          {bandLoad || (!isMobile && <Skeleton variant="rect" style={{position: 'absolute', left: 320,top:120}} width={1155}  height={window.innerHeight-100} />)}
          
          {/*<Card>
            
            <CardHeader color="none">
              
            </CardHeader>
            <CardBody>
              
              <div className={classes.searchWrapper}>
                

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                     
                  </GridItem>
                  
                </GridContainer>
              </div>
              

            </CardBody>
          </Card>*/}
        </GridItem>
      </GridContainer>
      { keys.map((row, index) => {
            return <div key={index} ><SK /></div>
          })}
    </CardIcon>
          {/*<GridContainer>
          <GridItem xs={12} sm={12} md={3}/>  
          <GridItem xs={12} sm={12} md={8}>
              {bandLoad || <Skeleton style={{marginTop: 50}} variant="text"  height={100} />}
            </GridItem>
          </GridContainer>

          <GridContainer>
          <GridItem xs={12} sm={12} md={3}/>   
          <GridItem xs={12} sm={12} md={8}>   
          
          { keys.map((row, index) => {
            return <div key={index} ><SK /></div>
          })}
          {bandLoad || <Skeleton variant="rect" style={{position: 'absolute', left: 320,top:100}} width={1155}  height={window.innerHeight-120} />}
          </GridItem>
          </GridContainer>*/}

    </>
}