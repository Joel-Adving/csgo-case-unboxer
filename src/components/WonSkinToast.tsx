import { Skin } from '@/types'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'

export default function WonSkinToast({ skin }: { skin: Skin }) {
  return (
    <div className={`flex items-center p-1 gap-6 border-b-4`} style={{ borderColor: `#${skin?.rarity_color}` }}>
      <Image
        priority
        width={200}
        height={200}
        src={skin?.image ?? '/images/placeholder.webp'}
        alt=""
        className={`w-[5rem] mb-2`}
      />
      <p className="text-xs text-center text-zinc-300">{skin.name}</p>
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
