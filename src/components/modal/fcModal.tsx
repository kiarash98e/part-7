import React from 'react'
import Modal from "./modal"
interface Mod {
    modal:boolean,
    elemnt: JSX.Element,
    onClose:any
}
const ManagedModal: React.FC <Mod> = ({modal,elemnt,onClose}) => {
   
    return (
		<>
            {modal ? <Modal open={modal} onClose={onClose}>
                {elemnt}
            </Modal>:null}
        </>
	);
};

export default ManagedModal;
