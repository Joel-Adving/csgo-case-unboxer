import { useCallback, useEffect, useRef } from 'react'
import style from './style.module.css'

type ModalID = 'inventory-modal' | 'options-modal'

interface Props extends React.HTMLAttributes<HTMLDialogElement> {
  id: ModalID
  children: JSX.Element
}

export default function Modal({ children, className, ...rest }: Props) {
  return (
    <dialog {...rest} className={`${className} ${style.dialog}`}>
      {children}
    </dialog>
  )
}

export function useModal(id: ModalID) {
  const modal = useRef<HTMLDialogElement | null>(null)

  const showModal = useCallback(() => modal?.current?.showModal(), [modal])
  const closeModal = useCallback(() => modal?.current?.close(), [modal])

  useEffect(() => {
    modal.current = document.getElementById(id) as HTMLDialogElement
  }, [id])

  useEffect(() => {
    if (!modal?.current) return
    const eventHandler = (e: MouseEvent) => {
      const rect = (e.target as HTMLDialogElement).getBoundingClientRect()
      if (rect.left > e.clientX || rect.right < e.clientX || rect.top > e.clientY || rect.bottom < e.clientY) {
        modal?.current?.close()
      }
    }
    modal.current.addEventListener('click', eventHandler)
    return () => modal.current?.removeEventListener('click', eventHandler)
  }, [])

  return { showModal, closeModal }
}
