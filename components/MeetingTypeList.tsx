import React, { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'

const MeetingTypeList = () => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [meetingState, setMetingState] = useState<'isJoiningMeeting'|'isScheduleMeeting'|'isInstantMeeting' | undefined>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link:'',
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
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
        {!callDetails ? (
                <MeetingModal 
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={()=> setMetingState(undefined)}
                    title='Schedule a Meet Sphere'
                    className='text-center'
                    handleClick={createMeeting}

                >
                    <div className='flex flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] tex-sky-2'>
                            Add a description
                        </label>
                        <Textarea className='bg-dark-3 border-none text-normal focus-visible:ring-0 focus-visible:ring-offset-0'
                        onChange={(e) => {
                            setValues({...values, description: e.target.value})
                        }}
                        />

                    </div>
                    <div className='flex w-full flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] tex-sky-2'>
                            Select date and time
                        </label>
                        <ReactDatePicker selected={values.dateTime} onChange={(date) => setValues({...values, dateTime: date!})} showTimeSelect timeFormat='HH:mm' timeIntervals={15} timeCaption='time' dateFormat='d MMMM, yyyy HH:mm' className='w-full rounded bg-dark-3 p-2 focus:outline-none' />
                    </div>
                </MeetingModal>
        ) : (
            <MeetingModal 
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={()=> setMetingState(undefined)}
                title='Meeting created'
                className='text-center'
                handleClick={() => {
                    navigator.clipboard.writeText(meetingLink)
                    toast({ title: 'Sphere link copied'})
                }}
                image='/icons/checked.svg'
                buttonIcon='/icons/copy.svg'
                buttonText='Copy Sphere Link'
            />
        )}
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