import React, { useContext } from 'react';
import axios from 'axios';
import { PhonerStoreContext } from '../../contexts/PhonerStoreContext';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import ModalAddNewPhone from '../Modals/ModalAddNewPhone';
import MUITableBody from './MUITableBody';
import { validateNewPhone } from '../../utils/validateNewPhone';
import { serverURL } from '../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: 'transparent',
  },
  pagination: {
    background: '#ffffffee',
    borderRadius: '0 0 8px 8px',
    padding: '10px 0 10px 0',
  },
  table: {
    minWidth: 750,
  },
  tableRow: {
    background: '#ffffff10',
  },
  tableCell: {
    color: '#ccc',
    border: 'none',
  },
  checkBox: {
    color: '#ccc',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

let editData = {};
let editDataIndexMap = {};

function MUITable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('updatedat');
  const [selected, setSelected] = React.useState([]);
  const [edited, setEdited] = React.useState({});
  const [addNewPhoneVisible, setAddNewPhoneVisible] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editErrors, setEditErrors] = React.useState({});
  const [state, dispatch] = useContext(PhonerStoreContext);
  const rows = state.cachedPages[page] ? state.cachedPages[page] : [];
  const { isLoading } = state;

  const editMode = Object.keys(edited).length > 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = rows.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setSelected([]);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const forcedPageRefresh = async (enforcedPage) => {
    dispatch({
      type: 'SET_LOADING',
      payload: {},
    });

    const response = await axios.get(
      `${serverURL}/phones/?page=${enforcedPage}&size=${rowsPerPage}`,
    );

    dispatch({
      type: 'GET_PHONES',
      payload: {
        data: response.data,
        requestParams: { page: enforcedPage, size: rowsPerPage },
        forced: true,
      },
    });
  };

  const clearSelection = () => {
    setSelected([]);
  };

  const editSelected = async () => {
    const editedRows = {};
    for (const id of selected) {
      editedRows[id] = true;
      const index = state.cachedPages[page].findIndex((phone) => phone.id === id);
      if (!editData[id])
        editData[id] = {
          type: state.cachedPages[page][index].type,
          serial: state.cachedPages[page][index].serial,
          color: state.cachedPages[page][index].color,
        };
      editDataIndexMap[id] = index;
    }
    setEdited(editedRows);
  };

  const cancelEdit = () => {
    setEdited({});
    setSelected([]);
    editData = {};
    editDataIndexMap = {};
  };

  const handleEdit = (id, property, value, index) => {
    if (!editData[id])
      editData[id] = {
        type: state.cachedPages[page][index].type,
        serial: state.cachedPages[page][index].serial,
        color: state.cachedPages[page][index].color,
      };
    editData[id][property] = value;
    editDataIndexMap[id] = index;
  };

  const saveEdit = async () => {
    const newEditErrors = {};
    for (const id in editData) {
      const { type, serial, color } = editData[id];
      const errors = validateNewPhone(type, serial, color);
      newEditErrors[id] = errors;
    }

    let hasErrors = false;
    for (const id in newEditErrors) {
      if (newEditErrors[id].type || newEditErrors[id].serial || newEditErrors[id].color) {
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setEditErrors(newEditErrors);
      return;
    }

    await dispatch({
      type: 'UPDATE_PHONES',
      payload: {
        editData,
        editDataIndexMap,
        page,
      },
    });

    try {
      await axios.post(`${serverURL}/phones/update`, { editData });
      setEdited({});
      setSelected([]);
      forcedPageRefresh(page);
    } catch (error) {
      // no time to handle the reinsertion of the deleted items
      forcedPageRefresh(page);
    }

    setEdited({});
    setSelected([]);
  };

  const deleteSelected = async () => {
    dispatch({
      type: 'DELETE_PHONES',
      payload: {
        ids: selected,
        page,
      },
    });

    try {
      await axios.post(`${serverURL}/phones/delete`, { ids: selected });
      forcedPageRefresh(page);
      setSelected([]);
    } catch (error) {
      // no time to handle the reinsertion of the deleted items
      forcedPageRefresh(page);
    }
  };

  const openAddNewPhone = () => {
    setAddNewPhoneVisible(true);
  };

  const closeAddNewPhone = () => {
    setAddNewPhoneVisible(false);
  };

  const handleNewPhoneAdded = (success) => {
    if (success) {
      forcedPageRefresh(0);
      setSelected([]);
    }
  };

  return (
    <div className={classes.root}>
      <ModalAddNewPhone
        open={openAddNewPhone}
        close={closeAddNewPhone}
        visible={addNewPhoneVisible}
        handleNewPhoneAdded={handleNewPhoneAdded}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          deleteSelected={deleteSelected}
          clearSelection={clearSelection}
          editSelected={editSelected}
          editMode={editMode}
          cancelEdit={cancelEdit}
          saveEdit={saveEdit}
          openAddNewPhone={openAddNewPhone}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              editMode={editMode}
            />
            <MUITableBody
              order={order}
              orderBy={orderBy}
              edited={edited}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={selected}
              setSelected={setSelected}
              setPageCount={setPageCount}
              editErrors={editErrors}
              handleEdit={handleEdit}
            />
          </Table>
        </TableContainer>
        {!editMode && (
          <TablePagination
            className={classes.pagination}
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={pageCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            disabled={isLoading}
          />
        )}
      </Paper>
    </div>
  );
}

export default MUITable;
