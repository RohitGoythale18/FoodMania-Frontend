import RecipeHeading from '../../admin/adminHeader/RecipeHeading';
import Search from '../../admin/search/Search';
//Card CSS - Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useState, useEffect } from 'react';
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

const Recipes = ({ heading, recipeType }) => {
    const [recipes, setRecipes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [filteredRecipe, setFilteredRecipe] = useState([]);

    const handleModalOpen = (recipe) => {
        setSelectedRecipe(recipe);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedRecipe(null);
    };

    const fetchRecipes = async () => {
        try {
            const response = await axios.get(`https://foodmania-backend-be6e.onrender.com/foodmania/recipe/get-${recipeType}-list`);
            const result = response.data;
            setRecipes(result.data || []);
            setFilteredRecipe(result.data || []);
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

    return (
        <>
            <div className="pt-20">
                <div className='flex flex-col items-center space-y-5'>
                    <RecipeHeading heading={heading} />
                    <Search onSearch={handleSearch} />
                </div>
                <div className="grid grid-cols-1 gap-5 justify-items-center p-5 md:grid md:grid-cols-4 md:p-5">
                    {Array.isArray(filteredRecipe) && filteredRecipe.map((recipe) => (
                        <div key={recipe._id}>
                            <Button
                                onClick={() => handleModalOpen(recipe)}
                                sx={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <CardHeader
                                    title={recipe.recipeName}
                                    subheader={new Date(recipe.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                />
                                <CardMedia
                                    component="img"
                                    sx={{ height: 200, width: 345 }}
                                    image={recipe.recipeImage}
                                    alt={recipe.recipeName}
                                />
                                <CardActions disableSpacing className="flex justify-between w-full" sx={{ p: 0 }}>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </CardActions>
                            </Button>
                            <Modal
                                open={modalOpen && selectedRecipe?._id === recipe._id}
                                onClose={handleModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} className="flex flex-col space-y-4 md:w-[70%]">
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        <h2 className="text-3xl font-semibold text-center">{recipe.recipeName}</h2>
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <img src={recipe.recipeImage} alt={recipe.recipeName} className="mx-auto h-64 w-64 md:h-52 md:w-[350px]" />
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <h3 className="text-lg font-semibold">Ingredients:</h3>
                                        <p>{recipe.recipeIngredients}</p>
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <h3 className="text-lg font-semibold">Steps:</h3>
                                        <p>{recipe.recipeSteps}</p>
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Recipes;