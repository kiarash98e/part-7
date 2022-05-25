/* eslint-disable no-useless-computed-key */
import React, { Fragment, SelectHTMLAttributes } from 'react'
import { Listbox, Transition } from '@headlessui/react'

export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent) => void;
    data?: any;
    setFilters:Function,
    filters:any,
}

const Select: React.FC<Props> = ({ name,data,setFilters,filters,value }) => {

    const [select, setSelect] = React.useState<any>(value)
   
    const handleChang = (e:any) => {
         setSelect(e.name)
         setFilters({
             ...filters,
             [`${name}`]:e.name
         })
        
         
      
    }
     return (
        <div className="h-52 w-60">
            <label htmlFor={name} className="text-heading pl-2 text-base py-2">{name}</label>
            <Listbox value={select}  onChange={handleChang} name={name}>
                <div className="relative h-full">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-150 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{select}</span>

                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute px-1 max-h-full w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {data && data.map((person:any, personIdx:any) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-6 pr-4 ${active ? 'bg-purple-600 text-purple-200' : 'text-gray-900'
                                        }`
                                    }
                                
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person?.name}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default Select