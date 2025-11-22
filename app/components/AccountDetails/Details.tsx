"use client";

import React, { useState, useEffect } from 'react';

interface DayBoxProps {
  days: number;
  label: string;
  isActive: boolean;
  isFirstBox?: boolean;
}

const DayBox: React.FC<DayBoxProps> = ({ days, label, isActive, isFirstBox = false }) => {
  return (
    <div className="relative flex items-center gap-6 py-4 group">
      {/* Main box with yellow border */}
      <div className={`
        relative flex flex-col items-center justify-center rounded-xl 
        border-2 transition-all duration-500 z-10
        ${isFirstBox 
          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-100' 
          : 'border-yellow-400 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'
        }
        ${isActive ? 'scale-105' : 'scale-100'}
        ${isFirstBox ? 'w-20 h-20' : 'w-16 h-16'}
        hover:scale-110 transition-all duration-300 cursor-pointer
      `}>
        {/* Active state indicator */}
        {isActive && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        )}
        
        <span className={`font-bold ${isFirstBox ? 'text-yellow-800 text-xl' : 'text-gray-700 text-base'}`}>
          {days}
        </span>
      </div>
      
      {/* Label */}
      <div className="flex flex-col">
        <span className={`font-semibold ${isFirstBox ? 'text-yellow-800 text-lg' : 'text-gray-700'}`}>
          {label}
        </span>
      </div>
    </div>
  );
};

const Details: React.FC = () => {
  const [activeBox, setActiveBox] = useState<number>(0);
  const [progress, setProgress] = useState<number>(5.9);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBox(prev => (prev + 1) % 5);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const dayData = [
    { days: 30, label: '30 days (1 month)' },
    { days: 91, label: '91 days (3 months)' },
    { days: 182, label: '182 days (6 months)' },
    { days: 274, label: '274 days (9 months)' },
    { days: 364, label: '364 days (12 months)' },
  ];

  const paymentDetails = [
    { label: 'Minimum Payment', value: '2,400 NGN' },
    { label: 'Unlock Price', value: '153,000 NGN' },
    { label: 'Nominal Term', value: '420 days', subtext: '(1 year, 1 month, 24 days)' },
    { label: 'Total Paid', value: '9,000 NGN' },
    { label: 'Outstanding Balance', value: '144,000 NGN' },
  ];
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl w-full items-center">
        {/* Left Side - Payment Details */}
        <div className="lg:w-2/5 w-full">
          <div className="bg-white rounded-2xl border-2 border-yellow-400 p-8">
            <div className="mb-6 pb-4 border-b border-amber-200">
              <h2 className="text-2xl font-bold text-black">
                Payment Dashboard
              </h2>
            </div>
            
            <div className="space-y-6">
              {paymentDetails.map((detail, index) => (
                <div key={index} className="flex justify-between items-center gap-4 p-3 hover:bg-amber-50/50 transition-colors">
                  <div className="flex-1">
                    <span className="text-amber-700 font-medium text-sm block">
                      {detail.label}
                    </span>
                    {detail.subtext && (
                      <span className="text-amber-500 text-xs">{detail.subtext}</span>
                    )}
                  </div>
                  <span className={`font-bold text-right flex-1 ${
                    detail.label.includes('Outstanding Balance') ? 'text-red-600' : 
                    detail.label.includes('Total Paid') ? 'text-green-600' : 'text-amber-900'
                  }`}>
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-xl border-2 border-yellow-400">
              <div className="flex justify-between text-sm text-amber-700 mb-3">
                <span className="font-semibold">Payment Progress</span>
                <span className="font-bold text-amber-700">{progress}%</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-amber-600 mt-2">
                <span className="font-medium">9,000 NGN paid</span>
                <span className="font-medium">153,000 NGN total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Pay Early Save More */}
        <div className="lg:w-3/5 w-full flex flex-col items-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">
              Pay Early Save More Monitor
            </h1>
          </div>
          
          <div className="relative bg-white rounded-2xl border-2 border-yellow-400 p-8 w-full max-w-lg">
            <div className="flex flex-col">
              {dayData.map((item, index) => (
                <DayBox 
                  key={index}
                  days={item.days} 
                  label={item.label} 
                  isActive={activeBox === index} 
                  isFirstBox={index === 0}
                />
              ))}
            </div>
            
            {/* Progress line */}
            <div className="absolute left-20 top-24 bottom-24 w-1 bg-gradient-to-b from-yellow-400 via-amber-400 to-orange-400 z-0 rounded-full"></div>
          </div>
          
          {/* Status indicator */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 rounded-2xl text-white border-2 border-yellow-400">
              <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
              <span className="font-semibold">
                Active Phase: {dayData[activeBox].label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;