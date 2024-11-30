import React, { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'


const MeetingTypeList = () => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [meetingState, setMetingState] = useState<'isJoiningMeeting'|'isScheduleMeeting'|'isInstantMeeting' | undefined>()
const createMeeting = () => {};

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