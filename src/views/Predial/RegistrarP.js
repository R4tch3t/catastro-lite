import React from "react";
import TablesRP from "./TablesRP.js";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import stylesM from "assets/jss/material-dashboard-react/components/listItemStyle.js";

const useStyles = makeStyles(styles);
const useStylesM = makeStyles(stylesM);
export default () => {
  const classes = useStyles();
  const classesM = useStylesM();
  
 
  return (
   <TablesRP 
                classes={classes} classesM={classesM} />
  );
}
