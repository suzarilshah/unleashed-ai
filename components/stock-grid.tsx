"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, DollarSign, Users, Building2 } from "lucide-react"
import { GlassCard } from "./glass-card"
import { GlassButton } from "./glass-button"
import { Company } from "@/lib/company"

interface StockGridProps {
  companies: Company[]
  onSelectCompany: (company: Company) => void
}

export function StockGrid({ companies, onSelectCompany }: StockGridProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company)
    onSelectCompany(company)
  }

  const getRandomChange = () => {
    const change = (Math.random() - 0.5) * 10
    return change
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {companies.slice(0, 12).map((company, index) => {
        const change = getRandomChange()
        const isPositive = change >= 0
        
        return (
          <GlassCard 
            key={company.symbol} 
            className={`cursor-pointer transition-all duration-300 hover:scale-105 floating-animation ${
              selectedCompany?.symbol === company.symbol ? 'ring-2 ring-blue-400 pulse-glow' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div onClick={() => handleSelectCompany(company)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{company.symbol}</h3>
                    <p className="text-xs text-gray-300 truncate max-w-[120px]">{company.name}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm font-medium">{Math.abs(change).toFixed(2)}%</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Current Price</span>
                  <span className="text-white font-semibold">${company.stock_price.current}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Market Cap</span>
                  <span className="text-white text-sm">${(company.market_cap / 1e9).toFixed(1)}B</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Employees</span>
                  <span className="text-white text-sm">{company.employees.toLocaleString()}</span>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">52W High: ${company.stock_price.high_52_week}</span>
                    <span className="text-gray-400">Low: ${company.stock_price.low_52_week}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <GlassButton size="sm" variant="success" className="flex-1">
                  Buy
                </GlassButton>
                <GlassButton size="sm" variant="danger" className="flex-1">
                  Sell
                </GlassButton>
              </div>
            </div>
          </GlassCard>
        )
      })}
    </div>
  )
}