'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import StatsCards from '@/components/StatsCards';
import Charts from '@/components/Charts';
import CalendarHeatmap from '@/components/CalendarHeatmap';
import { processData, type DrinkingData } from '@/lib/data';

export default function Dashboard() {
  const [data, setData] = useState<DrinkingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(processData());
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400">Error loading data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64 transition-all duration-300 ease-in-out">
        <header className="bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-white">Drinking Analytics</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <StatsCards data={data} />
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <Charts data={data} />
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CalendarHeatmap data={data.dailyData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}