/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Drawer from 'rc-drawer'
import { IoFilterCircleSharp } from 'react-icons/io5'
import FilterBox from '../filterItem/filterBox'



const drawer: React.FC<any> = ({ filterItem,setFilterItem,storage,setStorage }) => {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)

    const onTouchEnd = () => {
        setOpenDrawer(false)
    }

    const onTouchStart = () => {
        setOpenDrawer((bool) => !bool)
    }

	

    return (
        <>
            <Drawer
                level={null}
                handler={false}
                open={openDrawer}
                onClose={onTouchEnd}
                width={335}
                className="right-0"
                placement={"right"}
                contentWrapperStyle={{
                    right:'0',
                    background:"#f8f8f8"
                }}
                
            >
               <FilterBox onClose={onTouchEnd} storage={storage} setStorage={setStorage} filterItem={filterItem} setFilterItem={setFilterItem}/>
            </Drawer>
            <button
                className="flex mb-[5px] px-2 items-center justify-center flex-shrink-0 p-0 h-auto relative focus:outline-none transform"
                onClick={onTouchStart}
                aria-label="search-button"
            >
                <IoFilterCircleSharp size={30} />
            </button>
        </>

    )
}

export default drawer