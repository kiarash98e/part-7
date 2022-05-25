import React from 'react'
import Select from '../ui/select'
import Title from '../ui/title'
import Input from '../ui/input'
import { DatePicker } from "jalali-react-datepicker";



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



const AddTask:React.FC<any> = ({filters,setFilters,addTask,closeModalOpen}) => {

    
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
    
    const addUser = () => {
        addTask(filters)
        setTimeout(() => {
            closeModalOpen()
        }, 500);
        
    }
    
  return (
    <form 
        noValidate
    >
        <div className="mb-3 py-4">
            <Title title='New Task'/>
        </div>
        <div className="mb-3">
            <Input 
                label='Task'
                name='task'
                value={filters?.task}
                placeHolder='add task ...'
                type='text'
                onChange={handleSubmit}
            />
        </div>
        <div className="mb-3 bg-white flex flex-col md:flex-row">
            <Select 
                data={status} 
                filters={filters} 
                name="status" 
                value={filters.status} 
                setFilters={setFilters} 
            />   
             <Select 
                data={priority} 
                filters={filters} 
                name="priority" 
                value={filters.priority} 
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
     <button type='button' onClick={addUser} className='block rounded-md bg-purple-600 text-purple-200 font-bold w-full h-20 text-center my-5 ease-in-out duration-300 hover:bg-white hover:text-purple-600'>save</button>
    </form>
  )
}

export default AddTask