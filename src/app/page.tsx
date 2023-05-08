/* eslint-disable @next/next/no-img-element */

'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { API_URL, GRADE_COLORS, GRADE_COLORS_BORDER, ODDS, ODDS_GRADES, ignoredCovertGunSkins } from '@/constants'
import { sortSkinByRarity } from '@/utils/helpers'
import { CaseType, SkinType } from '@/types'

export default function Home() {
  const [cases, setCases] = useState<CaseType[]>([])
  const [skins, setSkins] = useState<SkinType[]>([])
  const [allSkins, setAllSkins] = useState<SkinType[]>([])
  const [selectedCase, setSelectedCase] = useState<CaseType>()

  const [showSouvenirCases, setShowSouvenirCases] = useState(false)
  const [showKnifesAndGloves, setShowKnifesAndGloves] = useState(false)

  const [wonSkin, setWonSkin] = useState<SkinType | null>()
  const [sliderSkins, setSliderSkins] = useState<SkinType[] | null>(null)

  const [animating, setAnimating] = useState(false)
  const [fastMode, setFastMode] = useState(false)

  const [inventory, setInventory] = useState<SkinType[]>([])
  const [showInventory, setShowInventory] = useState(true)

  const sliderElement = useRef<HTMLDivElement>(null)

  const filteredCases = useMemo(
    () => (showSouvenirCases ? cases : cases.filter((c) => c.type !== 'Souvenir')),
    [showSouvenirCases, cases]
  )

  const filteredSkins = useMemo(
    () =>
      showKnifesAndGloves
        ? skins
        : skins.filter((s) => {
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
    setSliderSkins(randomSkins)
    setWonSkin(randomSkin)
    setAnimating(true)
  }

  const getSelectedCaseSkins = (_case: CaseType) => {
    setWonSkin(null)
    setSliderSkins(null)
    setAnimating(false)
    const contains = [..._case.contains, ..._case.contains_rare]
    const skins = Array.from(
      new Set(contains.map((skin) => allSkins.find((s) => s.name === skin.name)).filter((s) => s !== undefined))
    ) as SkinType[]
    setSkins(sortSkinByRarity(skins))
    setSelectedCase(_case)
    window.scrollTo({ top: 0 })
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
        setInventory((prev) => [wonSkin!, ...prev])
        setAnimating(false)
      },
      fastMode ? 1000 : 4500
    )
    return () => clearTimeout(timeout)
  }, [animating, wonSkin, fastMode])

  useEffect(() => {
    const fetchData = async () => {
      const [skinsRes, casesRes, souvenirRes] = await Promise.all([
        fetch(API_URL + '/skins.json'),
        fetch(API_URL + '/crates/cases.json'),
        fetch(API_URL + '/crates/souvenir.json')
      ])
      const skinsData = await skinsRes.json()
      const casesData = await casesRes.json()
      const souvenirData = await souvenirRes.json()
      const allCases = [...casesData, ...souvenirData]
      setAllSkins(skinsData)
      setCases(allCases.reverse())
    }
    fetchData()
  }, [])

  return (
    <main className="relative w-full max-w-5xl p-3 mx-auto">
      {inventory.length > 0 ? (
        <div className={`fixed right-0 top-0 overflow-auto z-20 ${showInventory && 'bg-neutral-900 h-[100vh]'}`}>
          <div className="flex flex-col w-full max-w-[10rem] gap-2 p-2">
            <button
              className="px-3 py-0.5 mx-auto border bg-neutral-900 rounded w-fit"
              onClick={() => setShowInventory((prev) => !prev)}
            >
              {showInventory ? 'Hide' : 'Show'} inventory
            </button>
            <p className="text-center">{inventory.length} Items</p>
            <button className="px-3 py-0.5 mx-auto border bg-neutral-900 rounded w-fit" onClick={() => setInventory([])}>
              clear
            </button>
            {showInventory && (
              <div className="flex flex-col gap-2">
                {inventory.map((skin, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <img
                      src={skin.image}
                      alt=""
                      className={`border-${
                        GRADE_COLORS[skin.rarity]
                      }-500 border-l-8 max-w-[8rem] bg-zinc-700 p-4 rounded-sm`}
                    />
                    <p className="text-xs text-center">{skin.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {selectedCase && (
        <section className="min-h-screen">
          <div className="flex flex-col">
            <p className="mb-1 text-lg font-bold text-center sm:text-2xl">{selectedCase.name}</p>
            <img src={selectedCase.image} className="sm:max-w-[12rem] w-full max-w-[8rem]  mx-auto" alt="" />
            <div className="flex gap-4 mx-auto text-xl w-fit">
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
            <div className="grid h-[50vh] mb-[25vh] place-content-center overflow-hidden">
              <div className="relative h-[159px] w-[62.5rem] overflow-hidden">
                <div className="absolute top-0 left-[50%] z-10 w-0.5 h-full bg-yellow-400"></div>
                <div ref={sliderElement} className="absolute left-0 top-0 flex gap-3 translate-x-[-80%]">
                  {sliderSkins.map((skin, i) => (
                    <div key={i}>
                      <img
                        src={skin.image}
                        className={`border-${
                          GRADE_COLORS[skin.rarity]
                        }-500 border-b-8 bg-zinc-700 p-4  min-w-[12rem] rounded-sm`}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {skins.length > 0 ? (
            <div className="flex flex-col">
              <div id="skins" className="p-6 mt-4 rounded gap-x-6 gap-y-4 bg-zinc-800 responsiveGrid">
                {filteredSkins.map((skin, i: number) => (
                  <div key={i}>
                    <img
                      src={skin.image}
                      alt=""
                      className={` ${GRADE_COLORS_BORDER[skin.rarity]} border-l-4 bg-zinc-700 p-4 rounded`}
                    />
                    <p className={`mt-2 text-xs text-center`}>{skin.name}</p>
                  </div>
                ))}
              </div>
              <button
                className="px-2.5 py-1 mx-auto mt-6 rounded w-fit bg-zinc-700"
                onClick={() => {
                  setShowKnifesAndGloves((prev) => !prev)
                  document.getElementById('skins')?.scrollIntoView()
                }}
              >
                {showKnifesAndGloves ? 'Hide' : 'Show'} knifes and gloves
              </button>
            </div>
          ) : null}
        </section>
      )}

      <section className="flex flex-col">
        <button
          className="px-2.5 py-1 mx-auto mt-6 mb-12 rounded w-fit bg-zinc-700"
          onClick={() => setShowSouvenirCases((prev) => !prev)}
        >
          {showSouvenirCases ? 'Hide' : 'Show'} souvenir cases
        </button>
        <div className="gap-5 responsiveGrid">
          {filteredCases?.map((_case, i: number) => {
            const selected = selectedCase?.id === _case.id
            return (
              <div
                key={i}
                className={`transition-transform duration-75 cursor-pointer hover:scale-105`}
                onClick={() => getSelectedCaseSkins(_case)}
              >
                <img src={_case.image} alt="" className={`${selected && 'bg-zinc-700 rounded border p-3'}`} />
                <p className={`${selected && 'underline'} text-center mt-2`}>{_case.name}</p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
