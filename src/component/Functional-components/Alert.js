import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const Fire = () => {
    // MySwal.fire(
    //     // 'The Internet?',
    //     // 'That thing is still around?',
    //     // 'question',
    //     {
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Something went wrong!',
    //         footer: '<a href="">Why do I have this issue?</a>',
    //         //title: <p>Hello World</p>,
    //         didOpen: () => {
    //             // `MySwal` is a subclass of `Swal` with all the same instance & static methods
    //             MySwal.showLoading()
    //         },

    //     }).then(() => {
    //         return MySwal.fire(<p>Shorthand works too</p>)
    //     })

        MySwal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
}

const Alert = () => {
    return (
        <div>
            <button onClick={Fire}>Alert</button>
        </div>
    )
}

export default Alert