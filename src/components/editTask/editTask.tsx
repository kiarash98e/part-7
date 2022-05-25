import { DatePicker } from 'jalali-react-datepicker'
import React from 'react'
import Input from '../ui/input'
import Select from '../ui/select'
import Title from '../ui/title'



const status = [
    {name:'status'},
    {name:'todo'},
    {name:'done'},
    {name:'doing'},
]



const priority = [
    {name:"priority"},
    {name:"low"},
    {name:"high"},
    {name:"medium"},
] 

const EditTask:React.FC<any> = ({filters,setFilters,editTaskId,closeModal}) => {

    const handleSubmit = (e:React.FormEvent) => {
        const { value, name } = e.target as HTMLInputElement

        setFilters({
            ...filters,
            [name]:value,
            
        })   
    }
    
    const handleDateChange = (e: any) => {
        setFilters({
          ...filters,
          ["deadline"!]: e.value._d,
        })
      }
    
    const editUser = () => {
        editTaskId(filters?.id,filters)
        setTimeout(() => {
            closeModal()
        }, 150);
    }


    return (
        <form 
        noValidate
    >
        <div className="mb-3 py-4">
            <Title title='Edit Task'/>
        </div>
        <div className="mb-3">
            <Input 
                label='Task'
                name='task'
                value={filters?.task}
                placeHolder='add task ...'
                type='text'
                onChange={handleSubmit}
                //defaultValue={filters?.task}
            />
        </div>
        <div className="mb-3 bg-white flex flex-col md:flex-row">
            <Select 
                data={status} 
                filters={filters} 
                name="status" 
                value={filters['status']} 
                setFilters={setFilters} 
            />   
             <Select 
                data={priority} 
                filters={filters} 
                name="priority" 
                value={filters['priority']} 
                setFilters={setFilters} 
                
            />   
        </div>
        <div className='my-3'>
            <DatePicker
                className="w-full cursor-pointer h-12"
                timePicker={false}
                value={filters['deadline']}
                onClickSubmitButton={handleDateChange}
                
            />     
        </div>
     <button type='button' onClick={editUser} className='block rounded-md bg-purple-600 text-purple-200 font-bold w-full h-20 text-center my-5 ease-in-out duration-300 hover:bg-white hover:text-purple-600'>save</button>
    </form>
    )
}

export default EditTask
