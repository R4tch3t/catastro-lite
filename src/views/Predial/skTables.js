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
    return <c> 

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h1>{bandLoad || <Skeleton height={100} animation="wave" />}</h1>
            </GridItem>
          </GridContainer>
          { keys.map((row, index) => {
            return <div key={index} ><SK /></div>
          })}
          

    </c>
}