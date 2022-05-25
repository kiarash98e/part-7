/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import useModal from '../../../customHock/useModal'
import DeleteTask from '../../deleteTask/deleteTask'
import EditTask from '../../editTask/editTask'
import ManagedModal from '../../modal/fcModal'

import EnhancedTable from '../../rcTable/rcTable'


const main:React.FC<any> = ({storage,setViwe,setdeleteItem,deleteItem,deleteTaskById,modalViwe,editTaskId}) => {
   const { open,closeModal,modal } = useModal()
   const openDelete = () => {
       open()

   }
    return (
        <main 
            className="relative flex-grow"
            style={{
            minHeight: "-webkit-fill-available",
            WebkitOverflowScrolling: "touch",
        }}
        >
            <EnhancedTable data={storage} openDelete={openDelete} setViwe={setViwe} setdeleteItem={setdeleteItem}/>
            {modal ? <ManagedModal  modal={modal} onClose={closeModal} elemnt={
            <>
                 {modalViwe === "delete" ? <DeleteTask closeModalOpen={closeModal} deleteTaskById={deleteTaskById} deleteItem={deleteItem}/>:null}    
                 {modalViwe === "edit" ? <EditTask closeModal={closeModal} editTaskId={editTaskId} filters={deleteItem} setFilters={setdeleteItem}/>:null}    
            </>
            }/> : null}
        </main>
    )
}

export default main
