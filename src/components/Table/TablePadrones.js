import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from "components/CustomButtons/Button.js";
import ls from 'local-storage'
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import encrypt from "views/Dashboard/encrypt";
import decrypt from "views/Dashboard/decrypt";
import GridContainer from "components/Grid/GridContainer";
import ip from "../../variables/ip.js";

const useStyles = makeStyles(styles);
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, tableHead, tableHeaderColor, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              
              {tableHead.map((row, index) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={row.id}
                    sortDirection={orderBy === row.id ? order : false}
                    rowSpan='1'
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={createSortHandler(row.id)} 
                      >
                    {row.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            
            </TableRow>
          </TableHead>
  );
}
const genCTA = (CTA, tp) => {
  const idRol = decrypt(ls.get('idRol'));
  let url = idRol === '1' ? `#/admin/orden` : `#/usuario/orden`
  let subUrl = `?bandCTA=1&genCTA=${CTA}&tp=${tp}`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}

const genCarta = (CTA, nombre, ubi, tp) => {
  const idRol = decrypt(ls.get('idRol'));
  //let url = idRol === '1' ? `#/admin/padron` : `#/usuario/padron`
  let url = idRol === '1' ? `orden/admin#/admin/padron` : `orden/usuario#/usuario/padron`
  const y = new Date().getFullYear()
  let subUrl = `?bandCarta=1&genCTA=${CTA}&nombre=${nombre}&ubi=${ubi}&tp=${tp}`
  subUrl+=`&añoI=${y}&añoF=${y}`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}

const genCerti = (CTA, nombre, ubi, tp, localidad, bg) => {
  const idRol = decrypt(ls.get('idRol'));
  //let url = idRol === '1' ? `#/admin/padron` : `#/usuario/padron`
  let url = idRol === '1' ? `orden/admin#/admin/padron` : `orden/usuario#/usuario/padron`
  const y = new Date().getFullYear()
  let subUrl = `?bandCerti=1&genCTA=${CTA}&nombre=${nombre}&ubi=${ubi}&tp=${tp}&localidad=${localidad}&bg=${bg}`
  subUrl+=`&añoI=${y}&añoF=${y}`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}

const getE = (tp, CTA, escriturasPath) => {
  tp = tp[0].toLowerCase()
  let url = `${ip(2998)}expedientes/${tp}/${CTA}/${escriturasPath}`;
  const win = window.open(url, '_blank');
  win.focus();
}

export default function CustomTable(props) {
  
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ID');
  const rows = tableData
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };
  try{
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
        <EnhancedTableHead
              classes={classes}
              tableHeaderColor={tableHeaderColor}
              order={order}
              orderBy={orderBy}
              tableHead={tableHead}
            //  onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
        />): null}
        
        <TableBody>
          { 
            stableSort(rows, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              try{
            return (
              <TableRow key={row.key} className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell} 
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.cta,row.key[row.key.length-1])}} >
                  {row.cta}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.cta,row.key[row.key.length-1])}}>
                  {row.NOMBRE}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.cta,row.key[row.key.length-1])}}>
                  {row.tp}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <GridContainer> 
                    <Button
                      id="regB"
                      color="primary"
                      style = {
                        {
                          display: "flex",
                          flex: 1,
                          alignItems: "center"
                        }
                      }
                      onMouseUp={(e)=>{genCarta(row.cta,row.NOMBRE,row.ubi,row.tp)}}
                    >
                      INVITACIÓN
                    </Button>
                  </GridContainer>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <GridContainer> 
                    <Button
                      id="regB"
                      color="success"
                      style = {
                        {
                          display: "flex",
                          flex: 1,
                          alignItems: "center"
                        }
                      }
                      onMouseUp={(e)=>{genCerti(row.cta,row.NOMBRE,row.ubi,row.tp,row.localidad,row.bg)}}
                    >
                      CATASTRAL
                    </Button>
                  </GridContainer>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <GridContainer> 
                    <Button
                      id="getE"
                      color="info"
                      style = {
                        {
                          display: "flex",
                          flex: 1,
                          alignItems: "center"
                        }
                      }
                      onMouseUp={(e)=>{getE(row.tp,row.cta,row.escriturasPath)}}
                    >
                      VER EXPEDIENTE
                    </Button>
                  </GridContainer>
                </TableCell>

              </TableRow>
            );
            }catch(e){

            }
          })}
          {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 48) * emptyRows }} >
                  <TableCell colSpan={6} />
                </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage = {`Filas por página:`}
          labelDisplayedRows={(_ref)=>{
            var from = _ref.from,
              to = _ref.to,
              count = _ref.count;
            return "".concat(from, "-").concat(to, " de ").concat(count);
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>
  );
  }catch(e){
    return(<></>)
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  tableData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
};
