'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { CaseType, SkinType } from '../types'
import { baseUrl, gradeColors } from '@/constants'
import { sortSkinByRarity } from '@/utils/helpers'

export default function Home() {
  const [cases, setCases] = useState<CaseType[]>([])
  const [allSkins, setAllSkins] = useState<SkinType[]>([])
  const [selectedCase, setSelectedCase] = useState<CaseType>()
  const [skins, setSkins] = useState<SkinType[]>([])
  const [showKnifesAndGloves, setShowKnifesAndGloves] = useState(false)

  const filteredSkins = useMemo(
    () => (showKnifesAndGloves ? skins : skins.filter((s) => !['Extraordinary', 'Covert'].includes(s.rarity))),
    [showKnifesAndGloves, skins]
  )

  const getSelectedCaseSkins = (_case: CaseType) => {
    const contains = [..._case.contains, ..._case.contains_rare]
    const skins = Array.from(
      new Set(contains.map((skin) => allSkins.find((s) => s.name === skin.name)).filter((s) => s !== undefined))
    ) as SkinType[]
    setSkins(sortSkinByRarity(skins))
    setSelectedCase(_case)
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    fetch(baseUrl + 'skins.json')
      .then((res) => res.json())
      .then((data) => setAllSkins(data))
    fetch(baseUrl + 'crates/cases.json')
      .then((res) => res.json())
      .then((data) => setCases(data.reverse()))
  }, [])

  return (
    <main className="w-full max-w-5xl p-3 mx-auto ">
      {selectedCase && (
        <section className="min-h-screen">
          <div className="flex flex-col">
            <p className="mb-1 text-2xl font-bold text-center">{selectedCase.name}</p>
            <Image
              quality={100}
              width={500}
              height={500}
              src={selectedCase.image}
              className="w-[12rem] mx-auto"
              alt=""
              priority
            />
            <button className="px-4 py-1 mx-auto my-1 text-xl bg-green-400 rounded w-fit text-gray-950">Open case</button>
          </div>

          {skins.length > 0 ? (
            <div className="flex flex-col">
              <div className="p-6 mt-4 rounded gap-x-6 gap-y-4 bg-zinc-800 responsiveGrid">
                {filteredSkins.map((skin, i: number) => (
                  <div key={i}>
                    <Image
                      width={200}
                      height={200}
                      src={skin.image}
                      alt=""
                      priority
                      className={`${gradeColors[skin.rarity]} border-l-4 bg-zinc-700 p-4 rounded`}
                    />
                    <p className={`mt-2 text-xs text-center`}>{skin.name}</p>
                  </div>
                ))}
              </div>
              <button
                className="px-2 py-1 mx-auto mt-6 mb-12 rounded w-fit bg-zinc-700"
                onClick={() => setShowKnifesAndGloves((prev) => !prev)}
              >
                {showKnifesAndGloves ? 'Hide' : 'Show'} knifes and gloves
              </button>
            </div>
          ) : null}
        </section>
      )}

      <section className="gap-6 responsiveGrid">
        {cases?.map((_case, i: number) => (
          <div
            key={i}
            className="transition-transform duration-75 cursor-pointer hover:scale-105"
            onClick={() => getSelectedCaseSkins(_case)}
          >
            <Image width={200} height={200} src={_case.image} alt="" priority />
            <p className="text-center">{_case.name}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
