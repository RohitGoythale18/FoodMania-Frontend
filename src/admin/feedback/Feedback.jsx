import ResponsiveHeader from "../responsiveHeader/ResponsiveHeader";
import RecipeHeading from "../adminHeader/RecipeHeading";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

// List CSS - Material UI
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const Feedback = ({heading}) => {
    const [expandedItems, setExpandedItems] = useState([]);
    const [message, setMessage] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const handleExpandList = (index) => {
        setExpandedItems((prevState) =>
            prevState.map((item, i) => (i === index ? !item : item))
        );
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/foodmania/contact/get-message-list');
            const result = response.data;
            console.log(result);
            setMessage(result.data);
            setExpandedItems(new Array(result.data.length).fill(false));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    const deleteMessage = async (messageId) => {
        try {
            console.log(`Deleting message with id: ${messageId}`);
            await axios.delete(`http://localhost:3000/foodmania/contact/delete-message/${messageId}`);
            fetchMessages();
            setSnackbarMessage('Message deleted successfully!');
            handleClick();
        } catch (err) {
            console.error(err);
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

    const handleDelete = (messageId) => {
        const confirmed = window.confirm("Are you sure you want to delete this message?");
        if (confirmed) {
            deleteMessage(messageId);
        }
    };

    return (
        <>
            <div className="h-[100vh] overflow-y-auto">
                <ResponsiveHeader />
                <div className="pt-14 md:p-0">
                    <RecipeHeading heading={heading} />
                    <div className="grid grid-cols-1 justify-items-center space-y-2">
                        {message.map((message, index) => (
                            <List
                                key={index}
                                sx={{ width: '90%', bgcolor: '#e2e8f0', p: 0 }}
                                component="nav"
                            >
                                <ListItemButton onClick={() => handleExpandList(index)}>
                                    <ListItemIcon>
                                        <AccountCircleIcon style={{ fontSize: 27 }} />
                                    </ListItemIcon>
                                    <ListItemText primary={message.userName || "Anonymous"} />
                                    {message.createdAt ? format(new Date(message.createdAt), 'dd MMMM, yyyy HH:mm') : 'Date not available'}
                                    {expandedItems[index] ? <ExpandLess  sx={{ ml: 2 }} /> : <ExpandMore  sx={{ ml: 2 }} />}
                                    <DeleteIcon onClick={() => handleDelete(message._id)} sx={{ ml: 2 }} />
                                </ListItemButton>
                                <Collapse in={expandedItems[index]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 4, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                            <div className="flex">
                                                <ListItemIcon sx={{ p: 1 }}>
                                                    <CallIcon style={{ fontSize: 23 }} />
                                                </ListItemIcon>
                                                <ListItemText primary={message.userPhone} />
                                            </div>
                                            <div className="flex">
                                                <ListItemIcon sx={{ p: 1 }}>
                                                    <EmailIcon style={{ fontSize: 23 }} />
                                                </ListItemIcon>
                                                <ListItemText primary={message.userEmail} />
                                            </div>
                                            <div className="flex">
                                                <ListItemIcon sx={{ p: 1 }}>
                                                    <ChatIcon style={{ fontSize: 23 }} />
                                                </ListItemIcon>
                                                <ListItemText primary={message.userMessage} sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }} />
                                            </div>
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </List>
                        ))}
                    </div>
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

export default Feedback;