'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Checkbox, Grid, TextField, FormGroup, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';





const AddNewUser = ({ open, setOpen,fetchUserApi }) => {
    const router = useRouter();
    const [btn, setBtn] = useState(true);
    // const id = JSON.parse(localStorage.getItem('UID'));
    const [addUserDtails, setAddUserDtails] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        
    });
    const handleClose = () => {
        setOpen(false);
        setAddUserDtails('')
    };


    const UserInputDetails = (e) => {
        const { name, value } = e.target;
        if(name == 'mobile' && value.length > 10){

        }else{
            setAddUserDtails({ ...addUserDtails, [name]: value })

        }

    };

    // console.log(addUserDtails)
    


    const submitNewUserHandler = async () => {
        if(addUserDtails.fullName && addUserDtails.email && (addUserDtails.mobile.length > 9 && addUserDtails.mobile.length < 11)   && addUserDtails.password  ){
            try {
                const res = await axios.post('/api/user', addUserDtails);
                // console.log(res);
                if (res.data.message == "User Registered Successfully") {
                    setOpen(false)
                   alert(res.data.message);
                   fetchUserApi();
                   setAddUserDtails('')
                }
    
            } catch (err) {
                console.log(err);
                alert(err.message);
    
            }
        }
       

    }
useEffect(()=>{
   if( addUserDtails.fullName && addUserDtails.email && (addUserDtails.mobile.length > 9 && addUserDtails.mobile.length < 11)   && addUserDtails.password.length > 7  ){
    setBtn(false)
   }else{
    setBtn(true)
   }

},[addUserDtails])


    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Grid container sx={{ height: 'fit-content', width: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={12} sx={{ borderRadius: '10px', bgcolor: 'white' }}>
                        <Grid container>
                            <Grid item xs={12} sx={{ p: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'black' }}>
                                <Typography sx={{ fontSize: '20px', fontWeight: '800', color: 'white' }} onClick={()=>{toToAddNewUserModal}}>Add New User</Typography>
                            </Grid>


                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>Full Name :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='Full Name..' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={UserInputDetails} name='fullName' value={addUserDtails.fullName} />

                                </Grid>
                            </Grid>

                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>Email :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='Address...' type='email' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={UserInputDetails} name='email' value={addUserDtails.email} />

                                </Grid>
                            </Grid>

                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>Mobile :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='LandMark...' type='number' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={UserInputDetails} name='mobile' value={addUserDtails.mobile} />

                                </Grid>
                            </Grid>

                            <Grid container sx={{ mt: '2px', p: '10px' }}>
                                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: { lg: 'right', md: 'right', sm: 'light', xs: 'light' }, alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mr: '5px' }}>Password :</Typography>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} >
                                    <TextField placeholder='LandMark...' type='number' fullWidth size='small' sx={{ fontSize: '15px' }} onChange={UserInputDetails} name='password' value={addUserDtails.password} />

                                </Grid>
                            </Grid>

                            

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '10px', pb: '10px' }}>
                                <Button variant='contained' disabled={btn} sx={{ fontSize: '15px' }} onClick={submitNewUserHandler}>Add User</Button>

                            </Grid>


                        </Grid>

                    </Grid>
                </Grid>

            </Modal>
        </>
    );
}
export default AddNewUser