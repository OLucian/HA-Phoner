import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  label: {
    color: '#ffffff60',
    '&.Mui-focused': {
      color: '#ffffff90',
    },
  },
  input: {
    color: '#ffffff',
  },
}));

// .MuiFilledInput-underline:after

const helperText = {
  type: '* 3 to 128 alpha numeric characters',
  serial: '* 3 to 128 alpha numeric characters',
  color: '* 3 to 128 alpha characters',
};

export default function EnhancedTableCell(props) {
  const {
    id,
    index,
    cell,
    align,
    text,
    edit,
    label,
    handleEdit,
    addCell,
    className,
    error = {
      type: false,
      serial: false,
      color: false,
    },
  } = props;

  const classes = useStyles();
  const [value, setValue] = useState(text);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (!addCell) {
      handleEdit(id, cell, event.target.value, index);
    }
  };

  if (!edit)
    return (
      <TableCell align={align} className={className}>
        {text}
      </TableCell>
    );

  return (
    <TableCell align={align} className={className}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
            className: classes.label,
          }}
          InputProps={{
            shrink: true,
            className: classes.input,
          }}
          id={`${id}-${cell}`}
          label={label}
          variant="filled"
          value={value}
          color="primary"
          onChange={handleChange}
          style={{ width: '100%' }}
          helperText={helperText[cell]}
          error={error && error[cell]}
        />
      </form>
    </TableCell>
  );
}
