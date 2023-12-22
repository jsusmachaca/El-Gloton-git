import {  NavBar } from './components/nav/NavBar';
import { Home } from './components/home/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { apiClient } from './api/apiClient'
import { Registe } from './components/auth/Register';
import { Dashboard } from './components/dashboard/Dasboard';
import { useState,   useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000; 
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('accessToken');
    }
  }



  const [dataFood, setDataFood] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);
  const [dataSoup, setDataSoup] = useState([]);

  useEffect(() => {
      apiClient.get('/home/foods/').then(response => {
        setDataFood(response.data)
      } )
      apiClient.get('/home/drinks/').then(response => {
        setDataDrink(response.data)
      } )
      apiClient.get('/home/soups/').then(response => {
        setDataSoup(response.data)
      } )

  }, []);

  
  const ProtectedRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
  
    if (isAuthenticated) {
      return element;
    } else {
      return <Navigate to="/auth/login" />;
    }
  };

  return (
    <>
      <NavBar />

      <Routes>    
        <Route path='/' element={<Navigate to='/home/foods' />} />
        <Route path='/home/foods' element={<Home localData={dataFood} />} />
        <Route path='/home/drinks' element={<Home localData={dataDrink}/>} />
        <Route path='/home/soups' element={<Home localData={dataSoup}/>} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Registe />} />
        <Route path='/user/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </>
  );
}

export default App;