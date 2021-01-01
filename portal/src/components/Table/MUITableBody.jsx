import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { PhonerStoreContext } from '../../contexts/PhonerStoreContext';
import MoonLoader from 'react-spinners/MoonLoader';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import EnhancedTableCell from './EnhancedTableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { serverURL } from '../../config';
import Typography from '@material-ui/core/Typography';

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy, isDate = false) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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
  title: {
    color: '#ffffffee',
  },
  tableRow: {
    background: '#ffffff10',
    '&:hover': {
      backgroundColor: '#ffffff40 !important',
    },
    '&$selected': {
      backgroundColor: '#ffffff40 !important',
    },
  },
  tableRowNoHover: {
    background: '#ffffff10',
  },
  tableCell: {
    color: '#ccc',
    border: 'none',
    maxWidth: '400px',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
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

const localeFormat = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const rowHeight = 40;

export default function MUITableBody(props) {
  const classes = useStyles();
  const {
    order,
    orderBy,
    edited,
    page,
    rowsPerPage,
    selected,
    setSelected,
    setPageCount,
    editErrors,
    handleEdit,
  } = props;

  const [state, dispatch] = useContext(PhonerStoreContext);
  const { isLoading } = state;
  const rows = state.cachedPages[page] ? state.cachedPages[page] : [];

  const hasSameRequestSize = state.cachedRequestSize === rowsPerPage;
  const hasCache = state.cachedPages[page] && state.cachedPages[page].length > 0;

  useEffect(() => {
    const getPhonerData = async () => {
      if (hasSameRequestSize && hasCache) return;
      dispatch({
        type: 'SET_LOADING',
        payload: {},
      });

      const response = await axios.get(`${serverURL}/phones/?page=${page}&size=${rowsPerPage}`);

      const pagination = await axios.get(`${serverURL}/phones/pagination`);
      const [pages] = pagination.data;
      setPageCount(Number(pages.count));

      dispatch({
        type: 'GET_PHONES',
        payload: {
          data: response.data,
          requestParams: { page, size: rowsPerPage },
          forced: false,
        },
      });
    };
    getPhonerData();
  }, [hasSameRequestSize, hasCache, dispatch, page, rowsPerPage, setPageCount]);

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - rows.length;

  const editMode = Object.keys(edited).length > 0;

  if (isLoading) {
    return (
      <TableBody>
        <TableRow className={classes.tableRowNoHover}>
          <TableCell colSpan="8">
            <LoaderWrapper style={{ height: `${rowHeight * 10}px`, width: '100%' }}>
              <MoonLoader size={30} color="#ffffff80" loading={true} />
            </LoaderWrapper>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (rows.length === 0) {
    return (
      <TableBody>
        <TableRow className={classes.tableRowNoHover}>
          <TableCell colSpan="8">
            <LoaderWrapper style={{ height: `${rowHeight * 10}px`, width: '100%' }}>
              <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                No phones found. Add new phones.
              </Typography>
            </LoaderWrapper>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;
        if (editMode && !edited[row.id]) return null;
        const data = JSON.stringify(row.metadata);
        const { Data: aes, Signature: signature } = JSON.parse(data);
        return (
          <TableRow
            className={classes.tableRow}
            hover
            onClick={editMode ? () => null : (event) => handleClick(event, row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox" className={classes.tableCell}>
              <Checkbox
                className={classes.checkBox}
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </TableCell>
            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              className={classes.tableCell}
            >
              {index + 1}
            </TableCell>
            <EnhancedTableCell
              className={classes.tableCell}
              id={row.id}
              index={index}
              label="Phone Type"
              cell="type"
              align="left"
              text={row.type}
              edit={edited[row.id]}
              handleEdit={handleEdit}
              error={editErrors[row.id]}
            />
            <EnhancedTableCell
              className={classes.tableCell}
              id={row.id}
              index={index}
              label="Phone Serial"
              cell="serial"
              align="left"
              text={row.serial}
              edit={edited[row.id]}
              handleEdit={handleEdit}
              error={editErrors[row.id]}
            />
            <EnhancedTableCell
              className={classes.tableCell}
              id={row.id}
              index={index}
              label="Phone Color"
              cell="color"
              align="left"
              text={row.color}
              edit={edited[row.id]}
              handleEdit={handleEdit}
              error={editErrors[row.id]}
            />
            <TableCell align="left" className={classes.tableCell}>
              <ul>
                {/* <li style={{ fontSize: '8px', userSelect: 'all' }}>AES: {aes}</li> */}
                <li style={{ fontSize: '8px', userSelect: 'all' }}>SIGNATURE: {signature}</li>
              </ul>
            </TableCell>
            <TableCell align="center" className={classes.tableCell}>
              {new Date(row.updated_at).toLocaleDateString('en-US', localeFormat)}
            </TableCell>
            <TableCell align="center" className={classes.tableCell}>
              {new Date(row.created_at).toLocaleDateString('en-US', localeFormat)}
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: rowHeight * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}
