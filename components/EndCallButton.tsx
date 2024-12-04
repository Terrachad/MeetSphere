'use client'

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();
    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    if(!call) return null;
    //check if id of owner is the same to the meeting of current participant
    const isUserMeetingOwner = localParticipant && call.state.createdBy && localParticipant.userId === call.state.createdBy.id;
    if(!isUserMeetingOwner) return null;

    return (
        <Button onClick={async() => {
            await call.endCall();
            router.push('/')
        }} className='bg-red-500'>
            End the sphere meeting for everyone
        </Button>
    )
}

export default EndCallButton