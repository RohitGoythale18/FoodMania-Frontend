import { useState } from "react";
import { useForm } from 'react-hook-form';
import { MdAdminPanelSettings } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const handleLogin = (data) => {
        const { username, password } = data;
        if (username === 'Foodmania' && password === 'Foodmania@123') {
            alert('Login successful!');
            setAuthenticated(true);
            localStorage.setItem('auth', 'true');
            navigate('/dashboard');
        } else {
            setLoginError('Login failed. Please check your credentials.');
        }
    };

    const onSubmit = (data) => {
        handleLogin(data);
    };

    return (
        <div className="flex flex-col items-center py-12 md:grid grid-cols-2 gap-2 md:px-20 md:pt-24 justify-items-center">
            <div className="flex flex-col">
                <img src="/images/OIG.png" alt="Foodmania Lo" className="px-20" />
            </div>
            <div className="rounded-lg bg-slate-200 flex flex-col items-center w-[90%] py-5 px-3 my-5">
                <form className="grid grid-cols-1 gap-4 justify-items-center w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <MdAdminPanelSettings className="size-14 fill-[#16cc95f3]" />
                    <h2 className="text-3xl text-center font-semibold">Admin Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-black rounded-md p-3 bg-transparent w-[80%]"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-black rounded-md p-3 bg-transparent w-[80%]"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    {loginError && <p className="text-red-500">{loginError}</p>}
                    <button type="submit"
                        className="rounded-md bg-[#16cc95f3] text-lg font-medium px-3 py-2 w-28">
                        Login
                    </button>
                    <div className="flex flex-col items-center">
                        <NavLink to='/' className="reset-pass-link hover:text-[#16cc95f3] hover:underline">Forgot password?</NavLink>
                        <NavLink to='/' className="reset-pass-link hover:text-[#16cc95f3]">Back</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;