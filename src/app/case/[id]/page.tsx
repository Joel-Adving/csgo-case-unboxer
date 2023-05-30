'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FUN_ODDS, ODDS_GRADES, REAL_ODDS } from '@/utils/constants'
import { useGetCasesQuery, useGetSkinsQuery, useGetSouvenirsQuery } from '@/redux/services/csgoApi'
import { useInventory } from '@/redux/slices/inventorySlice'
import { useGetDbSkinsQuery } from '@/redux/services/api'
import { Skin, SkinItem } from '@/types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CaseIdPage({ params }: { params: { id: string } }) {
  const [wonSkin, setWonSkin] = useState<SkinItem | null>()
  const [sliderSkins, setSliderSkins] = useState<SkinItem[] | null>(null)
  const [animating, setAnimating] = useState(false)
  const [fastMode, setFastMode] = useState(false)
  const [showKnifesAndGloves, setShowKnifesAndGloves] = useState(false)
  const [realOdds, setRealOdds] = useState(true)

  const sliderElement = useRef<HTMLDivElement>(null)

  const { data: allSkins } = useGetSkinsQuery(null)
  const { data: cases } = useGetCasesQuery(null)
  const { data: souvenirs } = useGetSouvenirsQuery(null)
  const { data: dbSkins } = useGetDbSkinsQuery(null)

  const { addInventoryItem } = useInventory()

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
    // return sortSkinByRarity(mergedSkins)
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

  const getRandomSkin = (): SkinItem => {
    const random = Math.random()
    const ODDS = realOdds ? REAL_ODDS : FUN_ODDS
    const index = ODDS.findIndex((odd) => random >= odd[0] && random <= odd[1])
    const rarityNames = ODDS_GRADES[index]
    const _filteredSkins = skins.filter((s) => rarityNames.includes(s.rarity))
    const skin = _filteredSkins[Math.floor(Math.random() * _filteredSkins.length)]
    if (!skin?.name || !skin?.image) {
      return getRandomSkin()
    }
    return skin
  }

  const handleOpenCase = () => {
    const _wonSkin = getRandomSkin()
    const _sliderSkins = Array.from({ length: 74 }, () => {
      return getRandomSkin()
    }).filter((skin) => {
      return skin.name !== _wonSkin.name && !['Extraordinary', 'Covert', 'Classified'].includes(skin.rarity)
    })
    while (_sliderSkins.length < 74) {
      const skin = getRandomSkin()
      if (skin.name === _wonSkin.name || ['Extraordinary', 'Covert', 'Classified'].includes(skin.rarity)) {
        continue
      }
      _sliderSkins.push(skin)
    }
    _sliderSkins[61] = _wonSkin
    setSliderSkins(_sliderSkins as SkinItem[])
    setWonSkin(_wonSkin)
    setAnimating(true)
  }

  useEffect(() => {
    if (!animating || !sliderElement.current) return
    sliderElement.current?.animate(
      [
        {
          transform: ' translateX(0%)'
        },
        {
          transform: 'translateX(-80%)'
        }
      ],
      {
        duration: fastMode ? 600 : 4500,
        iterations: 1,
        easing: 'cubic-bezier( 0.29, 0.8, 0.55, 0.99 )'
      }
    )
    const timeout = setTimeout(
      () => {
        if (!wonSkin) return
        addInventoryItem(wonSkin)
        setAnimating(false)
        toast(
          <div className={`flex items-center p-1 gap-5 border-b-4`} style={{ borderColor: `#${wonSkin?.rarity_color}` }}>
            <Image
              priority
              width={200}
              height={200}
              src={wonSkin?.image ?? '/images/placeholder.webp'}
              alt=""
              className={`w-[5rem] mb-2`}
            />
            <p className="text-xs text-center text-gray-300">{wonSkin.name}</p>
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
        <p className="mt-2 mb-3 text-lg font-bold text-center sm:text-2xl">{selectedCase.name}</p>
        <Image
          width={300}
          height={300}
          priority
          src={selectedCase.image}
          className="sm:max-w-[12rem] w-full max-w-[8rem]  mx-auto"
          alt=""
        />
        <div className="flex gap-4 mx-auto mt-2 text-xl w-fit">
          <button
            disabled={animating}
            className="px-4 py-1 mx-auto mt-2 mb-1 bg-green-400 rounded w-fit text-gray-950"
            onClick={handleOpenCase}
          >
            Open case
          </button>
          <button
            disabled={animating}
            className="px-4 py-1 mx-auto mt-2 mb-1 text-gray-300 bg-gray-600 rounded w-fit"
            onClick={() => setFastMode((prev) => !prev)}
          >
            {fastMode ? '5x Speed' : '1x Speed'}
          </button>
          <button
            disabled={animating}
            className="px-4 py-1 mx-auto mt-2 mb-1 text-gray-300 bg-gray-600 rounded w-fit"
            onClick={() => setRealOdds((prev) => !prev)}
          >
            {realOdds ? 'Real odds' : 'Fun odds'}
          </button>
        </div>
      </div>

      {sliderSkins && (
        <div className="grid h-[40vh] mb-[30vh] place-content-center overflow-hidden">
          <div className="relative h-[159px] w-[62.5rem] overflow-hidden">
            <div className="absolute top-0 left-[50%] z-10 w-0.5 h-full bg-yellow-400"></div>
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
            className="px-2.5 py-1 mx-auto mt-3 rounded w-fit bg-zinc-700"
            onClick={() => {
              setShowKnifesAndGloves((prev) => !prev)
            }}
          >
            {showKnifesAndGloves ? 'Hide' : 'Show'} knifes and gloves
          </button>
        )}
        <div id="skins" className="p-6 mt-4 rounded gap-x-6 gap-y-4 bg-zinc-800 responsiveGrid">
          {filteredSkins?.map((skin, i: number) => (
            <div key={i}>
              <Image
                priority
                width={300}
                height={300}
                src={skin?.image ?? '/images/placeholder.webp'}
                alt=""
                style={{ borderColor: `#${skin?.rarity_color}` }}
                className={` border-l-4 bg-zinc-700 p-4 rounded-sm`}
              />
              <p className={`mt-2 text-xs text-center`}>{skin.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null
}
