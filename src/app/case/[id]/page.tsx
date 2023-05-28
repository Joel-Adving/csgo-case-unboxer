'use client'

import { useGetCasesQuery, useGetSkinsQuery, useGetSouvenirsQuery } from '@/redux/services/csgoApi'
import { useInventory } from '@/redux/slices/inventorySlice'
import { Skin } from '@/types'
import { GRADE_COLORS, GRADE_COLORS_BORDER, ODDS, ODDS_GRADES, ignoredCovertGunSkins } from '@/utils/constants'
import { sortSkinByRarity } from '@/utils/helpers'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function CaseIdPage({ params }: { params: { id: string } }) {
  const [wonSkin, setWonSkin] = useState<Skin | null>()
  const [sliderSkins, setSliderSkins] = useState<Skin[] | null>(null)
  const [animating, setAnimating] = useState(false)
  const [fastMode, setFastMode] = useState(false)
  const [showKnifesAndGloves, setShowKnifesAndGloves] = useState(false)

  const sliderElement = useRef<HTMLDivElement>(null)

  const { addInventoryItem } = useInventory()

  const { data: allSkins } = useGetSkinsQuery(null)
  const { data: cases } = useGetCasesQuery(null)
  const { data: souvenirs } = useGetSouvenirsQuery(null)

  const selectedCase = useMemo(() => {
    return cases?.find((c) => c.id === params.id) ?? souvenirs?.find((c) => c.id === params.id)
  }, [cases, params.id, souvenirs])

  const skins = useMemo(() => {
    if (!selectedCase || !allSkins) return []
    console.log(selectedCase)
    const contains = [...selectedCase.contains, ...selectedCase.contains_rare]
    const skins = Array.from(
      new Set(contains.map((skin) => allSkins.find((s) => s.name === skin.name)).filter((s) => s !== undefined))
    ) as Skin[]
    return sortSkinByRarity(skins)
  }, [allSkins, selectedCase])

  const filteredSkins = useMemo(
    () =>
      showKnifesAndGloves
        ? skins
        : skins?.filter((s) => {
            if (['Extraordinary', 'Covert'].includes(s.rarity)) {
              if (ignoredCovertGunSkins.includes(s.weapon)) {
                return true
              }
              return false
            }
            return true
          }),
    [showKnifesAndGloves, skins]
  )

  const getRandomSkin = () => {
    if (!skins) return
    const random = Math.random()
    const index = ODDS.findIndex((odd) => random >= odd[0] && random <= odd[1])
    const rarityNames = ODDS_GRADES[index]
    const _filteredSkins = skins.filter((s) => rarityNames.includes(s.rarity))
    return _filteredSkins[Math.floor(Math.random() * _filteredSkins.length)]
  }

  const handleOpenCase = () => {
    const randomSkin = getRandomSkin()
    const randomSkins = Array.from({ length: 100 }, () => {
      return getRandomSkin()
    }).filter((skin) => {
      if (!skin?.name || !randomSkin?.name || !skin?.image || !randomSkin?.image) return false
      return skin.name !== randomSkin.name && !['Extraordinary', 'Covert'].includes(skin.rarity)
    })
    randomSkins.length = 74
    randomSkins[61] = randomSkin
    setSliderSkins(randomSkins as Skin[])
    console.log(randomSkin)
    setWonSkin(randomSkin)
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
        duration: fastMode ? 1000 : 4500,
        iterations: 1,
        easing: 'cubic-bezier( 0.29, 0.8, 0.55, 0.99 )'
      }
    )
    const timeout = setTimeout(
      () => {
        addInventoryItem(wonSkin)
        setAnimating(false)
      },
      fastMode ? 1000 : 4500
    )
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating, wonSkin, fastMode])

  return selectedCase ? (
    <section className="min-h-screen">
      <div className="flex flex-col">
        <p className="mt-2 mb-3 text-lg font-bold text-center sm:text-2xl">{selectedCase.name}</p>
        <Image
          width={300}
          height={300}
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
            {fastMode ? '4x Speed' : '1x Speed'}
          </button>
        </div>
      </div>

      {sliderSkins && (
        <div className="grid h-[40vh] mb-[30vh] place-content-center overflow-hidden">
          <div className="relative h-[159px] w-[62.5rem] overflow-hidden">
            <div className="absolute top-0 left-[50%] z-10 w-0.5 h-full bg-yellow-400"></div>
            <div ref={sliderElement} className="absolute left-0 top-0 flex gap-3 translate-x-[-80%]">
              {sliderSkins.map((skin, i) => (
                <div key={i}>
                  <Image
                    width={300}
                    height={300}
                    src={skin?.image ?? '/images/placeholder.png'}
                    className={`border-${
                      GRADE_COLORS[skin?.rarity]
                    }-500 border-b-8 bg-zinc-700 p-4  min-w-[12rem] rounded-sm`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <button
          className="px-2.5 py-1 mx-auto mt-3 rounded w-fit bg-zinc-700"
          onClick={() => {
            setShowKnifesAndGloves((prev) => !prev)
          }}
        >
          {showKnifesAndGloves ? 'Hide' : 'Show'} knifes and gloves
        </button>
        <div id="skins" className="p-6 mt-4 rounded gap-x-6 gap-y-4 bg-zinc-800 responsiveGrid">
          {filteredSkins?.map((skin, i: number) => (
            <div key={i}>
              <Image
                width={300}
                height={300}
                src={skin?.image ?? '/images/placeholder.png'}
                alt=""
                className={` ${GRADE_COLORS_BORDER[skin.rarity]} border-l-4 bg-zinc-700 p-4 rounded`}
              />
              <p className={`mt-2 text-xs text-center`}>{skin.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null
}
