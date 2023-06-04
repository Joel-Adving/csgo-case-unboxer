'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FUN_RARITY_PERCENTAGES, REAL_RARITY_PERCENTAGES } from '@/utils/constants'
import { getRandomSkin, getRaffleSkins } from '@/utils/raffleHelpers'
import { useGetCrateSkinsQuery } from '@/redux/services/api'
import { useInventory } from '@/redux/slices/inventorySlice'
import { wonSkinToast } from '@/components/WonSkinToast'
import ToastContainer from '@/components/ToastContainer'
import { Skin } from '@/types'
import 'react-toastify/dist/ReactToastify.css'
import { filterDisplayedSkins, raritySorter } from '@/utils/sortAndfilters'

const FAST_MODE = 500
const NORMAL_MODE = 4500

export default function CaseIdPage({ params }: { params: { id: string } }) {
  const [wonSkin, setWonSkin] = useState<Skin | null>()
  const [fastMode, setFastMode] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [realRarity, setRealRarity] = useState(true)
  const [raffleSkins, setRaffleSkins] = useState<Skin[] | null>(null)
  const [showKnifesAndGloves, setShowKnifesAndGloves] = useState(false)

  const raffleElement = useRef<HTMLDivElement>(null)
  const { data: crate } = useGetCrateSkinsQuery(params.id)
  const { addInventoryItem } = useInventory()

  const skins = useMemo(() => raritySorter(crate?.skins ?? []), [crate?.skins])
  const displayedSkins = useMemo(() => filterDisplayedSkins(showKnifesAndGloves, skins), [skins, showKnifesAndGloves])

  const handleOpenCase = () => {
    const _wonSkin = getRandomSkin(realRarity ? REAL_RARITY_PERCENTAGES : FUN_RARITY_PERCENTAGES, skins)
    const _raffleSkins = getRaffleSkins(_wonSkin, skins)
    _raffleSkins[61] = _wonSkin
    setRaffleSkins(_raffleSkins)
    setWonSkin(_wonSkin)
    setAnimating(true)
  }

  useEffect(() => {
    if (!animating || !raffleElement.current) return

    raffleElement.current?.animate([{ transform: ' translateX(0%)' }, { transform: 'translateX(-80%)' }], {
      duration: fastMode ? FAST_MODE : NORMAL_MODE,
      iterations: 1,
      easing: 'cubic-bezier( 0.29, 0.8, 0.55, 0.99 )'
    })

    const timeout = setTimeout(
      () => {
        if (!wonSkin) return
        addInventoryItem(wonSkin)
        setAnimating(false)
        wonSkinToast(wonSkin)
      },
      fastMode ? FAST_MODE : NORMAL_MODE
    )

    return () => clearTimeout(timeout)
  }, [animating, wonSkin, fastMode, addInventoryItem])

  return crate && skins.length > 0 ? (
    <section className="w-full max-w-6xl mx-auto">
      <div className="hidden sm:block">
        <ToastContainer />
      </div>

      <div className="flex flex-col">
        <p className="mb-1 text-2xl text-center">{crate.name}</p>
        <Image width={300} height={300} priority src={crate.image} className="max-w-[8rem] w-full  mx-auto" alt="" />
        <div className="flex gap-3 mx-auto mt-2 mb-1 w-fit">
          <button disabled={animating} className="bg-green-400 btn text-zinc-950" onClick={handleOpenCase}>
            Open case
          </button>
          <button disabled={animating} className="btn bg-zinc-600" onClick={() => setFastMode((prev) => !prev)}>
            {fastMode ? '5x Speed' : '1x Speed'}
          </button>
          <button disabled={animating} className="btn bg-zinc-600" onClick={() => setRealRarity((prev) => !prev)}>
            {realRarity ? 'Normal' : 'High'} %
          </button>
        </div>
      </div>

      {raffleSkins && (
        <div className="grid h-[40dvh] mb-[30dvh] place-content-center overflow-hidden">
          <div className="relative h-[159px] w-[62.5rem] overflow-hidden">
            <div className="absolute top-0 z-10 left-[50%] w-0.5 h-full bg-yellow-400"></div>
            <div ref={raffleElement} className="absolute left-0 top-0 flex gap-3 translate-x-[-80%]">
              {raffleSkins?.map((skin, i) => (
                <Image
                  key={i}
                  priority
                  width={300}
                  height={300}
                  src={skin?.image ?? '/images/placeholder.webp'}
                  style={{ borderColor: `#${skin?.rarity_color}` }}
                  className={`border-b-8 bg-zinc-700 p-4 min-w-[12rem] rounded-sm`}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {!crate?.name?.includes('Souvenir') && (
          <button
            className="mx-auto mt-3 mb-1 rounded btn bg-zinc-700"
            onClick={() => setShowKnifesAndGloves((prev) => !prev)}
          >
            {showKnifesAndGloves ? 'Hide' : 'Show'} knifes and gloves
          </button>
        )}
        <div id="skins" className="p-3 mt-3 rounded gap-x-3 gap-y-4 bg-zinc-800 responsive-grid">
          {displayedSkins?.map((skin, i: number) => (
            <div key={i}>
              <Image
                priority
                width={300}
                height={300}
                src={skin?.image ?? '/images/placeholder.webp'}
                alt=""
                style={{ borderColor: `#${skin?.rarity_color}` }}
                className={`border-l-4 bg-zinc-700 p-4 rounded-sm`}
              />
              <p className={`mt-2 text-xs text-center`}>{skin.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null
}
