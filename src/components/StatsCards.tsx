'use client';

import { TrendingUp, TrendingDown, Calendar, Award } from 'lucide-react';
import { type DrinkingData } from '@/lib/data';

interface StatsCardsProps {
  data: DrinkingData;
}

export default function StatsCards({ data }: StatsCardsProps) {
  const stats = [
    {
      name: 'Total Drinks',
      value: data.totalDrinks.toString(),
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      description: 'All time total',
    },
    {
      name: 'Average per Month',
      value: data.averagePerMonth.toFixed(1),
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      description: 'Monthly average',
    },
    {
      name: 'Highest Month',
      value: `${data.highestMonth.drinks} (${data.highestMonth.month})`,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
      description: 'Peak consumption',
    },
    {
      name: 'Current Streak',
      value: `${data.currentStreak} days`,
      icon: Award,
      color: 'from-green-500 to-green-600',
      description: 'Zero-drink days',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 flex items-center">
              <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                  style={{ 
                    width: stat.name === 'Current Streak' 
                      ? `${Math.min((data.currentStreak / 30) * 100, 100)}%`
                      : '75%',
                    animationDelay: `${index * 0.2 + 0.5}s`
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}