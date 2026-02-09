'use client';

import { format, eachDayOfInterval, startOfYear, endOfYear, startOfWeek, endOfWeek } from 'date-fns';
import { clsx } from 'clsx';

interface CalendarHeatmapProps {
  data: { [date: string]: number };
}

const getIntensityClass = (value: number) => {
  if (value === 0) return 'bg-gray-700 hover:bg-gray-600';
  if (value <= 2) return 'bg-green-900 hover:bg-green-800';
  if (value <= 4) return 'bg-green-700 hover:bg-green-600';
  if (value <= 6) return 'bg-green-500 hover:bg-green-400';
  if (value <= 8) return 'bg-yellow-600 hover:bg-yellow-500';
  return 'bg-red-600 hover:bg-red-500';
};

const getIntensityLabel = (value: number) => {
  if (value === 0) return 'No drinks';
  if (value <= 2) return 'Light';
  if (value <= 4) return 'Moderate';
  if (value <= 6) return 'High';
  if (value <= 8) return 'Very high';
  return 'Extreme';
};

export default function CalendarHeatmap({ data }: CalendarHeatmapProps) {
  const currentYear = new Date().getFullYear();
  const yearStart = startOfYear(new Date(currentYear, 0, 1));
  const yearEnd = endOfYear(new Date(currentYear, 0, 1));
  
  // Get all days of the year
  const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd });
  
  // Group days by week
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  allDays.forEach((day, index) => {
    if (index === 0) {
      // Start with the first week
      const weekStart = startOfWeek(day, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(day, { weekStartsOn: 0 });
      currentWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
    } else if (day.getDay() === 0) {
      // Start new week on Sunday
      weeks.push([...currentWeek]);
      const weekStart = startOfWeek(day, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(day, { weekStartsOn: 0 });
      currentWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
    }
  });
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Daily Activity Heatmap</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-yellow-600 rounded-sm"></div>
            <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-2">
            <div className="w-8"></div>
            {weeks.map((week, weekIndex) => {
              const firstDay = week.find(day => day.getFullYear() === currentYear);
              if (!firstDay || firstDay.getDate() > 7) return <div key={weekIndex} className="w-3 mr-1"></div>;
              
              return (
                <div key={weekIndex} className="w-3 mr-1 text-xs text-gray-400 text-center">
                  {firstDay.getDate() === 1 ? months[firstDay.getMonth()] : ''}
                </div>
              );
            })}
          </div>
          
          {/* Calendar grid */}
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col mr-2">
              {days.map((day, index) => (
                <div key={day} className={clsx(
                  'w-6 h-3 mb-1 text-xs text-gray-400 text-right leading-3',
                  index % 2 === 1 ? 'opacity-100' : 'opacity-0'
                )}>
                  {day}
                </div>
              ))}
            </div>
            
            {/* Heatmap */}
            <div className="flex">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col mr-1">
                  {week.map((day) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const value = data[dateStr] || 0;
                    const isCurrentYear = day.getFullYear() === currentYear;
                    
                    return (
                      <div
                        key={dateStr}
                        className={clsx(
                          'w-3 h-3 mb-1 rounded-sm border border-gray-600 transition-all duration-200 cursor-pointer group relative',
                          isCurrentYear ? getIntensityClass(value) : 'bg-gray-800',
                          'hover:scale-110 hover:border-gray-400'
                        )}
                        title={isCurrentYear ? `${format(day, 'MMM d, yyyy')}: ${value} drinks (${getIntensityLabel(value)})` : ''}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                          {format(day, 'MMM d, yyyy')}<br />
                          {value} drinks ({getIntensityLabel(value)})
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        <p>Each square represents a day. Hover over squares to see details.</p>
      </div>
    </div>
  );
}