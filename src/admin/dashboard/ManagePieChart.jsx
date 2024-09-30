import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ManagePieChart = () => {
    const [totalSweets, setTotalSweets] = useState(0);
    const [totalSpices, setTotalSpices] = useState(0);
    const [totalSoups, setTotalSoups] = useState(0);
    const [totalNonvegs, setTotalNonvegs] = useState(0);

    const fetchRecipes = async () => {
        try {
            const sweetResponse = await axios.get('https://foodmania-backend-be6e.onrender.com/foodmania/recipe/sweet-count');
            const spiceResponse = await axios.get('https://foodmania-backend-be6e.onrender.com/foodmania/recipe/spice-count');
            const soupResponse = await axios.get('https://foodmania-backend-be6e.onrender.com/foodmania/recipe/soup-count');
            const nonvegResponse = await axios.get('https://foodmania-backend-be6e.onrender.com/foodmania/recipe/nonveg-count');
            
            setTotalSweets(sweetResponse.data.data);
            setTotalSpices(spiceResponse.data.data);
            setTotalSoups(soupResponse.data.data);
            setTotalNonvegs(nonvegResponse.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                background: '#E2E8F0',
                borderRadius: 2,
                paddingBottom: 2,
            }} className="md:h-[60vh] my-2">
                <h2 className="text-center text-2xl font-semibold py-2">Statistics</h2>
                <PieChart
                    height={250}
                    series={[
                        {
                            data: [
                                { label: 'Sweets', value: totalSweets },
                                { label: 'Spices', value: totalSpices },
                                { label: 'Soups', value: totalSoups },
                                { label: 'Non Veg', value: totalNonvegs },
                            ],
                            innerRadius: 50,
                            arcLabel: (params) => params.label ?? '',
                            arcLabelMinAngle: 20,
                        },
                    ]}
                />
            </Box>
        </>
    )
}

export default ManagePieChart;