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
import 'react-calendar/dist/Calendar.css';
import ReactDOM from "react-dom"
import {createBrowserHistory} from "history"
import { HashRouter, Route, Switch } from "react-router-dom"
import Usuario from "layouts/Usuario"
import Admin from "layouts/Admin"
import Inicio from "layouts/Inicio"
          const hist = createBrowserHistory();
          try{
         //   const [bandLoad, setBandLoad] = React.useState(false)
          const idRol = (ls.get("idRol")&&cookie.load("idUsuario"))?ls.get("idRol"):"" 
          
          switch(decrypt(idRol)){
            case "0":
              ReactDOM.render(
                <HashRouter history={hist}>
                  <Switch>
                    <Route path="/" component={Usuario} />
                  </Switch>
                </HashRouter>,
                document.getElementById("root")
              );
            break;
            case "1":
            ReactDOM.render(
                <HashRouter history={hist}>
                  <Switch>
                    <Route path="/" component={Admin} />
                  </Switch>
                </HashRouter>,
                document.getElementById("root")
              );
            break;
            default:
              ReactDOM.render(
                <HashRouter history={hist}>
                  <Switch>
                    <Route path="/" component={Inicio} />
                  </Switch>
                </HashRouter>,
                document.getElementById("root")
              );
            break; 
          }
        }catch(e){
          console.log(e)
        }
    