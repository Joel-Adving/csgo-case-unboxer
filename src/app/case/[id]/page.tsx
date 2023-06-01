'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FUN_RARITY_PERCENTAGES, REAL_RARITY_PERCENTAGES } from '@/utils/constants'
import { useGetCasesQuery, useGetSkinsQuery, useGetSouvenirsQuery } from '@/redux/services/csgoApi'
import { useInventory } from '@/redux/slices/inventorySlice'
import { useGetDbSkinsQuery } from '@/redux/services/api'
import { Skin, SkinItem } from '@/types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Rarity, rarityDiceRoll } from '@/utils/calculations'
import { filterSkinForSlider } from '@/utils/filtering'

export default function CaseIdPage({ params }: { params: { id: string } }) {
  const [wonSkin, setWonSkin] = useState<SkinItem | null>()
  const [sliderSkins, setSliderSkins] = useState<SkinItem[] | null>(null)
  const [animating, setAnimating] = useState(false)
  const [fastMode, setFastMode] = useState(false)
  const [showKnifesAndGloves, setShowKnifesAndGloves] = useState(false)
  const [realRarity, setRealRarity] = useState(true)

  const sliderElement = useRef<HTMLDivElement>(null)

  const { data: allSkins } = useGetSkinsQuery(null)
  const { data: cases } = useGetCasesQuery(null)
  const { data: souvenirs } = useGetSouvenirsQuery(null)
  const { data: dbSkins } = useGetDbSkinsQuery(null)

  const { addInventoryItem } = useInventory()

  useEffect(() => {
    fetch('/api/skins')
      .then((res) => res.json())
      .then(console.log)
  }, [])

  const selectedCase = useMemo(() => {
    return cases?.find((c) => c.id === params.id) ?? souvenirs?.find((c) => c.id === params.id)
  }, [cases, params.id, souvenirs])

  const skins = useMemo(() => {
    if (!selectedCase || !allSkins || !dbSkins) return []
    const contains = [...selectedCase.contains, ...selectedCase.contains_rare]
    const skins = Array.from(
      new Set(contains.map((skin) => allSkins.find((s) => s.name === skin.name)).filter((s) => s !== undefined))
    ) as Skin[]
    const mergedData = skins.map((skin) => {
      const _skin = dbSkins.find((s) => s.name.includes(skin.name))
      return {
        ..._skin,
        name: skin.name,
        image: skin?.image
      }
    })
    return mergedData as SkinItem[]
  }, [allSkins, selectedCase, dbSkins])

  const filteredSkins = useMemo(
    () =>
      showKnifesAndGloves
        ? skins
        : skins?.filter((s) => {
            if (s.weapon_type === 'Knife' || s.type === 'Gloves') {
              return false
            }
            return true
          }),
    [showKnifesAndGloves, skins]
  )

  const getRandomSkin = (percentages: Rarity): SkinItem => {
    const rarity = rarityDiceRoll(percentages)
    const _filteredSkins = skins.filter((s) => {
      if (rarity.some((r) => r === s.type || r === s.weapon_type)) {
        return true
      } else if (rarity.some((r) => r === s.rarity && s.type !== 'Gloves' && s.weapon_type !== 'Knife')) {
        return true
      }
    })
    const skin = _filteredSkins[Math.floor(Math.random() * _filteredSkins.length)]
    if (!skin?.name || !skin?.image) {
      return getRandomSkin(REAL_RARITY_PERCENTAGES)
    }
    return skin
  }

  const handleOpenCase = () => {
    const _wonSkin = getRandomSkin(realRarity ? REAL_RARITY_PERCENTAGES : FUN_RARITY_PERCENTAGES)
    const _sliderSkins = Array.from({ length: 74 }, () => getRandomSkin(REAL_RARITY_PERCENTAGES)).filter((skin) => {
      return filterSkinForSlider(skin, _wonSkin)
    })
    while (_sliderSkins.length < 74) {
      const skin = getRandomSkin(REAL_RARITY_PERCENTAGES)
      if (filterSkinForSlider(skin, _wonSkin)) {
        _sliderSkins.push(skin)
      }
    }
    _sliderSkins[61] = _wonSkin
    setSliderSkins(_sliderSkins as SkinItem[])
    setWonSkin(_wonSkin)
    setAnimating(true)
  }

  useEffect(() => {
    if (!animating || !sliderElement.current) return

    sliderElement.current?.animate([{ transform: ' translateX(0%)' }, { transform: 'translateX(-80%)' }], {
      duration: fastMode ? 600 : 4500,
      iterations: 1,
      easing: 'cubic-bezier( 0.29, 0.8, 0.55, 0.99 )'
    })

    const timeout = setTimeout(
      () => {
        if (!wonSkin) return
        addInventoryItem(wonSkin)
        setAnimating(false)
        toast(
          <div className={`flex items-center p-1 gap-6 border-b-4`} style={{ borderColor: `#${wonSkin?.rarity_color}` }}>
            <Image
              priority
              width={200}
              height={200}
              src={wonSkin?.image ?? '/images/placeholder.webp'}
              alt=""
              className={`w-[5rem] mb-2`}
            />
            <p className="text-xs text-center text-zinc-300">{wonSkin.name}</p>
          </div>,
          {
            style: {
              backgroundColor: '#3F3F46',
              width: '100%'
            }
          }
        )
      },
      fastMode ? 600 : 4500
    )
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating, wonSkin, fastMode])

  return selectedCase ? (
    <section className="w-full max-w-6xl mx-auto">
      <div className="hidden sm:block">
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{
            maxWidth: '17rem',
            width: '100%'
          }}
        />
      </div>

      <div className="flex flex-col">
        <p className="mb-1 text-2xl text-center">{selectedCase.name}</p>
        <Image width={300} height={300} priority src={selectedCase.image} className="max-w-[8rem] w-full  mx-auto" alt="" />
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

      {sliderSkins && (
        <div className="grid h-[40dvh] mb-[30dvh] place-content-center overflow-hidden">
          <div className="relative h-[159px] w-[62.5rem] overflow-hidden">
            <div className="absolute top-0 z-10 left-[50%] w-0.5 h-full bg-yellow-400"></div>
            <div ref={sliderElement} className="absolute left-0 top-0 flex gap-3 translate-x-[-80%]">
              {sliderSkins?.map((skin, i) => (
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
        {!selectedCase.name.includes('Souvenir') && (
          <button
            className="mx-auto mt-3 mb-1 rounded btn bg-zinc-700"
            onClick={() => {
              setShowKnifesAndGloves((prev) => !prev)
            }}
          >
            {showKnifesAndGloves ? 'Hide' : 'Show'} knifes and gloves
          </button>
        )}
        <div id="skins" className="p-3 mt-3 rounded gap-x-3 gap-y-4 bg-zinc-800 responsive-grid">
          {filteredSkins?.map((skin, i: number) => (
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
