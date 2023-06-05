import { useCallback, useEffect, useRef } from 'react'
import style from './style.module.css'

// add new modals here
type Modals = 'inventory-modal' | 'options-modal'

interface Props extends React.HTMLAttributes<HTMLDialogElement> {
  id: Modals
  children: JSX.Element
}

export default function Modal({ children, className, ...rest }: Props) {
  return (
    <dialog {...rest} className={`${className} ${style.dialog}`}>
      {children}
    </dialog>
  )
}

export function useModal(id: Modals) {
  const selectedModal = useRef<HTMLDialogElement | null>(null)
  const showModal = useCallback(() => selectedModal?.current?.showModal(), [])
  const closeModal = useCallback(() => selectedModal?.current?.close(), [])

  useEffect(() => {
    const modal = document.getElementById(id) as HTMLDialogElement
    if (!modal) return
    selectedModal.current = modal
  }, [id])

  useEffect(() => {
    if (!selectedModal?.current) return
    const event = (event: MouseEvent) => {
      const node = event.target as HTMLDialogElement
      let rect = node.getBoundingClientRect()
      if (
        rect.left > event.clientX ||
        rect.right < event.clientX ||
        rect.top > event.clientY ||
        rect.bottom < event.clientY
      ) {
        selectedModal?.current?.close()
      }
    }
    selectedModal.current.addEventListener('click', event)
    return () => selectedModal.current?.removeEventListener('click', event)
  }, [])

  return { showModal, closeModal }
}
