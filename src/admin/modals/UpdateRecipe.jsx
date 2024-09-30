import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    margin: '0 auto',
    my: 10,
    overflowY: 'scroll',
    height: 500,
};

const UpdateRecipe = ({ open, onClose, recipe, fetchRecipes, recipeType }) => {
    const [recipeName, setRecipeName] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (recipe) {
            setRecipeName(recipe.recipeName || '');
            setRecipeImage(recipe.recipeImage || '');
            setRecipeIngredients(recipe.recipeIngredients || '');
            setRecipeSteps(recipe.recipeSteps || '');
        }
    }, [recipe]);

    useEffect(() => {
        if (newImage) {
            const objectUrl = URL.createObjectURL(newImage);
            setImagePreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setImagePreview(recipeImage);
        }
    }, [newImage, recipeImage]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        } else {
            setNewImage(null);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!recipe) return;

        const formData = new FormData();
        formData.append('recipeName', recipeName);
        formData.append('recipeIngredients', recipeIngredients);
        formData.append('recipeSteps', recipeSteps);

        if (newImage) {
            formData.append('recipeImage', newImage);  
        }

        try {
            await axios.put(`http://localhost:3000/foodmania/recipe/update-${recipeType}/${recipe._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(`${recipeType.charAt(0).toUpperCase() + recipeType.slice(1)} updated successfully!`);
            fetchRecipes();  
            onClose(); 
        } catch (error) {
            console.error('Failed to update recipe:', error);
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style} className='md:w-[70%] flex flex-col space-y-4'>
                    <h2 className="text-3xl font-semibold text-center">Update {recipeType}</h2>

                    <form onSubmit={handleSave} className='grid grid-cols-1 gap-5 py-5'>
                        <TextField
                            required
                            label="Recipe Name"
                            variant="outlined"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-full"
                        />

                        <label className="block text-lg font-medium">Recipe Image</label>
                        <CardMedia
                            component="img"
                            sx={{ height: 200, width: 345 }}
                            image={imagePreview}
                            alt={recipeName}
                        />

                        <label htmlFor="recipeImage" className="block text-lg font-medium">Upload New Image</label>
                        <TextField
                            onChange={handleImageChange}
                            id="recipeImage"
                            variant="outlined"
                            type='file'
                            inputProps={{ multiple: false }}
                            className="border border-gray-300 p-2 rounded-md w-full"
                        />

                        <TextField
                            required
                            value={recipeIngredients}
                            onChange={(e) => setRecipeIngredients(e.target.value)}
                            label="Ingredients"
                            variant="outlined"
                            className="border border-gray-300 p-2 rounded-md w-full"
                        />

                        <TextField
                            required
                            value={recipeSteps}
                            onChange={(e) => setRecipeSteps(e.target.value)}
                            label="Steps"
                            variant="outlined"
                            multiline
                            rows={8}
                            className="border border-gray-300 p-2 rounded-md w-full"
                        />

                        <Stack spacing={2} direction="row" className='flex justify-evenly md:justify-center'>
                            <Button type='submit' variant="contained" className='w-28' sx={{ backgroundColor: '#16cc95f3' }}>
                                Update
                            </Button>
                            <Button onClick={onClose} variant="contained" className='w-28' sx={{ backgroundColor: '#16cc95f3' }}>
                                Cancel
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default UpdateRecipe;