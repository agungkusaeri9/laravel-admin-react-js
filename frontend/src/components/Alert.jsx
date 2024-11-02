import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Alert = (type, title, text) => {
  MySwal.fire({
    icon: type,
    title: title,
    text: text,
    timer: 1000,
  })
}

export default Alert
