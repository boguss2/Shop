import React from 'react'
import Signup from '../components/Signup'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const SignupPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
  
    useEffect(() => {
      if(isAuthenticated === true){
        navigate("/");
      }
    }, [isAuthenticated, navigate])

    return (
        <div>
            <Signup />
        </div>
    )
}

export default SignupPage