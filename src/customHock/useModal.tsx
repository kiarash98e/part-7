import {useState} from 'react'

const useModal = () => {
    const [modal, setmodal] = useState(false)
    const open = () => setmodal(true)
    const closeModal = () => setmodal(false)

    return {open,closeModal,modal}
}

export default useModal