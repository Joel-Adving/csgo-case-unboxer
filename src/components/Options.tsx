import React from 'react'
import Modal, { useModal } from './Modal'
import Button from './Button'
import { useOptions } from '@/redux/slices/optionsSlice'

type Props = {
  buttonStyle?: string
}

export default function Options({ buttonStyle }: Props) {
  const { showModal, closeModal } = useModal('options-modal')
  const { options, setAutoOpen, setFastMode, setHighChance, setAudio } = useOptions()
  const { fastMode, autoOpen, highChance, audio } = options

  return (
    <>
      <Button className={buttonStyle} onClick={showModal}>
        Options
      </Button>

      <Modal id="options-modal" className="pt-12 pb-8 rounded shadow-2xl sm:pb-10 sm:p-14 bg-slate-800 ">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex gap-3">
              <Button className={`${fastMode ? '' : 'bg-slate-500 text-slate-50'}`} onClick={() => setFastMode(false)}>
                1x Speed
              </Button>
              <Button className={`${fastMode ? 'bg-slate-500 text-slate-50' : ''}`} onClick={() => setFastMode(true)}>
                5x Speed
              </Button>
            </div>
            <div className="flex gap-3">
              <Button className={`${highChance ? '' : 'bg-slate-500 text-slate-50'}`} onClick={() => setHighChance(false)}>
                Normal percent
              </Button>
              <Button className={`${highChance ? 'bg-slate-500 text-slate-50' : ''}`} onClick={() => setHighChance(true)}>
                High percent
              </Button>
            </div>
            <div className="flex gap-3">
              <Button className={`${autoOpen ? '' : 'bg-slate-500 text-slate-50'}`} onClick={() => setAutoOpen(false)}>
                Open manually
              </Button>
              <Button className={`${autoOpen ? 'bg-slate-500 text-slate-50' : ''}`} onClick={() => setAutoOpen(true)}>
                Auto open
              </Button>
            </div>
            <div className="flex gap-3">
              <Button className={`${audio ? 'bg-slate-500 text-slate-50' : ''}`} onClick={() => setAudio(true)}>
                Audio on
              </Button>
              <Button className={`${audio ? '' : 'bg-slate-500 text-slate-50'}`} onClick={() => setAudio(false)}>
                Audio off
              </Button>
            </div>
          </div>

          <Button onClick={closeModal} className="mx-auto mt-7">
            Close
          </Button>
        </div>
      </Modal>
    </>
  )
}
