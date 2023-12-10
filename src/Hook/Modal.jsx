
import { useModal } from "./useModal";
const Modal = (children) =>{
const [isOpenModal1,openModal1,closeModal1]=useModal();

return ({children});

} 

export default Modal;