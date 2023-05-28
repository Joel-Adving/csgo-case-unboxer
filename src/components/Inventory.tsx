'use client'

import { useInventory } from '@/redux/slices/inventorySlice'
import { GRADE_COLORS } from '@/utils/constants'
import Image from 'next/image'

export default function Inventory() {
  const { inventory, clearInventory, toggleInventory } = useInventory()
  const { items, show } = inventory

  return items.length > 0 ? (
    <div className={`fixed bottom-0 left-0 p-3 right-0 overflow-auto z-20 ${show && 'bg-neutral-900'}`}>
      <div className="flex flex-col w-full max-w-[10rem] gap-2 p-2 mx-auto whitespace-nowrap ">
        <button className="px-3 py-0.5 mx-auto border bg-neutral-900 rounded" onClick={() => toggleInventory()}>
          {inventory.show ? 'Hide' : 'Show'} inventory
        </button>
        {show && (
          <>
            <button className="px-3 py-0.5 mx-auto border bg-neutral-900 rounded" onClick={() => clearInventory()}>
              clear inventory
            </button>
            <p className="text-center">{inventory.items.length} Items</p>
          </>
        )}
      </div>

      <>
        {show && (
          <div className="flex gap-2 overflow-auto">
            {inventory.items
              ?.slice()
              ?.reverse()
              ?.map((skin, i) => (
                <div key={i} className="flex min-w-[8rem] max-w-[8rem] flex-col items-center gap-2">
                  <Image
                    width={300}
                    height={300}
                    src={skin?.image ?? '/images/placeholder.png'}
                    alt=""
                    className={`border-${GRADE_COLORS[skin.rarity]}-500  border-l-8  bg-zinc-700 p-4 rounded-sm`}
                  />
                  <p className="text-xs text-center">{skin.name}</p>
                </div>
              ))}
          </div>
        )}
      </>
    </div>
  ) : null
}
