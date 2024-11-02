import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../../components/Alert'

function UserEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState([])
  const [errors, setErrors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
        if (response.status == 200) {
          setUser(response.data.data)
          setForm({
            name: response.data.data.name,
            email: response.data.data.email,
            password: '',
            password_confirmation: '',
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      }

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${id}`, payload)
      if (response.status == 200) {
        Alert('success', response.data.meta.status, response.data.meta.message)
        navigate('/user')
      }
    } catch (error) {
      if (error.response.status == 422) {
        setErrors(error.response.data.errors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Edit User</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CFormInput
                  type="text"
                  id="name"
                  label="Name"
                  placeholder="Name"
                  className="mb-2"
                  onChange={handleChange}
                  value={form.name}
                  text={errors?.name ? errors.name[0] : ''}
                />
                <CFormInput
                  type="text"
                  id="email"
                  label="Email"
                  placeholder="Email"
                  className="mb-2"
                  onChange={handleChange}
                  value={form.email}
                  text={errors?.email ? errors.email[0] : ''}
                />
                <CFormInput
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="Password"
                  className="mb-2"
                  onChange={handleChange}
                  value={form.password}
                  text={errors?.password ? errors.password[0] : ''}
                />
                <CFormInput
                  type="password"
                  id="password_confirmation"
                  label="Password Confirmation"
                  placeholder="Password Confirmation"
                  className="mb-3"
                  onChange={handleChange}
                  value={form.password_confirmation}
                  text={errors?.password_confirmation ? errors.password_confirmation[0] : ''}
                />
                <div className="d-flex justify-content-end">
                  <CButton type="submit" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Process...' : 'Update'}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserEdit