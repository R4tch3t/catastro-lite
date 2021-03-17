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
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import encrypt from "views/Dashboard/encrypt";

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

const genDate = (CTA,idHistory,nombre,tp,
                  calle,numero,lote,manzana,col,cp,municipio,
                  localidad,obs,m1,m2,tc,zona,bg,mov,dateIn) => {
  let url = `#/admin/historial`
  let subUrl = `?bandCTA=1&CTA=${CTA}&idHistory=${idHistory}&tp=${tp}&nombre=${nombre}&`
  subUrl += `calle=${calle}&numero=${numero}&lote=${lote}&manzana=${manzana}&col=${col}&`
  subUrl += `cp=${cp}&municipio=${municipio}&localidad=${localidad}&obs=${obs}&m1=${m1}&`
  subUrl += `m2=${m2}&tc=${tc}&zona=${zona}&bg=${bg}&mov=${mov}&dateIn=${dateIn}`
  url += `?v=${encrypt(subUrl)}`;
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
                  onMouseUp={(e)=>{genDate(row.CTA,row.idHistory,row.nombre,row.tp,
                  row.calle,row.numero, row.lote, row.manzana,row.col,row.cp,row.municipio,
                  row.localidad,row.obs,row.m1,row.m2,row.tc,row.zona,row.bg,row.mov,row.dateIn,row.idUsuario,row.folio,row.idOrden)}}>
                  {row.idHistory}
                </TableCell>
                <TableCell className={classes.tableCell} 
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row.CTA,row.idHistory,row.nombre,row.tp,
                  row.calle,row.numero, row.lote, row.manzana,row.col,row.cp,row.municipio,
                  row.localidad,row.obs,row.m1,row.m2,row.tc,row.zona,row.bg,row.mov,row.dateIn)}}>
                  {row.mov}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row.CTA,row.idHistory,row.nombre,row.tp,
                  row.calle,row.numero, row.lote, row.manzana,row.col,row.cp,row.municipio,
                  row.localidad,row.obs,row.m1,row.m2,row.tc,row.zona,row.bg,row.mov,row.dateIn)}}>
                  {row.idUsuario}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row.CTA,row.idHistory,row.nombre,row.tp,
                  row.calle,row.numero, row.lote, row.manzana,row.col,row.cp,row.municipio,
                  row.localidad,row.obs,row.m1,row.m2,row.tc,row.zona,row.bg,row.mov,row.dateIn)}}>
                  {row.CTA}
                </TableCell>
                <TableCell className={classes.tableCell} 
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row.CTA,row.idHistory,row.nombre,row.tp,
                  row.calle,row.numero, row.lote, row.manzana,row.col,row.cp,row.municipio,
                  row.localidad,row.obs,row.m1,row.m2,row.tc,row.zona,row.bg,row.mov,row.dateIn)}}>
                  {row.idOrden}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row.CTA,row.idHistory,row.nombre,row.tp,
                  row.calle,row.numero, row.lote, row.manzana,row.col,row.cp,row.municipio,
                  row.localidad,row.obs,row.m1,row.m2,row.tc,row.zona,row.bg,row.mov,row.dateIn)}}>
                  {row.folio}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row.CTA,row.idHistory,row.nombre,row.tp,
                  row.calle,row.numero, row.lote, row.manzana,row.col,row.cp,row.municipio,
                  row.localidad,row.obs,row.m1,row.m2,row.tc,row.zona,row.bg,row.mov,row.dateIn)}}>
                  {row.dateIn}
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
