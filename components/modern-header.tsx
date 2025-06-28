"use client"

import { useState } from "react"
import { Search, Bell, User, TrendingUp, BarChart3 } from "lucide-react"
import { GlassCard } from "./glass-card"
import { GlassButton } from "./glass-button"

export function ModernHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <GlassCard className="mb-6 sticky top-4 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Unleashed AI</h1>
              <p className="text-sm text-gray-300">Smart Trading Analytics</p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search stocks, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <GlassButton size="sm" className="p-2">
            <Bell className="h-4 w-4" />
          </GlassButton>
          <GlassButton size="sm" className="p-2">
            <BarChart3 className="h-4 w-4" />
          </GlassButton>
          <GlassButton size="sm" className="p-2">
            <User className="h-4 w-4" />
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  )
}