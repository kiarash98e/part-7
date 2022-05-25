import React from 'react'
import Divider from '../ui/divider'

const DeleteTask:React.FC<any> = ({closeModalOpen,deleteTaskById,deleteItem}) => {

    return (
        <div className='flex flex-col py-4'>
            <div>
                <h1 className='text-heading py-2'>Are you sure delete Task ???</h1>
                <Divider/>
            </div>
            <div className='flext w-full justify-between px-2 md:px-12'>
                <button type='button' onClick={() => {
                    deleteTaskById(deleteItem?.id)
                    closeModalOpen()
                }} className='block rounded-md bg-white text-purple-700 font-bold w-full h-20 text-center my-5 ease-in-out duration-300 hover:bg-gray-300 hover:text-purple-500'>yes</button>
                <button type='button' onClick={closeModalOpen} className='block rounded-md bg-purple-500 text-gray-100 font-bold w-full h-20 text-center my-5 ease-in-out duration-300 hover:bg-purple-200 hover:text-purple-600'>no</button>
   
            </div>
        </div>
    )
}

export default DeleteTask
