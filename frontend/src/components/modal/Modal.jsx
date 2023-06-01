import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ffffff' ,
    color:'#6439ff',
    textAlign:'center',
    border: '2px solid #a890fd',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
};


const BasicModal = ({isOpen, header, text, handler}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(()=>{
        setOpen(isOpen);
    }, [isOpen]);

    
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {header}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {text}
            </Typography>
            <Button onClick={() => handler()}>Да</Button>
          </Box>
        </Modal>
      </div>
    );
}

export const InformModal = ({isOpen, header, text}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(()=>{
      setOpen(isOpen);
  }, [isOpen]);

  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {header}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;