import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation="grow">
            <span className='sr-only'>Loading</span>
        </Spinner>
    )
}

export default Loader
