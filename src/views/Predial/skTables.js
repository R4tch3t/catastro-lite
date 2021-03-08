import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
export default (props) => {
    const {bandLoad} = props

    if(bandLoad){
      return <> </>
    }else
    return <> 

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h1>{bandLoad || <Skeleton animation="wave" />}</h1>
            </GridItem>
          </GridContainer>
 
          <h3>{bandLoad || <Skeleton animation="wave" />}</h3>
          <h3>{bandLoad || <Skeleton animation="wave" />}</h3>
          <h3>{bandLoad || <Skeleton animation="wave" />}</h3>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              
              <h3>{bandLoad || <Skeleton animation="wave" />}</h3>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              
              <h3>{bandLoad || <Skeleton animation="wave" />}</h3>
            </GridItem>
          </GridContainer>

    </>
}