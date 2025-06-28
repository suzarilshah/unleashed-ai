"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"
import { GlassCard } from "./glass-card"

export function MarketOverview() {
  const [marketData, setMarketData] = useState({
    totalValue: 2847.32,
    change: 1.24,
    volume: 847.2,
    activeStocks: 156
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        totalValue: prev.totalValue + (Math.random() - 0.5) * 10,
        change: (Math.random() - 0.5) * 5,
        volume: prev.volume + (Math.random() - 0.5) * 50
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const isPositive = marketData.change >= 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <GlassCard className="text-center">
        <div className="flex items-center justify-center mb-2">
          <DollarSign className="h-8 w-8 text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">${marketData.totalValue.toFixed(2)}</h3>
        <p className="text-gray-300 text-sm">Total Portfolio Value</p>
      </GlassCard>

      <GlassCard className="text-center">
        <div className="flex items-center justify-center mb-2">
          {isPositive ? (
            <TrendingUp className="h-8 w-8 text-green-400" />
          ) : (
            <TrendingDown className="h-8 w-8 text-red-400" />
          )}
        </div>
        <h3 className={`text-2xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{marketData.change.toFixed(2)}%
        </h3>
        <p className="text-gray-300 text-sm">24h Change</p>
      </GlassCard>

      <GlassCard className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Activity className="h-8 w-8 text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">${marketData.volume.toFixed(1)}M</h3>
        <p className="text-gray-300 text-sm">Trading Volume</p>
      </GlassCard>

      <GlassCard className="text-center">
        <div className="flex items-center justify-center mb-2">
          <TrendingUp className="h-8 w-8 text-yellow-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">{marketData.activeStocks}</h3>
        <p className="text-gray-300 text-sm">Active Stocks</p>
      </GlassCard>
    </div>
  )
}