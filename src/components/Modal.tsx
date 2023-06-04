import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { useSpring, a } from '@react-spring/web'
import cn from 'classnames'
import { ModalName, closeModal, useModal } from '@/redux/slices/modalSlice'
import useOnClickOutside from '@/hooks/useClickOutside'
import useEventListener from '@/hooks/useEventListener'

type ModalProps = {
  targetModal: ModalName
  children: JSX.Element
  allowClickOutside?: boolean
  allowClose?: boolean
  className?: string
  classesWrapper?: string
  onClose?: () => void
  scroll?: boolean
  responsive?: boolean
}

const animationConfigs = {
  scale: {
    from: {
      scale: 0.5,
      opacity: 0,
      y: '0%'
    },
    to: {
      scale: 1,
      opacity: 1,
      y: '0%'
    }
  }
}

const Modal = ({
  targetModal,
  children,
  allowClickOutside = true,
  allowClose = true,
  className = '',
  classesWrapper = '',
  onClose,
  responsive = false
}: ModalProps) => {
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)
  const { selectModal } = useModal()
  const selectedModal = selectModal(targetModal)

  const ref = useRef(null)

  const modalSpring = useSpring({
    config: {
      friction: 10,
      velocity: 0,
      precision: 0,
      tension: 100,
      frequency: 0.35
    },
    delay: 150,
    ...(selectedModal?.visible ? animationConfigs.scale.to : animationConfigs.scale.from)
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (selectedModal?.visible) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '1rem'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [selectedModal?.visible])

  const closeEvent = async () => {
    if (onClose) {
      onClose()
    }
    dispatch(closeModal(targetModal))
  }

  useOnClickOutside(ref, () => {
    allowClose && allowClickOutside && selectedModal?.visible ? closeEvent() : null
  })

  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allowClose && allowClickOutside && selectedModal?.visible ? closeEvent() : null
    }
  })

  return mounted
    ? ReactDOM.createPortal(
        <div
          id={targetModal}
          aria-hidden="true"
          className={cn(
            classesWrapper,
            { 'items-end': responsive },
            { 'items-center': !responsive },
            { flex: selectedModal?.visible },
            { hidden: !selectedModal?.visible },
            `z-[10000] backdrop-blur bg-slate-950 bg-opacity-50  fixed inset-0 justify-center`
          )}
          role="dialog"
        >
          <a.div
            ref={ref}
            style={modalSpring}
            className={cn('relative w-full max-w-5xl z-100 overflow-auto rounded sm:max-h-[70vh]', className)}
          >
            {selectedModal?.visible && children}
          </a.div>
        </div>,
        document.body
      )
    : null
}

export default Modal
