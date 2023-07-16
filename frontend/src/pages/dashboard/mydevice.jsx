import React from 'react'
import { Divider } from 'primereact/divider';
        
const MyDeviceStatus = () => {
  return (
    <div className='w-full xl:px-52 px-14 py-40'>
        <div>
        <p>Pending Repair</p>
        <Divider />
        <p>Repair item: </p>
        <br/>
        <div className='grid grid-cols-1 gap-10 xl:grid-cols-12'>
            <div className='xl:col-span-4'>
                InvoviceId:
            </div>
            <div className='xl:col-span-4'>
                Repair Status:
            </div>
            <div className='xl:col-span-4'>
                Received Date:
            </div>
        </div>
        <br/>
        <div className='grid grid-cols-1 gap-10 xl:grid-cols-12'>
            <div className='xl:col-span-4'>
                Problem:
            </div>
            <div className='xl:col-span-4'>
                Last Update:
            </div>
            <div className='xl:col-span-4'>
                Comment:
            </div>
        </div>
        <br/>
        <div className='grid grid-cols-1 gap-10 xl:grid-cols-12'>
            <div className='xl:col-span-4'>
                Repair Cost Approved:
            </div>
           
        </div>
        </div>
    </div>
  )
}

export default MyDeviceStatus