import React from 'react';
import { Route, Routes } from 'react-router';
import Overview from './Overview';
import Login from './Login';
import Course from './Course';

const MainRoutes = () => {
  return (
    <Routes>
    <Route path ="/" element={<Overview/>} />
    <Route path ="/login" element={<Login/>} />
    <Route path ="/dashboard" element={<Course/>} />
</Routes>
  )
}

export default MainRoutes