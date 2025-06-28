"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "./glass-card"

export function NewsTicker() {
  const [news] = useState([
    "AAPL reaches new all-time high amid strong quarterly earnings",
    "Tesla announces breakthrough in autonomous driving technology",
    "Microsoft Azure revenue grows 35% year-over-year",
    "Amazon Web Services expands into new international markets",
    "NVIDIA's AI chip demand continues to surge globally"
  ])

  return (
    <GlassCard className="mb-6 overflow-hidden">
      <div className="flex items-center">
        <div className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold mr-4 flex-shrink-0">
          LIVE
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="marquee whitespace-nowrap text-white">
            {news.map((item, index) => (
              <span key={index} className="mx-8">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}