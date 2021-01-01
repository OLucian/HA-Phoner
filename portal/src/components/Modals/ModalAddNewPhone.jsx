import React, { useState } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '../Modal';
import { validateNewPhone } from '../../utils/validateNewPhone';
import { serverURL } from '../../config';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: '15px',
    color: '#222222',
  },
  input: {
    color: '#222222',
  },
}));

const getStateObject = (value, error) => {
  return { value, error };
};

export default function ModalAddNewPhone(props) {
  const classes = useStyles();
  const { close, visible, handleNewPhoneAdded } = props;
  const initialState = {
    value: '',
    error: false,
  };
  const [type, setType] = useState(initialState);
  const [serial, setSerial] = useState(initialState);
  const [color, setColor] = useState(initialState);

  const savePhone = async () => {
    const errors = validateNewPhone(type.value.trim(), serial.value.trim(), color.value.trim());
    setType(getStateObject(type.value.trim(), errors.type));
    setSerial(getStateObject(serial.value.trim(), errors.serial));
    setColor(getStateObject(color.value.trim(), errors.color));
    if (errors.type || errors.serial || errors.color) return;

    try {
      await axios.post(`${serverURL}/phones/add`, {
        type: type.value.trim(),
        serial: serial.value.trim(),
        color: color.value.trim(),
      });
      handleNewPhoneAdded(true);
      setType(initialState);
      setSerial(initialState);
      setColor(initialState);
      close();
    } catch (error) {
      // no time to handle the reinsertion of the deleted items
      handleNewPhoneAdded(false);
      close();
    }
  };

  const handleType = (event) => {
    setType(getStateObject(event.target.value, false));
  };

  const handleSerial = (event) => {
    const value = event.target.value.trim();
    setSerial(getStateObject(value, false));
  };

  const handleColor = (event) => {
    const value = event.target.value.toLowerCase();
    setColor(getStateObject(value, false));
  };

  return (
    <Modal open={visible} handleClose={close}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
          style={{
            paddingRight: '15px',
            borderRight: '1px solid #DDD',
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          NEW PHONE
        </Typography>
        <div style={{ display: 'flex', width: '1000px', alignItems: 'center' }}>
          <TextField
            className={classes.textField}
            required
            id="id-type"
            label="Phone Type"
            InputLabelProps={{
              shrink: true,
              className: classes.input,
            }}
            FormHelperTextProps={{ className: classes.input }}
            helperText="* 3 to 128 alpha numeric characters"
            style={{ flex: 2 }}
            onChange={handleType}
            error={type.error}
            value={type.value}
          />
          <TextField
            required
            id="id-serial"
            label="Phone Serial"
            InputLabelProps={{
              shrink: true,
              className: classes.input,
            }}
            FormHelperTextProps={{ className: classes.input }}
            helperText="* 3 to 128 alpha numeric characters"
            style={{ flex: 2, marginLeft: '20px', marginRight: '20px' }}
            onChange={handleSerial}
            error={serial.error}
            value={serial.value}
          />
          <TextField
            required
            id="id-color"
            label="Phone Color"
            InputLabelProps={{
              shrink: true,
              className: classes.input,
            }}
            FormHelperTextProps={{ className: classes.input }}
            helperText="* 3 to 128 alpha characters"
            style={{ flex: 1, marginLeft: '20px', marginRight: '20px' }}
            onChange={handleColor}
            error={color.error}
            value={color.value}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={savePhone}
          startIcon={<AddIcon />}
          style={{ width: '200px', alignSelf: 'center', marginTop: '60px' }}
        >
          Add New Phone
        </Button>
      </form>
    </Modal>
  );
}
