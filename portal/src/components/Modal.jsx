import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const getModalStyle = () => ({
  top: '50%',
  left: '50%',
  transform: `translate(-50%, -50%)`,
});

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    border: '2px solid #DDD',
    padding: '30px',
    outlineWidth: 0,
  },
}));

export default function BasicModal(props) {
  const classes = useStyles();

  const { open, handleClose, handleOpen } = props;
  const [modalStyle] = React.useState(getModalStyle);

  const children = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, { handleopen: handleOpen });
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {children}
        </div>
      </Modal>
    </div>
  );
}
