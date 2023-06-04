import { Skin } from '@/types'
import { getPrice } from '@/utils/balanceHelper'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'

export default function WonSkinToast({ skin }: { skin: Skin }) {
  return (
    <div className={`flex items-center gap-4 p-1 border-b-4`} style={{ borderColor: `#${skin?.rarity_color}` }}>
      <Image
        priority
        width={200}
        height={200}
        src={skin?.image ?? '/images/placeholder.webp'}
        alt=""
        className={`w-[5rem] mb-2`}
      />
      <div className="flex flex-col">
        <p className="text-xs text-slate-300 ">{skin.name}</p>
        <p className="text-lg text-green-400 whitespace-nowrap">{getPrice(skin)} €</p>
      </div>
    </div>
  )
}

export const wonSkinToast = (skin: Skin) =>
  toast(<WonSkinToast skin={skin} />, {
    style: {
      backgroundColor: '#3F3F46',
      width: '100%'
    }
  })
