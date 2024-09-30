import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeLayout from './components/homeLayout/HomeLayout';
import Home from './components/home/Home';
import Recipes from './components/recipes/Recipes';
import About from './components/about/About';
import Contact from './components/contact/Contact';

import AdminLayout from './admin/adminLayout/AdminLayout';
import Login from './admin/login/Login';
import Dashboard from './admin/dashboard/Dashboard';
import ManageRecipes from './admin/manageRecipes/ManageRecipes';
import Feedback from './admin/feedback/Feedback';

function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth') === 'true';
    setAuthenticated(isAuthenticated);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path='sweets' element={<Recipes heading="Sweets" recipeType="sweet" />} />
          <Route path='spices' element={<Recipes heading="Spices" recipeType="spice" />} />
          <Route path='soups' element={<Recipes heading="Soups" recipeType="soup" />} />
          <Route path='non-veg' element={<Recipes heading="Non Veg" recipeType="nonveg" />} />
          <Route path='about' element={<About />} />
          <Route path='contact-us' element={<Contact />} />
        </Route>

        <Route path='/admin' element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path='/dashboard' element={authenticated ? <AdminLayout /> : <Navigate to='/admin' />}>
          <Route index element={<Dashboard />} />
          <Route path='manage-sweets' element={authenticated ? <ManageRecipes heading="Manage Sweets" recipeType="sweet" /> : <Navigate to='/admin' />} />
          <Route path='manage-spices' element={authenticated ? <ManageRecipes heading="Manage Spices" recipeType="spice" /> : <Navigate to='/admin' />} />
          <Route path='manage-soups' element={authenticated ? <ManageRecipes heading="Manage Soups" recipeType="soup" /> : <Navigate to='/admin' />} />
          <Route path='manage-non-veg' element={authenticated ? <ManageRecipes heading="Manage Non-Veg" recipeType="nonveg" /> : <Navigate to='/admin' />} />
          <Route path='feedback' element={authenticated ? <Feedback heading="Feedback" /> : <Navigate to='/admin' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
