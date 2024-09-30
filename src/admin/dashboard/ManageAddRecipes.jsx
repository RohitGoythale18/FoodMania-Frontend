import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddRecipe from '../modals/AddRecipe';

const ManageAddRecipes = () => {
    const [addRecipeModal, setAddRecipeModal] = useState(false);
    const [recipeType, setRecipeType] = useState('');

    const handleOpenModal = (type) => {
        setRecipeType(type);
        setAddRecipeModal(true);
    };

    return (
        <>
            <ThemeProvider
                theme={{
                    palette: {
                        primary: {
                            main: '#007FFF',
                            dark: '#0066CC',
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        borderRadius: 2,
                        bgcolor: '#E2E8F0',
                        paddingBottom: 2,
                    }}
                    className="my-2"
                >
                    <h2 className="text-center text-2xl font-semibold py-2">Manage Recipes</h2>
                    <div className="grid grid-cols-2 gap-3 justify-items-center text-white text-lg font-semibold p-4">
                        <button
                            className="flex items-center justify-evenly rounded-md bg-[#16cc95f3] w-32 p-3"
                            onClick={() => handleOpenModal('sweet')}
                        >
                            <AddCircleIcon />
                            Sweets
                        </button>
                        <button
                            className="flex items-center justify-evenly rounded-md bg-[#16cc95f3] w-32 p-3"
                            onClick={() => handleOpenModal('spice')}
                        >
                            <AddCircleIcon />
                            Spices
                        </button>
                        <button
                            className="flex items-center justify-evenly rounded-md bg-[#16cc95f3] w-32 p-3"
                            onClick={() => handleOpenModal('soup')}
                        >
                            <AddCircleIcon />
                            Soups
                        </button>
                        <button
                            className="flex items-center justify-evenly rounded-md bg-[#16cc95f3] w-32 p-3"
                            onClick={() => handleOpenModal('nonveg')}
                        >
                            <AddCircleIcon />
                            Non Veg
                        </button>
                    </div>
                </Box>
            </ThemeProvider>

            {/* AddRecipe Modal */}
            <AddRecipe 
                open={addRecipeModal} 
                onClose={() => setAddRecipeModal(false)} 
                recipeType={recipeType} 
            />
        </>
    );
}

export default ManageAddRecipes;