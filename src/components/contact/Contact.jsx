import axios from "axios";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Contact = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        const feedback = { userName, userEmail, userPhone, userMessage }

        try {
            const res = await axios.post('http://localhost:3000/foodmania/contact/send-message', feedback, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Message sent successfully...!', res.data);
            setSnackbarMessage('Message sent successfully!');
            handleClick();
        } catch (error) {
            console.log('Error to send message...!', error);
            setSnackbarMessage('Failed to send message!');
            handleClick();
        }
    };

    const handleClick = () => {
        setOpenSnackbar(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <div className="relative flex flex-col items-center py-20 md:grid grid-cols-2 gap-2 md:px-10 md:pt-40 justify-items-center">
                <div className="my-5">
                    <img src="/images/OIG.png" alt="Contact" className="px-10 md:px-32" />
                </div>
                <div className="rounded-lg bg-slate-200 flex flex-col items-center w-[90%] py-5 px-3 my-5
                    md:w-[100%]">
                    <h2 className="text-2xl font-semibold text-center mb-5">Connect with us</h2>
                    <form
                        onSubmit={sendMessage}
                        method='post'
                        className="grid grid-cols-1 gap-4 w-full"
                    >
                        <TextField
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                        />
                        <TextField
                            required
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                        />

                        <TextField
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            required
                            type="tel"
                            id="outlined-basic"
                            label="Mobile number"
                            variant="outlined"
                        />
                        <TextField
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            required
                            id="outlined-basic"
                            label="Message"
                            variant="outlined"
                            multiline
                            rows={8}
                        />

                        <Button
                            type='submit'
                            variant="contained"
                            className='w-28'
                            sx={{ backgroundColor: '#16cc95f3', margin: '0 auto' }}>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarMessage}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </>
    );
}

export default Contact;