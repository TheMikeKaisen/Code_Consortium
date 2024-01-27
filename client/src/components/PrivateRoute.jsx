import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function PrivateRoute() {
    const {currentUser} = useSelector(state => state.user)
  return (
    currentUser ? <Outlet /> : <Navigate to='/sign-in'/>
  )
}

export default PrivateRoute
