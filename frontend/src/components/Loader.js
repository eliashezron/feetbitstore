import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner
        //  animation = 'border' 
        //  role = 'status'
        //  style = {{
        //      width: '100px',
        //      height:'100px',
        //      margin:'auto',
        //      display:'block',
        //  }}

         >
         <i class="fa fa-spinner fa-pulse fa-3x fa-fw fa-align-center" aria-hidden="true"></i>
            <span className = 'sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader
