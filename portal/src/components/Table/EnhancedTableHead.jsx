import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tableRow: {
    background: '#ffffff20',
    '& .hover': {
      background: '#ffffff20',
    }
  },
  tableCell: {
    color: '#ffffff',
    border: 'none',
    paddingTop: '15px',
    paddingBottom: '15px',
    '& .hover': {
      background: '#ffffff20',
    }
  },
  checkBox: {
    color: '#ffffff',
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
    '&:focus, &:active': {
      color: 'red',
    },
  },
}));

const headCells = [
  { id: 'id', center: true, disablePadding: true, label: 'ID' },
  { id: 'type', center: true, disablePadding: true, label: 'Phone Type' },
  { id: 'serial', center: false, disablePadding: true, label: 'Phone Serial' },
  { id: 'color', center: true, disablePadding: true, label: 'Phone Color' },
  { id: 'metadata', center: true, disablePadding: true, label: 'Metadata' },
  { id: 'updatedat', center: false, disablePadding: true, label: 'Last Update' },
  { id: 'createdat', center: false, disablePadding: true, label: 'Created At' },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    editMode,
  } = props;

  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const checked = rowCount > 0 && numSelected === rowCount;
  const partialCheck = numSelected > 0 && numSelected < rowCount;

  const handleSelectAll = () => {
    if (editMode) return;
    onSelectAllClick(partialCheck || !checked);
  };

  return (
    <TableHead>
      <TableRow className={classes.tableRow}>
        <TableCell padding="checkbox" className={classes.tableCell}>
          <Checkbox
            className={classes.checkBox}
            indeterminate={partialCheck}
            checked={checked}
            onClick={handleSelectAll}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.tableCell}
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
