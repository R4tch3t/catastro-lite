import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import GridItem from "components/Grid/GridItem.js";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);
export default (props)=>{
  const classes = useStyles()
  const [checked, setChecked] = React.useState([...props.checkedIndexes]);
  const { tasksIndexes, strs, ids, fa} = props;
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    if (currentIndex === -1) {
      if(value===1){
        if (fa) {
          fa('r');
        }
      }else{
        if (fa) {
          fa('u');
        }
      }
      newChecked.splice(currentIndex, 1);
      newChecked.push(value);
      
    } else {
      newChecked.splice(currentIndex, 1);
      if (value === 0) {
        newChecked.push(1);
      }else{
        newChecked.push(0);
      }
      /*if (fa) {
        fa('r');
      }*/
    }
    setChecked(newChecked);
    //console.log(fa)
    
    
  };
  
  return (
    <>
      {tasksIndexes.map(value => (        
            <GridItem key={value} xs={12} sm={12} md={5}>
              <div style={{cursor: 'pointer'}} onClick={() => handleToggle(value)}   >
              <Checkbox
                  id={`${ids[value]}${value}`}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.root
                  }}
              />
              {strs[value]}
              </div>
            </GridItem>    
        ))}
    </>
  )
  };
