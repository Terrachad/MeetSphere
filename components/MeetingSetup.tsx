'use client'

import { useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = () => {
    const [isCamToggledOn, setIsCamToggledOn] = useState(false)
    const call = useCall();
    useEffect(() => {
        if(isCamToggledOn){
            call?.camera.disable();
            call?.microphone.disable()
        }
        else{
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isCamToggledOn, call?.camera, call?.microphone])
    
    return (
    <div className='flex h-screen w-full flex-col items-center justify-center gpa-3 text-white'>
            <h1 className='text-2xl font-bold'> 
                <VideoPreview/>
            </h1>
    </div>
  )
}

export default MeetingSetup