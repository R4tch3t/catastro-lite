import React from "react";
import Poppers from "@material-ui/core/Popper";
import classNames from "classnames";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
export default (props)=>{
    const {handleClickDash,handleCloseDash, openDash, classesM, handleClickItem, buscarFolio, Items} = props
    return(
        <>
              <Poppers
                open={Boolean(openDash)}
                anchorEl={openDash}
                transition
                disablePortal
                className={
                  classNames({ [classesM.popperClose]: !openDash }) +
                  " " +
                  classesM.popperNav
                }
                style={{ zIndex: 9999 }}
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
                            
                           {
                           Items.map((v,i)=>{
                               return(
                                <MenuItem
                                    key={v.k}
                                    className={classesM.dropdownItem}
                                    onClick={v.handleClickItem?v.handleClickItem(v.i?v.i:v.k):handleClickItem(i)}
                                >
                                    {v.html}
                                </MenuItem>
                               )
                           })
                           /*<MenuItem
                            key={"cuenta"}
                            className={c.buscarCTA(0)}
                            onClick={handleClick}
                          >
                            Por CTA.
                          </MenuItem>
                          <MenuItem
                            key={"nombre"}
                            className={classesM.dropdownItem}
                            onClick={handleClick}
                          >
                            Por nombre
                          </MenuItem>
                          <MenuItem
                            key={"folio"}
                            className={classesM.dropdownItem}
                            onClick={buscarFolio()}
                          >
                            Por folio
                          </MenuItem>*/}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
        </>
    )
}
