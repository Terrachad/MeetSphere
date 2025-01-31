'use client'

import { useGetCalls } from '@/hooks/use-getCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from '@/hooks/use-toast';

const CallList = ({type} : {type: 'ended' | 'upcoming' | 'recordings'}) => {
    const {endedCalls, upcomingCalls, callRecodings, isLoading} = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const {toast} = useToast()
    const getCalls = ()=> {
        switch (type) {
            case 'ended':
                return endedCalls;
                break;
            case 'recordings':
                return recordings;
                break;
            case 'upcoming':
                return upcomingCalls;
                break;
            default:
                return []
                break;
        }
    }
    const getNoCallsMessage = ()=> {
        switch (type) {
            case 'ended':
                return 'No previous spheres found';
                break;
            case 'recordings':
                return 'No sphere recordings found';
                break;
            case 'upcoming':
                return 'No upcoming meets found';
                break;
            default:
                return ''
                break;
        }
    }

    useEffect(() => {
        const fetchRecordings = async () =>{
            try {
                const callData = await Promise.all(callRecodings.map((meeting) => meeting.queryRecordings()))

                const recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings)
                setRecordings(recordings)
            } catch (error) {
                toast({title: `Too much for unpaid version, try again later${error}`})
            }
        }
        if(type === 'recordings') fetchRecordings()
    }, [type, callRecodings, toast])
    

    const calls = getCalls()
    const noCallsMessage = getNoCallsMessage()

    if(isLoading) return <Loader/>
    return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-3'>
        {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
            <MeetingCard
            key={(meeting as Call).id}
            icon={
                type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                    ? '/icons/upcoming.svg'
                    :'/icons/recordings.svg'
            }
            title={(meeting as Call).state?.custom?.description?.substring(0,24) || 'MeetSphere Recording'}
            date={(meeting as Call).state?.startsAt!.toLocaleString() || new Date((meeting as CallRecording).start_time).toLocaleString()}
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
                type === 'recordings' ? () => router.push(`${(meeting as CallRecording).url}`) : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            link={
                type === 'recordings' ? (meeting as CallRecording).url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            
            />
        )) : (
            <h1>{noCallsMessage}</h1>
        )}
    </div>
    )
}

export default CallList