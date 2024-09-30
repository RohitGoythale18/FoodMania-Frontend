import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userProfile');

        navigate('/admin');
    };

    return (
        <>
            <div className="w-full absolute bottom-0">
                <Button
                    variant="contained"
                    className='w-full hover:bg-[#91f5d7f3] hover:text-[#16cc95f3] md:w-64'
                    sx={{
                        backgroundColor: '#16cc95f3',
                        borderRadius: 0,
                        padding: 2,
                        fontSize: 20,
                        fontWeight: 600
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </>
    );
};

export default Logout;
