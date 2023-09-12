import React from 'react';
import { Route, Routes } from 'react-router';
import Overview from './Overview';
import Login from './Login';
import Course from './Course';
import PrivateRoute from '../components/PrivateRoute';

const MainRoutes = () => {
  return (
    <Routes>
    <Route path ="/" element={<PrivateRoute><Overview/></PrivateRoute>} />
    <Route path ="/login" element={<Login/>} />
    <Route path ="/dashboard" element={<PrivateRoute><Course/></PrivateRoute>} />
</Routes>
  )
}

export default MainRoutes