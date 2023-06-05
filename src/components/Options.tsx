import React from 'react'
import Modal, { useModal } from './Modal'
import Button from './Button'
import { useOptions } from '@/redux/slices/optionsSlice'

export default function Options() {
  const { showModal, closeModal } = useModal('options-modal')
  const { options, setAutoOpen, setFastMode, setHighChance } = useOptions()
  const { fastMode, autoOpen, highChance } = options

  return (
    <>
      <Button onClick={showModal}>Options</Button>
      <Modal id="options-modal" className="rounded shadow-2xl bg-slate-800 max-w-2xl w-full h-[80dvh] sm:h-[50dvh]">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-3 items-center justify-center sm:mt-[13dvh] mt-[30dvh]">
            <div className="flex gap-3">
              <Button className={`${fastMode ? '' : 'bg-slate-500'}`} onClick={() => setFastMode(false)}>
                1x Speed
              </Button>
              <Button className={`${fastMode ? 'bg-slate-500' : ''}`} onClick={() => setFastMode(true)}>
                5x Speed
              </Button>
            </div>
            <div className="flex gap-3">
              <Button className={`${highChance ? '' : 'bg-slate-500'}`} onClick={() => setHighChance(false)}>
                Normal percent
              </Button>
              <Button className={`${highChance ? 'bg-slate-500' : ''}`} onClick={() => setHighChance(true)}>
                High percent
              </Button>
            </div>
            <div className="flex gap-3">
              <Button className={`${autoOpen ? '' : 'bg-slate-500'}`} onClick={() => setAutoOpen(false)}>
                Open manually
              </Button>
              <Button className={`${autoOpen ? 'bg-slate-500' : ''}`} onClick={() => setAutoOpen(true)}>
                Auto open
              </Button>
            </div>
          </div>

          <Button onClick={closeModal} className="mx-auto">
            Close
          </Button>
        </div>
      </Modal>
    </>
  )
}
