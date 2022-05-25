import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import Divider from '../ui/divider'

interface IFilter {
    onClose: any,
    filterItem: any,
    setFilterItem: any,
    storage: any,
    setStorage: any
}



const FilterBox: React.FC<IFilter> = ({ onClose, filterItem, setFilterItem, storage, setStorage }) => {

    React.useEffect(() => {
        
    }, [filterItem])
    const handleChange = (e: any) => {
        console.log(e.target.value)
        setFilterItem({
            ...filterItem,
            [e.target.name]: e.target.value 
        })
        setStorage(storage.filter((item:any) => (
            item?.status === e.target.value || item?.priority === e.target.value
        )));
    }

   
    return (
        <>
            <div className="w-full h-full flex px-2 md:px-2">
                <div className="flex w-full h-full flex-col bg-white py-6 px-2">
                    <div className="w-full flex items-center justify-between">
                        <h4 className='text-base md:text-lg xl:text-xl text-heading'>Filters</h4>
                        <button
                            onClick={onClose}
                            type="button"
                            className="outline-none text-2xl md:text-3xl w-12 md:w-14 h-full flex items-center justify-center hover:text-heading focus:outline-none"

                        >
                            <IoCloseOutline size={26} className="text-heading " />
                        </button>
                    </div>
                    <div className="w-full pt-3">
                        <Divider />
                    </div>
                    <div className="my-4">
                        <form
                            noValidate
                        >

                            <div className="mb-3 bg-white flex flex-col">
                                <div className="flex flex-col my-4">
                                    <label htmlFor="priority">Priority</label>
                                    <select name="priority"
                                        onChange={handleChange}
                                        value={filterItem?.priority}
                                    >
                                        <option value={"low"}>Low</option>
                                        <option value={"medium"}>Medium</option>
                                        <option value={"high"}>High</option>
                                        <option value={"priority"}>Priority</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="status">Status</label>
                                    <select name="status"
                                        onChange={handleChange}
                                        value={filterItem?.status}
                                    >
                                        <option value={"todo"}>Todo</option>
                                        <option value={"doing"}>Doing</option>
                                        <option value={"done"}>Done</option>
                                        <option value={"status"}>Status</option>
                                    </select>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterBox