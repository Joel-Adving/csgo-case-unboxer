import React from 'react'
import { ToastContainer as Container } from 'react-toastify'

export default function ToastContainer() {
  return (
    <Container
      position="top-right"
      autoClose={2500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{
        maxWidth: '17rem',
        width: '100%'
      }}
    />
  )
}
