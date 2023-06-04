'use client'

import Image from 'next/image'
import { useEffect, useMemo } from 'react'
import { useInventory } from '@/redux/slices/inventorySlice'
import Modal from './Modal'
import { useModal } from '@/redux/slices/modalSlice'
import Button from './Button'
import { getPrice } from '@/utils/balanceHelper'

export default function Inventory() {
  const { inventory, clearInventory, setInventory } = useInventory()
  const { openModal, closeModal } = useModal()

  const balance = useMemo(() => {
    return inventory.items.reduce((acc, item) => {
      return acc + getPrice(item)
    }, 0)
  }, [inventory.items])

  useEffect(() => {
    const localInventory = JSON.parse(localStorage.getItem('inventory') ?? '[]')
    if (localInventory) {
      setInventory(localInventory)
    }
  }, [setInventory])

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory.items))
  }, [inventory.items])

  return (
    <>
      <Button className={`btn border-slate-500 border`} onClick={() => openModal('inventory')}>
        Inventory
      </Button>

      <Modal targetModal="inventory" scroll={false} allowClickOutside={true} allowClose={true}>
        <div className="relative w-full h-screen sm:h-auto max-w-5xl p-3 sm:p-6 overflow-y-auto rounded sm:min-h-[50vh] bg-slate-800">
          <div className="flex-col w-full gap-2 pb-4 mx-auto sm:pb-6 whitespace-nowrap ">
            <div className="flex items-center w-full gap-3">
              <div className="flex gap-4 mr-auto">
                <p className="text-xl">
                  <span className="text-3xl">{inventory.items.length}</span> items
                </p>
                <p className="text-xl text-green-400">
                  <span className="text-3xl">{balance.toFixed(2)}</span> €
                </p>
              </div>

              {inventory.items.length > 0 ? (
                <Button className="text-red-500 border border-red-500 btn" onClick={() => clearInventory()}>
                  Clean inventory
                </Button>
              ) : null}

              <Button className="border btn border-slate-500" onClick={() => closeModal('inventory')}>
                Close
              </Button>
            </div>
          </div>

          <div className="gap-3 overflow-auto responsive-grid">
            {inventory.items
              ?.slice()
              ?.reverse()
              ?.map((skin, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Image
                    width={250}
                    height={250}
                    src={skin?.image ?? '/images/placeholder.webp'}
                    alt=""
                    style={{ borderColor: `#${skin?.rarity_color}` }}
                    className={`border-l-4 bg-slate-700 p-3 rounded-sm`}
                  />
                  <p className="text-xs text-center">{skin.name}</p>
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </>
  )
}

// const grades = useMemo(() => {
//     const grades = {
//       Consumer: 0,
//       'Mil-Spec Grade': 0,
//       'Industrial Grade': 0,
//       Restricted: 0,
//       Classified: 0,
//       Extraordinary: 0,
//       Covert: 0
//     } as Record<string, number>
//     inventory.items.forEach((item) => {
//       grades[item.rarity]++
//     })
//     return grades
//   }, [inventory.items])

// <div className="flex gap-3">
//   <p className={`  border-b-4`} style={{ borderColor: `#${wonskin?.rarity_color}` }}>
//     {grades.Consumer}
//   </p>
//   <p className={`  border-b-4`} style={{ borderColor: `#${wonskin?.rarity_color}` }}>
//     {grades['Mil-Spec Grade'] + grades['Industrial Grade']}
//   </p>
//   <p className={`  border-b-4`} style={{ borderColor: `#${wonskin?.rarity_color}` }}>
//     {grades.Restricted}
//   </p>
//   <p className={`0  border-b-4`} style={{ borderColor: `#${wonskin?.rarity_color}` }}>
//     {grades.Classified}
//   </p>
//   <p className={`  border-b-4`} style={{ borderColor: `#${wonskin?.rarity_color}` }}>
//     {grades.Extraordinary + grades.Covert}
//   </p>
// </div>
