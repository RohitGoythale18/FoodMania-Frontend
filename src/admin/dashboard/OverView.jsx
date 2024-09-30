import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState, useEffect } from 'react';

const OverView = () => {
    const [totalSweets, setTotalSweets] = useState(0);
    const [totalSpices, setTotalSpices] = useState(0);
    const [totalSoups, setTotalSoups] = useState(0);
    const [totalNonvegs, setTotalNonvegs] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);
    const [totalRecipes, setTotalRecipes] = useState(0);

    const fetchRecipes = async () => {
        try {
            const sweetResponse = await axios.get('https://foodmania-backend-be6e.onrender.com/foodmania/recipe/sweet-count');
            const spiceResponse = await axios.get('https://foodmania-backend-be6e.onrender.com/foodmania/recipe/spice-count');
            const soupResponse = await axios.get('https://foodmania-backend-be6e.onrender.com/foodmania/recipe/soup-count');
            const nonvegResponse = await axios.get('https://foodmania-backend-be6e.onrender.com/foodmania/recipe/nonveg-count');
            const messageResponse = await axios.get('https://foodmania-backend-be6e.onrender.com/foodmania/contact/message-count');

            setTotalSweets(sweetResponse.data.data);
            setTotalSpices(spiceResponse.data.data);
            setTotalSoups(soupResponse.data.data);
            setTotalNonvegs(nonvegResponse.data.data);
            setTotalMessages(messageResponse.data.data);
            setTotalRecipes(sweetResponse.data.data + spiceResponse.data.data + soupResponse.data.data + nonvegResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

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
                    <h2 className="text-center text-2xl font-semibold py-2">Overview</h2>
                    <div className='grid grid-cols-2 p-2'>
                        <div className='grid grid-cols-1 md:flex gap-2 justify-items-center'>
                            <div className='flex flex-col text-center justify-center bg-gray-300 w-36 rounded-md'>
                                <span className='text-lg font-medium'>Total recipes</span>
                                <span className='font-medium'>{totalRecipes}</span>
                            </div>
                            <div className='flex flex-col text-center justify-center bg-gray-300 w-36 rounded-md'>
                                <span className='text-lg font-medium'>Total Feedbacks</span>
                                <span className='font-medium'>{totalMessages}</span>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid md:grid-cols-2 justify-items-center gap-2 border'>
                            <p className='md:w-28 w-36 text-center font-medium rounded-md bg-gray-300 py-2'>Sweets: {totalSweets}</p>
                            <p className='md:w-28 w-36 text-center font-medium rounded-md bg-gray-300 py-2'>Spices: {totalSpices}</p>
                            <p className='md:w-28 w-36 text-center font-medium rounded-md bg-gray-300 py-2'>Soups: {totalSoups}</p>
                            <p className='md:w-28 w-36 text-center font-medium rounded-md bg-gray-300 py-2'>Nonveg: {totalNonvegs}</p>
                        </div>
                    </div>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default OverView;