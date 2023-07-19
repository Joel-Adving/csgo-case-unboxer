'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useInventory } from '@/redux/slices/inventorySlice'
import { getPrice } from '@/utils/balanceHelper'
import Button from '@/components/Button'
import { raritySorter } from '@/utils/sortAndfilters'

export default function Inventory() {
  const [sortBy, setSortBy] = useState('sortby')
  const { inventory, clearInventory, setInventory } = useInventory()

  const items = useMemo(() => {
    switch (sortBy) {
      case 'price':
        return inventory.items.slice().sort((a, b) => getPrice(a) - getPrice(b))
      case 'rarity':
        return raritySorter(inventory.items)
      case 'latest':
        return inventory.items
      default:
        return inventory.items
    }
  }, [inventory.items, sortBy])

  const balance = useMemo(() => {
    return inventory.items.reduce((acc, item) => {
      return acc + getPrice(item)
    }, 0)
  }, [inventory.items])

  useEffect(() => {
    if (inventory.items.length === 0) {
      const localStorageInventory = localStorage.getItem('inventory')
      if (localStorageInventory) {
        setInventory(JSON.parse(localStorageInventory))
      }
    }
  }, [setInventory, inventory.items])

  return (
    <div className="relative max-w-5xl p-3 px-4 pt-0 overflow-hidden rounded h-[87vh] sm:p-6 sm:pt-0 bg-slate-800">
      <div className="flex-col gap-2 pt-5 pb-4">
        <div className="flex flex-row flex-wrap gap-3">
          <div className="flex justify-between w-full gap-4">
            <p className="text-xl text-green-400">
              <span className="text-3xl">{balance.toFixed(2)}</span> €
            </p>
            <p className="text-xl">
              <span className="text-3xl">{inventory.items.length}</span> items
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-2 py-1 text-gray-300 border bg-slate-800 border-gray-400 rounded w-fit hover:border-gray-100 hover:text-gray-100`}
          >
            <option value="sortby">Sort by</option>
            <option value="price">Price</option>
            <option value="rarity">Rarity</option>
            <option value="latest">Latest</option>
          </select>

          {inventory.items.length > 0 ? (
            <Button className="text-red-500 border border-red-500" onClick={() => clearInventory()}>
              Reset inventory
            </Button>
          ) : null}
        </div>
      </div>

      <div className="h-full gap-3 pt-1 pb-32 overflow-y-auto sm:h-auto responsive-grid">
        {items
          ?.slice()
          ?.reverse()
          ?.map((skin, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="relative">
                <Image
                  width={250}
                  height={250}
                  src={skin?.image ?? '/images/placeholder.webp'}
                  alt=""
                  style={{ borderColor: `#${skin?.rarity_color}` }}
                  className={`border-l-4 bg-slate-700 p-3 rounded-sm`}
                />
                <p className="absolute text-green-400 bottom-0.5 right-1 text-xs font-semibold">
                  {getPrice(skin).toFixed(2)} €
                </p>
              </div>
              <p className="text-xs text-center">{skin.name}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
