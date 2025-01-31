'use client'

import MeetingTypeList from '@/components/MeetingTypeList'
import { useGetCalls } from '@/hooks/use-getCalls'
import React, { useState, useEffect } from 'react'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { upcomingCalls } = useGetCalls()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const closestMeetingTime = upcomingCalls?.[0]?.state?.startsAt
    ? new Date(upcomingCalls[0].state.startsAt)
    : new Date()

  const meetingTime = closestMeetingTime.toLocaleTimeString('it-IT', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })

  const currentTimeString = currentTime.toLocaleTimeString('it-IT', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })

  const dateString = new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'full'
  }).format(currentTime)

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] overflow-hidden relative'>
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 
          bg-gradient-flow 
          bg-flow-size
          animate-gradient-flow
          opacity-80
        " />
        
        {/* Content Overlay */}
        <div className='relative flex h-full flex-col justify-between max-md:px-5 max-md:py-8 md:p-8 lg:p-11 bg-black/40'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            {upcomingCalls.length > 0 ? `Upcoming meeting at ${meetingTime}` : 'No upcoming meetings'}
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {currentTimeString}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {dateString}
            </p>
          </div>
        </div>
      </div>
      
      <MeetingTypeList />
    </section>
  )
}

export default Home