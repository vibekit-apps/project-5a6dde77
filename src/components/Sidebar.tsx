'use client';

import { BarChart3, Calendar, TrendingUp, Settings, Home, X } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', icon: Home, href: '#', current: true },
  { name: 'Analytics', icon: BarChart3, href: '#', current: false },
  { name: 'Trends', icon: TrendingUp, href: '#', current: false },
  { name: 'Calendar', icon: Calendar, href: '#', current: false },
  { name: 'Settings', icon: Settings, href: '#', current: false },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Analytics</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={clsx(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  item.current
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )}
              >
                <Icon className={clsx(
                  'mr-3 h-5 w-5 transition-colors',
                  item.current ? 'text-white' : 'text-gray-400 group-hover:text-white'
                )} />
                {item.name}
              </a>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-700">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Dashboard User</p>
              <p className="text-xs text-gray-400 truncate">Health Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}