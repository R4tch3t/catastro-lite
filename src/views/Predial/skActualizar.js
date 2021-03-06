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
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={2}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
            <GridItem xs={12} sm={12} md={9}>
              {bandLoad || <Skeleton height={75} animation="wave" />}
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              {bandLoad || <Skeleton height={150} width={400} animation="wave" />}
            </GridItem>
          </GridContainer>

    </>
}