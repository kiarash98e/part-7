/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import data, { ITask } from '../../data/data'
import Header from '../layout/header/header'
import Main from '../layout/main/main'
import useModal from '../../customHock/useModal'

type ModalViwe = "add" | "edit" | "delete"

const layout:React.FC = () => {

    const [modalViwe,setModalViwe]  = useState<ModalViwe>("add")

    const {closeModal} = useModal()

    const [displaySearch, setDisplaySearch] = useState<boolean>(false)

    const [filters,setFilters] = React.useState({
        task: "",
        status: "status",
        priority: "priority",
        deadline: new Date(),
        
    })

    const [filterItem, setFilterItem] = useState<any>({
        status: "status",
        priority: "priority",
    })

    const [storage,setStorge] = useState<any[]>(data ?? [])

    const addTask = (formVal:any) => {
        let id:number = storage.length + 1
        
        setStorge([...storage,
        {...formVal,id}])

        setTimeout(() => {
            
            setFilters({
                task: "",
                status: "status",
                priority: "priority",
                deadline: new Date(),
                
            })
            closeModal()
        }, 500);
    }
   
    
    const deleteTaskById = (id:number) => {
        setStorge([...storage].filter((item) => {
            return item.id !== id
        }))
    }

   const setViwe = (e:ModalViwe) => {
       return setModalViwe(e)
   } 

   const editTaskId = (id:number,data:ITask) => {
       setStorge([...storage].map((item) =>(
           item.id === id ? {...data} : item
       )))
   }
   const [deleteItem, setdeleteItem] = useState({})
   
    return (
        <div className='flex flex-col min-h-screen bg-gray-600'>
            <Header storage={storage} filterItem={filterItem} setFilterItem={setFilterItem} setStorage={setStorge} setModalViwe={setModalViwe} addTask={addTask}  modalViwe={modalViwe} filters={filters} setFilters={setFilters} displaySearch={displaySearch} setDisplaySearch={setDisplaySearch}/>
            <Main editTaskId={editTaskId} storage={storage} setdeleteItem={setdeleteItem} modalViwe={modalViwe} deleteItem={deleteItem} deleteTaskById={deleteTaskById} setViwe={setViwe} />
        </div>
    )
}

export default layout