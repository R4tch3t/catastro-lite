import React from 'react';
import ReactDOM from "react-dom";
import Checker from "./Checker";
export default (subS, task, checkeds, strs, ids, fa) => {
try{
    const sub = document.getElementById(subS);
    ReactDOM.unmountComponentAtNode(sub);
    
    ReactDOM.render(
        <Checker
            checkedIndexes={checkeds}
            tasksIndexes={task}
            strs={strs}
            ids={ids}
            fa={fa}
        />,
        sub
    );

    }catch(e){

    }

}