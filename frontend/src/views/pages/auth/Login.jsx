import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [errorLogin, setErrorLogin] = useState(null)
  const [errors, setErrors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        email: form.email,
        password: form.password,
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, payload)
      if (response.status == 200) {
        localStorage.setItem('access_token', response.data.data.access_token)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response.status == 422) {
        setErrors(error.response.data.errors)
      }
      if (error.response.data.meta.code == 401) {
        setErrorLogin(error.response.data.meta.message)
      }
      // if(error.response.meta);
    } finally {
      setIsSubmitting(false)
      // setErrors([])
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      navigate('/') // Redirect ke dashboard jika sudah login
    }
  }, [navigate])
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {errorLogin && <CAlert color="danger">{errorLogin}</CAlert>}
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="email"
                        placeholder="Email"
                        autoComplete="Email"
                        onChange={handleChange}
                        value={form.email}
                        className="d-inline"
                      />
                    </CInputGroup>
                    <p className="text-danger small mt-1">{errors.email}</p>
                    <CInputGroup className="">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="password"
                        onChange={handleChange}
                        value={form.password}
                      />
                    </CInputGroup>
                    {errors.password && (
                      <p className="text-danger small mt-1">{errors.password[0]}</p>
                    )}
                    <CRow>
                      <CCol xs={12} className="d-flex justify-content-end">
                        <CButton type="submit" color="primary" className="px-4 mt-2">
                          {isSubmitting ? 'Proses' : 'Login'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
