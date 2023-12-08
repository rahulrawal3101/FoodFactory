'use client'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const AlertSnackbar = ({open, setOpen,}) => {

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
     
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', bgcolor:'black',color:'white'  }}>
        Add To Cart Successfully
        </Alert>
      </Snackbar>
     
    </Stack>
  );
}

export default AlertSnackbar