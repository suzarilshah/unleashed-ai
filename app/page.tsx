"use client"

import { useState, useEffect } from "react"
import { ModernHeader } from "@/components/modern-header"
import { MarketOverview } from "@/components/market-overview"
import { StockGrid } from "@/components/stock-grid"
import { AIInsights } from "@/components/ai-insights"
import { NewsTicker } from "@/components/news-ticker"
import { Company } from "@/lib/company"

async function getCompanies(): Promise<Company[]> {
  try {
    const response = await fetch('/api/allCompany', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    // Return fallback data
    return [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        exchange: "NASDAQ",
        industry: "Technology",
        sector: "Consumer Electronics",
        website: "https://www.apple.com",
        description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
        stock_price: {
          current: "175.12",
          high_52_week: "198.23",
          low_52_week: "143.10"
        },
        market_cap: 2850000000000,
        employees: 164000
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc.",
        exchange: "NASDAQ",
        industry: "Automotive",
        sector: "Electric Vehicles",
        website: "https://www.tesla.com",
        description: "Tesla, Inc. engages in the design, development, manufacture, and sale of electric vehicles and energy storage systems.",
        stock_price: {
          current: "215.65",
          high_52_week: "310.20",
          low_52_week: "175.80"
        },
        market_cap: 850000000000,
        employees: 110000
      }
    ];
  }
}

export default function HomePage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies()
        setCompanies(companiesData)
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <p className="text-white text-xl">Loading market data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <ModernHeader />
        <NewsTicker />
        <MarketOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4 gradient-text">
                Market Stocks
              </h2>
              <StockGrid 
                companies={companies} 
                onSelectCompany={setSelectedCompany}
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-4 gradient-text">
                AI Insights
              </h2>
              <AIInsights selectedCompany={selectedCompany} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}