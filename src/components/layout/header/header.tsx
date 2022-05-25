/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react'
import { IoAddCircleSharp, IoSearchOutline } from 'react-icons/io5'
import Logo from '../../logo/logo'
import Search from '../../search/search'
import DrawerBox from '../../drawer/drawer'
import useModal from '../../../customHock/useModal'
import ManagedModal from '../../modal/fcModal'
import AddTask from '../../addTask/addTask'


const header:React.FC<any> = ({
    filters,
    setFilters,
    displaySearch,
    setDisplaySearch,
    addTask,
    modalViwe,
    setModalViwe,
    storage,
    setStorage,
    filterItem,
    setFilterItem
}) => {

    const { open , modal , closeModal} = useModal()
    const onOpernSearch = () => setDisplaySearch(true)
    
    const addModalOpen = () => {
        setModalViwe("add")
        open()
    }

    const closeModalOpen = () => {
        closeModal()
    }



    return (
        <>
            <header className=' h-16 sm:h-20 lg:h-24 w-full relative z-[1000]'>
                <div className="innerSticky lg:w-full text-white body-font fixed bg-green w-full h-16 sm:h-20 lg:h-24 z-20 ps-2 md:ps-0 lg:ps-16 pe-2 lg:pe-6">
                    <div className="flex items-center justify-between mx-auto px-3 max-w-[1920px] h-full w-full">
                        <div className='flex'>
                            <Logo title={"My ToDo List"} />
                        </div>
                        <div className="flex px-0 md:px-4">
                            <button
                                className="flex mb-[5px] px-2 items-center justify-center flex-shrink-0 p-0 h-auto relative focus:outline-none transform"
                                onClick={onOpernSearch}
                                aria-label="search-button"
                                >
                                <IoSearchOutline size={30} />
                            </button>
                            <DrawerBox storage={storage} setStorage={setStorage} filterItem={filterItem} setFilterItem={setFilterItem} />
                            <button
                                className="flex mb-[5px] px-2 items-center justify-center flex-shrink-0 p-0 h-auto relative focus:outline-none transform"
                                onClick={addModalOpen}
                                aria-label="search-button"
                                >
                                <IoAddCircleSharp size={30} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {displaySearch ? <Search storage={storage} setStorage={setStorage} setDisplaySearch={setDisplaySearch} displaySearch={displaySearch}/>:null}
            {modal ? <ManagedModal modal={modal} onClose={closeModalOpen} elemnt={
            <>
                {modalViwe === "add" ? <AddTask filters={filters} setFilters={setFilters} closeModalOpen={closeModalOpen} addTask={addTask}/>
                : null}</>
            }/> : null}
        </>
    )
}

export default header
 