/* eslint-disable @typescript-eslint/no-unused-vars */
import React,{useState,FC,useRef,useEffect} from 'react'
import cn from "classnames"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
} from "body-scroll-lock"
import Data from '../../data/data'
import SearchBox from './search-box'

interface actionSearch {
    displaySearch:boolean,
    setDisplaySearch:Function,
    storage:any,
    setStorage:Function
}

const Search:FC<actionSearch> = ({setDisplaySearch,displaySearch,storage,setStorage}) => {
  
    const [inputSearch, setInputSearch] = useState<string>("")
   
    const handleChange = (e:React.ChangeEvent) => {
        const {value} = e.target as HTMLInputElement
        setInputSearch(value)
    }

    const handleSubmit = (e:React.SyntheticEvent) => {
        
        e.preventDefault()
        
        setStorage([...storage].filter((item) =>(
            item.task.includes(inputSearch)
        )))

        setTimeout(() => {
            setDisplaySearch(!displaySearch)
        }, 500);
    }

    const clearSearch = () => {
        setInputSearch('')
    }

    const searchBoxRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      
        if (searchBoxRef!.current) {
            if (displaySearch) {
                enableBodyScroll(searchBoxRef!.current)
            }
            else{
                disableBodyScroll(searchBoxRef!.current)
            }
        }

        
        return () => {
            clearAllBodyScrollLocks()
        }
    }, [displaySearch])

    return (
        <div ref={searchBoxRef}>
            <div 
                className={cn("overlay", {
					open: displaySearch,
				})}
				role="button"
				onClick={() => setDisplaySearch(!displaySearch)}
								
			
            />
            <div className={cn(
					"drawer-search relative hidden top-0 z-[1050] opacity-0 invisible transition duration-300 ease-in-out left-1/2 px-4 w-full lg:w-[730px] xl:w-full",
					{
						open: displaySearch,
					}
				)}>
                    <div className="w-full flex flex-col justify-center">
                        <div className="flex-shrink-0 mt-3.5 lg:mt-4 w-full">
                            <div className="flex flex-col mx-auto mb-1.5 w-full bg-white">
                                <SearchBox
                                    value={inputSearch}
                                    name="search"
                                    onChange={handleChange}
                                    onSubmit={handleSubmit}
                                    onClear={clearSearch}
                                    onClick={() => setDisplaySearch(!displaySearch)}
                                    ref={(input) => input && input.focus()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Search