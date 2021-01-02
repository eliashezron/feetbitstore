import React, {useState} from 'react'
// import {IconButton} from '@material-ui/core'
import {SearchOutlined} from '@material-ui/icons'
import {  Form} from 'react-bootstrap'
import './SearchBox.css'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        
        <Form onSubmit={submitHandler} className='searchiconButton'>
            <SearchOutlined className='button' />
            <Form.Control type='text' name='q' onChange={(e)=>
            setKeyword(e.target.value) }
            placeholder='search Products...'
            classname='mr-sm-2 ml-sm-5'
            className='search-input'>
            </Form.Control>
        </Form>
        
    )
}

export default SearchBox
// {/* <i class="fas fa-search"></i> */}
//             {/* <Button type='submit' variant='outline-primary' className='p-2'>
//                 Search
//             </Button> */}