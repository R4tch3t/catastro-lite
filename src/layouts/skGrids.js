import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
export default (props) => {
    const {bandLoad, height,c} = props
    let keys = [];
    const SK = ()=>{return <>{bandLoad || <Skeleton  height={height?height:50} animation="wave" />}</>}
    while(keys.length<c){
      keys.push(keys.length);
    }
    if(bandLoad){
      return <> </>
    }else
    return <> 

          <GridContainer>
            <GridItem xs={12} sm={12} md={2}>
              {bandLoad || <Skeleton variant="rect" style={{position: 'absolute', left: 0,top:0}} width={260}  height={window.innerHeight} />}
            </GridItem>
            <GridItem xs={12} sm={12} md={8}/>
            <GridItem xs={12} sm={12} md={2}>
              {bandLoad || <Skeleton variant="circle" style={{position: 'absolute', right: 5,top:5}} width={50} height={50} />}
            </GridItem>
            
          </GridContainer>
          <GridContainer>
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
          </GridContainer>

    </>
}