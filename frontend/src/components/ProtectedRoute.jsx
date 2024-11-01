import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken') // atau sesuaikan dengan metode penyimpanan token Anda

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
