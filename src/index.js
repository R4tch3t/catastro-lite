/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import cookie from "react-cookies";
import decrypt from "views/Dashboard/decrypt"
import ls from 'local-storage'
import "assets/css/material-dashboard-react.css?v=1.8.0";

import("react-dom").then((ReactDOM)=>{
  import("history").then(({createBrowserHistory})=>{
    import("react-router-dom").then(({ HashRouter, Route, Switch, Redirect })=>{
          const hist = createBrowserHistory();
          try{
            console.log(ls.get("idRol"))
            const idRol = (ls.get("idRol")&&cookie.load("idUsuario"))?ls.get("idRol"):"" 
          switch(decrypt(idRol)){
            case "0":
            import("layouts/Usuario.js").then(({ Usuario })=>{  
              ReactDOM.render(
                <HashRouter history={hist}>
                  <Switch>
                    <Route path="/" component={Usuario} />
                  </Switch>
                </HashRouter>,
                document.getElementById("root")
              )
            })
            break;
            case "1":
            import("layouts/Admin.js").then(( {Admin} )=>{  
              ReactDOM.render(
                <HashRouter history={hist}>
                  <Switch>
                    <Route path="/" component={Admin} />
                  </Switch>
                </HashRouter>,
                document.getElementById("root")
              )
            })
            break;
            default:
            import("layouts/Inicio.js").then(({ Inicio })=>{
              ReactDOM.render(
                <HashRouter history={hist}>
                  <Switch>
                    <Route path="/" component={Inicio} />
                  </Switch>
                </HashRouter>,
                document.getElementById("root")
              );
            })
            break; 
          }
        }catch(e){
          console.log(e)
        }
    })
  });
})