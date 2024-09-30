import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axios from 'axios';

const AddRecipe = ({ open, onClose, recipeType }) => {
    const modalStyle = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        padding: 4,
        margin: '0 auto',
        my: 5,
        height: 'auto',
    };

    const [recipeName, setRecipeName] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [recipeImage, setRecipeImage] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleClickSnackbar = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const addRecipe = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('recipeName', recipeName);
        formData.append('recipeIngredients', recipeIngredients);
        formData.append('recipeSteps', recipeSteps);
        formData.append('recipeImage', recipeImage);

        try {
            const res = await axios.post(`https://foodmania-backend-be6e.onrender.com/foodmania/recipe/add-${recipeType}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(`${recipeType.charAt(0).toUpperCase() + recipeType.slice(1)} added successfully...!`, res.data);
            handleClickSnackbar(`${recipeType.charAt(0).toUpperCase() + recipeType.slice(1)} added successfully!`);
            onClose(); 
        } catch (error) {
            console.error(`Error adding ${recipeType}...!`, error);
            handleClickSnackbar(`Error adding ${recipeType}. Please try again!`);
        }
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle} className='md:w-[70%] flex flex-col'>
                    <h2 className='text-center text-2xl font-semibold'>Add a new {recipeType}</h2>
                    <form
                        onSubmit={addRecipe}
                        method='post'
                        encType='multipart/form-data'
                        className='grid grid-cols-1 gap-5 py-5'
                    >
                        <TextField
                            required
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            id="outlined-basic"
                            label="Recipe name"
                            variant="outlined"
                        />
                        <TextField
                            required
                            value={recipeIngredients}
                            onChange={(e) => setRecipeIngredients(e.target.value)}
                            id="outlined-basic"
                            label="Ingredients"
                            variant="outlined"
                        />
                        <TextField
                            onChange={(e) => setRecipeImage(e.target.files[0])}
                            id="outlined-basic"
                            label="Recipe image"
                            variant="outlined"
                            type='file'
                            inputProps={{ multiple: false }}
                        />
                        <TextField
                            value={recipeSteps}
                            onChange={(e) => setRecipeSteps(e.target.value)}
                            required
                            id="outlined-basic"
                            label="Steps"
                            variant="outlined"
                            multiline
                            rows={8}
                        />

                        <Stack spacing={2} direction="row" className='flex justify-evenly md:justify-center'>
                            <Button
                                type='submit'
                                variant="contained"
                                className='w-28'
                                sx={{ backgroundColor: '#16cc95f3' }}>
                                Save
                            </Button>
                            <Button
                                onClick={onClose}
                                variant="contained"
                                className='w-28'
                                sx={{ backgroundColor: '#16cc95f3' }}>
                                Cancel
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCloseSnackbar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </>
    );
}

export default AddRecipe;