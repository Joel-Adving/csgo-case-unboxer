import React from 'react'
import { ToastContainer as Container, ToastContainerProps } from 'react-toastify'

export default function ToastContainer({ ...props }) {
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
      limit={3}
      pauseOnHover
      theme="dark"
      style={{
        maxWidth: '17rem',
        width: '100%'
      }}
      {...props}
    />
  )
}
