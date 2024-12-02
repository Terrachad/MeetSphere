import React, { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'


const MeetingTypeList = () => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [meetingState, setMetingState] = useState<'isJoiningMeeting'|'isScheduleMeeting'|'isInstantMeeting' | undefined>()
const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link:'',
})
const [callDetails, setCallDetails] = useState<Call>()
const { toast } = useToast()
const {user} = useUser();
const router = useRouter()
const client = useStreamVideoClient();

const createMeeting = async() => {
    if(!client || !user) return ;
    try {
        const id = crypto.randomUUID();
        const call = client.call('default', id);

        if(!call) throw new Error('failed to create call')
        

        if(!values.dateTime){
            toast({
                title: "Failed to create meeting, please select date and time",
            
            })
            return
        }
        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
        const description = values.description || 'instant meeting'

        await call.getOrCreate({
            data: {
                starts_at: startsAt,
                custom: {
                    description
                }
            }
        })
        setCallDetails(call);
        if(!values.description)
            router.push(`/meeting/${call.id}`)

        toast({
            title: "Meeting created",
        })
    } catch (error) {
        console.log(error)
        toast({
            title: "Failed to create meeting",
        })
    }
}

    return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
        <HomeCard 
            img='/icons/add-meeting.svg'
            title='New meeting'
            description='Instantly start a meeting'
            handleClick={()=> setMetingState('isInstantMeeting')}
            className='bg-orange-1'
        />
        <HomeCard 
            img='/icons/schedule.svg'
            title='Schedule meeting'
            description='Plan your meeting'
            handleClick={()=> setMetingState('isScheduleMeeting')}
            className='bg-blue-1'

        />
        <HomeCard 
            img='/icons/recordings.svg'
            title='View Recordings'
            description='Check out recorded meets'
            handleClick={()=> setMetingState('isJoiningMeeting')}
            className='bg-purple-1'

        />
        <HomeCard 
            img='/icons/add-meeting.svg'
            title='Join Meeting'
            description='Join via link'
            handleClick={()=> setMetingState('isJoiningMeeting')}
            className='bg-yellow-1'

        />
        <MeetingModal 
            isOpen={meetingState === 'isInstantMeeting'}
            onClose={()=> setMetingState(undefined)}
            title='Start an instant meeting'
            className='text-center'
            buttonText='Create a Meet Sphere'
            handleClick={createMeeting}
        />
    </section>
    )
}

export default MeetingTypeList