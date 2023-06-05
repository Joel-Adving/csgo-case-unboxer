'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FUN_RARITY_PERCENTAGES, RARITY, REAL_RARITY_PERCENTAGES } from '@/utils/constants'
import { getRandomSkin, getRaffleSkins } from '@/utils/raffleHelpers'
import { useGetCrateSkinsQuery } from '@/redux/services/api'
import { useInventory } from '@/redux/slices/inventorySlice'
import { wonSkinToast } from '@/components/WonSkinToast'
import ToastContainer from '@/components/ToastContainer'
import { Skin } from '@/types'
import 'react-toastify/dist/ReactToastify.css'
import { filterDisplayedSkins, raritySorter } from '@/utils/sortAndfilters'
import { useAudio } from '@/hooks/useAudio'
import Button from '@/components/Button'

const FAST_MODE = 1000
const NORMAL_MODE = 6000

export default function CaseIdPage({ params }: { params: { id: string } }) {
  const [wonSkin, setWonSkin] = useState<Skin | null>()
  const [fastMode, setFastMode] = useState(false)
  const [autoSpin, setAutoSpin] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [realRarity, setRealRarity] = useState(true)
  const [raffleSkins, setRaffleSkins] = useState<Skin[] | null>(null)
  const [showKnifesAndGloves, setShowKnifesAndGloves] = useState(false)

  const { data: crate } = useGetCrateSkinsQuery(params.id)
  const { addInventoryItem } = useInventory()

  const rarity = useMemo(() => {
    switch (true) {
      case RARITY.rare.includes(wonSkin?.rarity ?? ''):
        return 'rare'
      case RARITY.mythical.includes(wonSkin?.rarity ?? ''):
        return 'mythical'
      case RARITY.legendary.includes(wonSkin?.rarity ?? ''):
        return 'legendary'
      case RARITY.ancient.includes(wonSkin?.rarity ?? ''):
        return 'ancient'
    }
  }, [wonSkin?.rarity])

  const playUnlock = useAudio('/sound/case_unlock_01.wav', { volume: 0.1 })
  const playReveal = useAudio(`/sound/case_reveal_${rarity}_01.wav`, { volume: 0.035 })
  const playItemScroll = useAudio('/sound/csgo_ui_crate_item_scroll.wav', { volume: 0.07 })
  const playUnlockImmediate = useAudio('/sound/case_unlock_immediate_01.wav', { volume: 0.05 })

  const raffleElement = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement | null>(null)

  const skins = useMemo(() => raritySorter(crate?.skins ?? []), [crate?.skins])
  const displayedSkins = useMemo(() => filterDisplayedSkins(showKnifesAndGloves, skins), [skins, showKnifesAndGloves])

  const handleOpenCase = useCallback(() => {
    fastMode ? playUnlockImmediate() : playUnlock()
    const _wonSkin = getRandomSkin(realRarity ? REAL_RARITY_PERCENTAGES : FUN_RARITY_PERCENTAGES, skins)
    const _raffleSkins = getRaffleSkins(_wonSkin, skins)
    _raffleSkins[61] = _wonSkin
    setRaffleSkins(_raffleSkins)
    setWonSkin(_wonSkin)
    setAnimating(true)
  }, [fastMode, playUnlock, playUnlockImmediate, realRarity, skins])

  const ButtonGroup = useCallback(
    () => (
      <div className="flex gap-3 mx-auto mt-2 mb-1 w-fit">
        <Button disabled={animating} onClick={() => setFastMode((prev) => !prev)}>
          {fastMode ? '5x Speed' : '1x Speed'}
        </Button>
        <Button onClick={() => setRealRarity((prev) => !prev)}>{realRarity ? 'Normal' : 'High'} chance</Button>
        <Button onClick={() => setAutoSpin((prev) => !prev)}>{autoSpin ? 'Auto spin' : 'Manual'}</Button>
        <Button
          disabled={animating}
          className="text-green-400 border-green-400 hover:bg-green-400 hover:text-gray-950 hover:border-gray-950"
          onClick={handleOpenCase}
        >
          Open case
        </Button>
      </div>
    ),
    [animating, autoSpin, fastMode, handleOpenCase, realRarity]
  )

  useEffect(() => {
    if (!autoSpin) return
    const interval = setInterval(() => {
      if (animating) return
      handleOpenCase()
    }, 100)
    return () => clearInterval(interval)
  }, [autoSpin, handleOpenCase, animating])

  useEffect(() => {
    if (!animating || !raffleElement.current) return

    raffleElement.current?.animate([{ transform: ' translateX(0%)' }, { transform: 'translateX(-80%)' }], {
      duration: fastMode ? FAST_MODE : NORMAL_MODE,
      iterations: 1,
      easing: 'ease-out'
    })

    const playSound = async (amount: number) => {
      let delay = 100
      for (let i = 0; i < amount; i++) {
        playItemScroll()
        delay += 4 * (1 - Math.pow(1 - i / amount, 3))
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }

    playSound(fastMode ? 10 : 39)

    const timeout = setTimeout(
      () => {
        if (!wonSkin) return
        addInventoryItem(wonSkin)
        setAnimating(false)
        wonSkinToast(wonSkin)
        playReveal()
      },
      fastMode ? FAST_MODE : NORMAL_MODE
    )

    return () => {
      clearTimeout(timeout)
    }
  }, [animating, wonSkin, fastMode, addInventoryItem, playItemScroll, raffleSkins?.length, playReveal])

  return crate && skins.length > 0 ? (
    <div className="w-full max-w-6xl mx-auto">
      <div className="hidden sm:block">
        <ToastContainer />
      </div>

      <div className="flex flex-col">
        <p className="mb-1 text-2xl text-center sm:text-3xl">{crate.name}</p>
        <Image width={300} height={300} priority src={crate.image} className="max-w-[8rem] w-full my-2 mx-auto" alt="" />

        <div className="hidden sm:block">
          <ButtonGroup />
        </div>
      </div>

      {raffleSkins && (
        <div className="grid h-[40dvh] mb-[30dvh] sm:mb-[40dvh] place-content-center overflow-hidden">
          <div className="relative h-[159px] w-[62.5rem] overflow-hidden">
            <div ref={pinRef} className="absolute top-0 z-10 left-[50%] w-0.5 h-full bg-yellow-400"></div>
            <div ref={raffleElement} className="absolute left-0 top-0 flex gap-3 translate-x-[-80%]">
              {raffleSkins?.map((skin, i) => (
                <Image
                  key={i}
                  priority
                  width={300}
                  height={300}
                  src={skin?.image ?? '/images/placeholder.webp'}
                  style={{
                    borderColor: `#${skin?.rarity_color}`,
                    boxShadow: `inset  0px -0px 1px black`,
                    background: `linear-gradient(#5D5B63, 90%, #${skin?.rarity_color}B3)`
                  }}
                  className={`border-b-8 bg-opacity-20 p-2 min-w-[12.4rem] rounded-sm`}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 block sm:hidden bg-slate-950">
        <ButtonGroup />
      </div>

      <div className="flex flex-col">
        {!crate?.name?.includes('Souvenir') && (
          <Button className="mx-auto mt-2" onClick={() => setShowKnifesAndGloves((prev) => !prev)}>
            {showKnifesAndGloves ? 'Hide' : 'Show'} knifes and gloves
          </Button>
        )}

        <div id="skins" className="p-4 my-5 rounded gap-x-3 gap-y-2 bg-slate-800 responsive-grid">
          {displayedSkins?.map((skin, i: number) => (
            <div key={i}>
              <Image
                priority
                width={300}
                height={300}
                src={skin?.image ?? '/images/placeholder.webp'}
                alt=""
                style={{ borderColor: `#${skin?.rarity_color}` }}
                className={`border-l-4 bg-slate-700 p-4 rounded-sm`}
              />
              <p className={`mt-2 text-xs text-center`}>{skin.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null
}
