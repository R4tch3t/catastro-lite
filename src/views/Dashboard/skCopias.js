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
            <GridItem xs={12} sm={12} md={6}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={1} />
            <GridItem xs={12} sm={12} md={3}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={3} />
            <GridItem xs={12} sm={12} md={2}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={3} />
            <GridItem xs={12} sm={12} md={2}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <h2>{bandLoad || <Skeleton animation="wave" />}</h2>
            </GridItem>
          </GridContainer>

    </>
}