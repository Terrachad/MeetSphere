'use client'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setIsSetupComplete} : {setIsSetupComplete: (value: boolean)=> void}) => {
    const [isCamToggledOn, setIsCamToggledOn] = useState(false)
    const call = useCall();
    if(!call){
        throw new Error('!call')
    }
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
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>

                <VideoPreview className='flex items-center justify-center'/>
                <div className='flex h-16 items-center justify-center gap-3'>
                    <label className='flex items-center justify-center gap-2 font-medium'>
                        <input type='checkbox' checked={isCamToggledOn} onChange={(e) => setIsCamToggledOn(e.target.checked)}/>
                        Join with mic and camera off
                    </label>
                    <DeviceSettings/>
                </div>
                <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={()=>{
                    call.join();
                    setIsSetupComplete(true);
                }}>
                    Join the Meet Sphere
                </Button>
    </div>
  )
}

export default MeetingSetup