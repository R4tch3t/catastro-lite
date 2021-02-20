import React from "react";
import removeCoockies from "views/UserProfile/RemoveCoockies";
//import cookie from "react-cookies";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Button from "components/CustomButtons/Button.js";
import ls from 'local-storage'
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import encrypt from "views/Dashboard/encrypt"

const useStyles = makeStyles(styles);
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openDash, setOpenDash] = React.useState(null);

  var idUsuario = getParameterByName('idUsuario');
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleClickDash = event => {
    if (openDash && openDash.contains(event.target)) {
      setOpenDash(null);
    } else {
      setOpenDash(event.currentTarget);
    }
  };

  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  
  const handleCloseDash = () => {
    setOpenDash(null);
  };

  const salir = () => {
    removeCoockies()
    window.history.pushState(null, 'Accesar', '#/inicio/acceso')
    window.history.go()
  }
  const toProfile = () => {
    window.history.pushState(null, 'Perfil', '#/admin/perfil')
    window.history.go()
  }

  const changeRol = () => {
    //cookie.remove("idRol", { path: "/" });
    //ls.remove("idRol");
    ls.set("idRol",encrypt(0));
    window.history.pushState(null, 'Usuario', '#/usuario/creditos')
    window.history.go()
  }

  return (
    <div>
     {/* <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          id='idEmpleado'
          inputProps={{
            placeholder: "Buscar empleado",
            type: 'number',
            onKeyUp: handleKup,
            //value: idUsuario,
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" onClick={searchU} aria-label="edit" justIcon round>
          <Search />
        </Button>
        </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openDash ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickDash}
          className={classes.buttonLink}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Quincenas</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openDash)}
          anchorEl={openDash}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openDash }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseDash}>
                    <MenuList role="menu">
                      <Quincenas classes={classes} userType={'#admin/creditos'} />
                    </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      */ }
      <div className={classes.manager} style={{zIndex: 99999}} >
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Perfil</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={toProfile}
                      className={classes.dropdownItem}
                    >
                      Editar perfil
                    </MenuItem>
                    <MenuItem
                      onClick={changeRol}
                      className={classes.dropdownItem}
                    >
                      Usuario
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={salir}
                      className={classes.dropdownItem}
                    >
                      Cerrar sesión
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
