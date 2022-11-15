import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = () => {
  const options = {
    onOpen: props => console.log(props.foo),
    onClose: props => console.log(props.foo),
    autoClose: 6000,
    // closeButton: FontAwesomeCloseButton,
    // type: toast.TYPE.INFO,
    hideProgressBar: false,
    position: toast.POSITION.TOP_LEFT,
    pauseOnHover: true,
    // transition: MyCustomTransition,
    // progress: 0.2
    // and so on ...
};
  const notify = () => toast.error('🦄 Wow so easy!', options
    );

  return (
    <div>Tostify
      <button onClick={notify}>Notify!</button>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </div>
  )
}

export default Toastify