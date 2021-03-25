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

const genDate = (row) => {
                    const {CTA,idHistory,nombreOld,nombre,tpOld,tp,
                  calleOld,calle,numeroOld,numero,loteOld,lote,manzanaOld,manzana,colOld,col,cpOld,cp,municipioOld,municipio,
                  localidadOld,localidad,obsOld,obs,m1Old,m1,m2Old,m2,tcOld,tc,zonaOld,zona,bgOld,bg,mov,dateIn,idUsuario,folio,idOrden} = row
  let url = `#/admin/historial`
  let subUrl = `?bandCTA=1&CTA=${CTA}&idHistory=${idHistory}&tp=${tp}&nombreOld=${nombreOld}&nombre=${nombre}&`
  subUrl += `calleOld=${calleOld}&calle=${calle}&numeroOld=${numeroOld}&numero=${numero}&loteOld=${loteOld}&lote=${lote}&manzanaOld=${manzanaOld}&manzana=${manzana}&colOld=${colOld}&col=${col}&`
  subUrl += `cpOld=${cpOld}&cp=${cp}&municipioOld=${municipioOld}&municipio=${municipio}&localidadOld=${localidadOld}&localidad=${localidad}&obsOld=${obsOld}&obs=${obs}&m1Old=${m1Old}&m1=${m1}&`
  subUrl += `m2Old=${m2Old}&m2=${m2}&tcOld=${tcOld}&tc=${tc}&zonaOld=${zonaOld}&zona=${zona}&bgOld=${bgOld}&bg=${bg}&mov=${mov}&dateIn=${dateIn}`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}

export default function CustomTable(props) {
  
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor , c} = props;
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(c.pI);
  const [rowsPerPage, setRowsPerPage] = React.useState(c.rpI);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ID');
  const rows = tableData
  const handleChangePage = (event, newPage) => {
    if(((newPage+1)*rowsPerPage)>=rows.length&&c.state.lengthH>rows.length){
      c.nextP+=50;
      c.countP+=50;
      if(c.nextP>c.state.lengthHID){
        c.nextP=c.state.lengthHID
      }
      c.pI=newPage;
      c.rpI=rowsPerPage;
      c.getMov(c.state.dateSI, c.state.dateNSF, 0);
    }else{
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = event => {
    const cL = page*rowsPerPage
    const newRowsPerPage = parseInt(event.target.value, 10)
    setRowsPerPage(newRowsPerPage);
    //if((page*newRowsPerPage)>rows.length){
      setPage(parseInt(cL/newRowsPerPage));
    //}
    c.pI=page;
    c.rpI=newRowsPerPage;
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
                  onMouseUp={(e)=>{genDate(row)}}>
                  {row.idHistory}
                </TableCell>
                <TableCell className={classes.tableCell} 
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row)}}>
                  {row.mov}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row)}}>
                  {row.idUsuario}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row)}}>
                  {row.CTA}
                </TableCell>
                <TableCell className={classes.tableCell} 
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row)}}>
                  {row.idOrden}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row)}}>
                  {row.folio}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genDate(row)}}>
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
