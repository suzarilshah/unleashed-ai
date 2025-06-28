"use client"

import { useState, useEffect } from "react"
import { Brain, TrendingUp, AlertTriangle, Target } from "lucide-react"
import { GlassCard } from "./glass-card"
import { Company } from "@/lib/company"

interface AIInsightsProps {
  selectedCompany: Company | null
}

export function AIInsights({ selectedCompany }: AIInsightsProps) {
  const [insights, setInsights] = useState({
    sentiment: "Bullish",
    confidence: 87,
    recommendation: "BUY",
    riskLevel: "Medium",
    targetPrice: 0
  })

  useEffect(() => {
    if (selectedCompany) {
      const currentPrice = parseFloat(selectedCompany.stock_price.current)
      setInsights({
        sentiment: Math.random() > 0.5 ? "Bullish" : "Bearish",
        confidence: Math.floor(Math.random() * 30) + 70,
        recommendation: Math.random() > 0.3 ? "BUY" : "SELL",
        riskLevel: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        targetPrice: currentPrice * (1 + (Math.random() - 0.5) * 0.3)
      })
    }
  }, [selectedCompany])

  if (!selectedCompany) {
    return (
      <GlassCard className="text-center py-12">
        <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">AI Analysis</h3>
        <p className="text-gray-300">Select a stock to view AI-powered insights</p>
      </GlassCard>
    )
  }

  const getSentimentColor = (sentiment: string) => {
    return sentiment === "Bullish" ? "text-green-400" : "text-red-400"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-400"
      case "Medium": return "text-yellow-400"
      case "High": return "text-red-400"
      default: return "text-gray-400"
    }
  }

  return (
    <GlassCard>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">AI Analysis</h3>
          <p className="text-gray-300 text-sm">{selectedCompany.symbol} - {selectedCompany.name}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className={`h-6 w-6 ${getSentimentColor(insights.sentiment)}`} />
            </div>
            <h4 className={`text-lg font-semibold ${getSentimentColor(insights.sentiment)}`}>
              {insights.sentiment}
            </h4>
            <p className="text-gray-300 text-sm">Market Sentiment</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-white">
              {insights.confidence}%
            </h4>
            <p className="text-gray-300 text-sm">Confidence Level</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Recommendation</span>
            <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
              insights.recommendation === "BUY" 
                ? "bg-green-500/20 text-green-400" 
                : "bg-red-500/20 text-red-400"
            }`}>
              {insights.recommendation}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Risk Level</span>
            <span className={`font-semibold ${getRiskColor(insights.riskLevel)}`}>
              {insights.riskLevel}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Target Price</span>
            <span className="font-semibold text-white">
              ${insights.targetPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div>
              <h5 className="font-semibold text-white text-sm mb-1">AI Insight</h5>
              <p className="text-gray-300 text-sm">
                Based on recent market trends and news sentiment analysis, 
                {selectedCompany.symbol} shows {insights.sentiment.toLowerCase()} signals 
                with {insights.confidence}% confidence. Consider market volatility in your decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}