import ResponsiveHeader from "../responsiveHeader/ResponsiveHeader";
import RecipeHeading from "../adminHeader/RecipeHeading";
import UpdateRecipe from "../modals/UpdateRecipe";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
// Modal CSS - Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Search from "../search/Search";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    margin: '0 auto',
    my: 10,
    overflowY: 'auto',
    height: 500,
};

const ManageRecipes = ({ heading, recipeType }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [filteredRecipe, setFilteredRecipe] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleModalOpen = (recipe) => {
        setSelectedRecipe(recipe);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedRecipe(null);
    };

    const handleUpdateModalOpen = (recipe) => {
        setSelectedRecipe(recipe);
        setUpdateModalOpen(true);
    };

    const handleUpdateModalClose = () => {
        setUpdateModalOpen(false);
        setSelectedRecipe(null);
    };

    const fetchRecipes = async () => {
        try {
            const response = await axios.get(`https://foodmania-backend-be6e.onrender.com/foodmania/recipe/get-${recipeType}-list`);
            setRecipes(response.data.data || []);
            setFilteredRecipe(response.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [recipeType]);

    const handleSearch = (query) => {
        if (query.trim() === "") {
            setFilteredRecipe(recipes);
        } else {
            const filtered = recipes.filter((recipe) =>
                recipe.recipeName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredRecipe(filtered);
        }
    };

    const deleteRecipe = async (recipe) => {
        try {
            console.log(`Deleting ${recipeType} with id: ${recipe._id}`);
            await axios.delete(`https://foodmania-backend-be6e.onrender.com/foodmania/recipe/delete-${recipeType}/${recipe._id}`);
            fetchRecipes();
            setSnackbarMessage('Recipe deleted successfully!');
            handleClickSnackbar();
        } catch (err) {
            console.error(err);
            setSnackbarMessage('Failed to delete the recipe!');
            handleClickSnackbar();
        }
    };

    const handleDelete = (recipe) => {
        const confirmed = window.confirm(`Are you sure you want to delete this ${recipeType}?`);
        if (confirmed) {
            deleteRecipe(recipe);
        }
    };

    const handleClickSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <ResponsiveHeader />
            <div className="pt-14 md:p-0">
                <div className="flex flex-col justify-center px-4 md:flex md:flex-row md:justify-between md:items-center">
                    <RecipeHeading heading={heading} />
                    <Search onSearch={handleSearch} />
                </div>
                <div className="grid grid-cols-1 justify-items-center md:grid md:grid-cols-3 md:gap-y-4 sm:grid sm:grid-cols-1">
                    {Array.isArray(filteredRecipe) && filteredRecipe.map((recipe) => (
                        <div key={recipe._id}>
                            <Button onClick={() => handleModalOpen(recipe)}
                                sx={{ fontSize: 20, color: '#16cc95f3', margin: 2, borderRadius: 2, padding: 1, minWidth: 300 }}
                                className="flex flex-col">
                                <div className="flex justify-between items-center w-full">
                                    {recipe.recipeName}
                                    <div>
                                        <EditIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdateModalOpen(recipe);
                                            }}
                                            className="mx-2 rounded-full hover:bg-gray-300"
                                        />
                                        <DeleteIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(recipe);
                                            }}
                                            className="mx-2 rounded-full hover:bg-gray-300"
                                        />
                                    </div>
                                </div>
                                <div className="w-full text-start text-sm mb-2">
                                    {recipe.createdAt ? format(new Date(recipe.createdAt), 'dd MMMM, yyyy') : 'Date not available'}
                                </div>
                                <img src={recipe.recipeImage} alt={recipe.recipeName}
                                    className="h-48 w-full md:h-40" />
                            </Button>

                            <Modal
                                open={modalOpen && selectedRecipe?._id === recipe._id}
                                onClose={handleModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}
                                    className='md:w-[70%] flex flex-col space-y-4'>
                                    <h2 className="text-3xl font-semibold text-center">{recipe.recipeName}</h2>
                                    <div className="">
                                        <img src={recipe.recipeImage} alt={recipe.recipeName} className="mx-auto h-64 w-64 md:h-[200] md:w-[200]" />
                                    </div>
                                    <div className="">
                                        <h3 className="text-lg font-semibold">Ingredients:</h3>
                                        <p>{recipe.recipeIngredients}</p>
                                    </div>
                                    <div className="">
                                        <h3 className="text-lg font-semibold">Steps:</h3>
                                        <p>{recipe.recipeSteps}</p>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    ))}
                </div>
            </div>

            <UpdateRecipe
                open={updateModalOpen}
                onClose={handleUpdateModalClose}
                recipe={selectedRecipe}
                fetchRecipes={fetchRecipes}
                recipeType={recipeType}
            />

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

export default ManageRecipes;