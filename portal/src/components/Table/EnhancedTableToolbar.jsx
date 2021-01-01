import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const AddNewPhone = styled.div`
  display: flex;
  width: 100%;
`;

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    background: '#ffffffee',
    borderRadius: '8px 8px 0 0',
  },
  highlight: {
    color: theme.palette.secondary.secondary,
  },
  title: {
    color: '#222222',
  },
}));

export default function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const {
    numSelected,
    deleteSelected,
    editSelected,
    clearSelection,
    editMode,
    cancelEdit,
    saveEdit,
    openAddNewPhone,
  } = props;

  const Selected = (
    <div style={{ display: 'flex', alignItems: 'center', paddingRight: '9px' }}>
      <Typography
        className={classes.title}
        color="inherit"
        variant="subtitle1"
        component="div"
        style={{ paddingRight: '15px' }}
      >
        {numSelected} selected
      </Typography>
      <Button variant="contained" disableElevation onClick={clearSelection} size="small">
        Clear Selection
      </Button>
    </div>
  );

  const Options = (
    <div style={{ flex: '1' }}>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        onClick={deleteSelected}
        endIcon={<DeleteIcon />}
      >
        Delete Phones
      </Button>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        onClick={editSelected}
        style={{ marginLeft: '15px' }}
        endIcon={<EditIcon />}
      >
        Edit Phones
      </Button>
    </div>
  );

  const Save = (
    <div
      style={{
        display: 'flex',
        flex: '1 1 100%',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
        style={{ color: '#000' }}
      >
        EDIT PHONES
      </Typography>
      <div>
        <Button
          variant="contained"
          style={{ marginRight: '15px' }}
          disableElevation
          onClick={cancelEdit}
        >
          Cancel
        </Button>
        <Button variant="contained" color="secondary" disableElevation onClick={saveEdit}>
          Save
        </Button>
      </div>
    </div>
  );

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0 && !editMode,
      })}
    >
      {numSelected > 0 && !editMode ? (
        Options
      ) : editMode ? (
        Save
      ) : (
        <AddNewPhone>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
            style={{ paddingRight: '15px', borderRight: '1px solid #DDD' }}
          >
            PHONE LIST
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={openAddNewPhone}
            style={{ marginLeft: '15px' }}
          >
            Add new phone
          </Button>
        </AddNewPhone>
      )}

      {numSelected > 0 && !editMode && Selected}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
