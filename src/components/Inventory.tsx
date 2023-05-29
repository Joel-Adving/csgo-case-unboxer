'use client'

import Image from 'next/image'
import { useEffect, useMemo } from 'react'
import { useInventory } from '@/redux/slices/inventorySlice'
import { GRADE_COLORS } from '@/utils/constants'

export default function Inventory() {
  const { inventory, clearInventory, toggleInventory, setInventory, setShowInventory } = useInventory()
  const { show } = inventory

  useEffect(() => {
    const localInventory = JSON.parse(localStorage.getItem('inventory') ?? '[]')
    if (localInventory) {
      setShowInventory(false)
      setInventory(localInventory)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const grades = useMemo(() => {
    const grades = {
      Consumer: 0,
      'Mil-Spec Grade': 0,
      'Industrial Grade': 0,
      Restricted: 0,
      Classified: 0,
      Extraordinary: 0,
      Covert: 0
    }
    inventory.items.forEach((item) => {
      grades[item.rarity]++
    })
    return grades
  }, [inventory.items])

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory.items))
  }, [inventory.items])

  return (
    <>
      <button
        className={`${
          inventory.show ? 'z-[99999]' : 'z-0'
        } fixed bottom-5 left-[50%] translate-x-[-50%] px-4 py-1 mx-auto mt-2 mb-1 bg-green-400 rounded w-fit text-gray-950`}
        onClick={() => toggleInventory()}
      >
        {inventory.show ? 'Hide' : 'Show'} inventory
      </button>

      {show && (
        <div
          className={`fixed grid place-content-center z-[99998] inset-0 ${
            inventory.show ? 'grid' : 'hidden'
          } backdrop-blur-sm`}
        >
          <div className="relative bg-neutral-950 rounded sm:p-8 p-3 sm:max-h-[70vh] max-h-screen overflow-hidden overflow-y-auto">
            <div className="flex-col w-full gap-2 p-2 mx-auto whitespace-nowrap ">
              {show && (
                <div className="flex items-center w-full bg-neutral-950">
                  <div className="">
                    <p className="mr-auto text-2xl">
                      <span className="text-4xl">{inventory.items.length}</span> items
                    </p>
                    <div className="flex gap-4">
                      <p className={`border-${GRADE_COLORS.Consumer}-500  border-b-4`}>{grades.Consumer}</p>
                      <p className={`border-${GRADE_COLORS['Mil-Spec Grade']}-500  border-b-4`}>
                        {grades['Mil-Spec Grade'] + grades['Industrial Grade']}
                      </p>
                      <p className={`border-${GRADE_COLORS.Restricted}-500  border-b-4`}>{grades.Restricted}</p>
                      <p className={`border-${GRADE_COLORS.Classified}-500  border-b-4`}>{grades.Classified}</p>
                      <p className={`border-${GRADE_COLORS.Extraordinary}-500  border-b-4`}>
                        {grades.Extraordinary + grades.Covert}
                      </p>
                    </div>
                  </div>

                  {inventory.items.length > 0 ? (
                    <button
                      className="px-3 py-0.5 mt-2 ml-auto border bg-neutral-900 rounded"
                      onClick={() => clearInventory()}
                    >
                      clear inventory
                    </button>
                  ) : null}
                </div>
              )}
            </div>

            <div className="grid w-full max-w-5xl gap-5 p-2 overflow-auto responsiveGrid ">
              {inventory.items
                ?.slice()
                ?.reverse()
                ?.map((skin, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Image
                      priority
                      width={300}
                      height={300}
                      src={skin?.image ?? '/images/placeholder.webp'}
                      alt=""
                      className={`border-${GRADE_COLORS[skin.rarity]}-500  border-l-8  bg-zinc-700 p-4 rounded-sm`}
                    />
                    <p className="text-xs text-center">{skin.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
