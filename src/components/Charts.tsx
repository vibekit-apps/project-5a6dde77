'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type DrinkingData } from '@/lib/data';

interface ChartsProps {
  data: DrinkingData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
        <p className="text-gray-300 text-sm mb-1">{`${label}`}</p>
        <p className="text-white font-semibold">
          {`Drinks: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function Charts({ data }: ChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Bar Chart */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Monthly Distribution</h3>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={{ stroke: '#6B7280' }}
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={{ stroke: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="drinks" 
                fill="url(#blueGradient)"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              >
              </Bar>
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Trend Over Time</h3>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={{ stroke: '#6B7280' }}
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={12}
                tickLine={{ stroke: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="drinks" 
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#A855F7' }}
                className="drop-shadow-lg"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}