import React, { useEffect, useState } from 'react'
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import './DarkMode.css'

const DarkMode =()=>{

const [mode, setMode] = useState(()=> localStorage.getItem('mode'))

useEffect(()=>{
    window.addEventListener('storage', setPreferedTheme)
    return()=>{
        window.removeEventListener('storage', setPreferedTheme)
    }
},[])

const setPreferedTheme=()=>{
    const _mode = localStorage.getitem('mode')
    if(_mode){
        setMode(_mode)
    }else{
        setMode('light')
    }
}

useEffect(()=>{
    if(mode === 'dark'){
        document.body.classList.add('dark-mode')
        localStorage.setItem('mode', 'dark')
    }else{
        document.body.classList.remove('dark-mode')
        localStorage.setItem('mode', 'light')
    }
},[mode])

    return (
            <a href='' className='cursor-pointer'
            onClick={()=> setMode(mode =>(mode === 'dark' ? 'light': 'dark'))
            }>
                {mode==='dark'? <ToggleOnIcon className='icon'/> :<ToggleOffIcon className='icon-x'/> }
            </a>
    )
}

export default DarkMode


// import React from 'react'
// import'./DarkMode.css'
// const DarkMode=()=>{
//     return (
//         <div>
//             <label className='switch'>
//                 <input type='checkbox'/>
//                 <span className='slider'/>
//             </label>
            
//         </div>
//     )
// }

// export default DarkMode


// import React, { useState } from 'react'
// import styled, { ThemeProvider } from 'styled-components'
// import { darkTheme, lightTheme, GlobalStyles } from './Themes'

// const DarkMode= ()=>{
//     const styledApp = styled.div`
//     color: ${props=>props.theme.fontColor}`
//     const [theme, setTheme]= useState('dark')

//    const themeToggler=()=>{
//         theme === 'light' ? setTheme('dark'): setTheme('light')
//         console.log(theme)
//     }
//     return (
//         <ThemeProvider theme= {theme ==='light' ? darkTheme : lightTheme}>
//             <GlobalStyles/>
//             <styledApp>
//                 <button onClick={()=>themeToggler()}>change</button>
//             </styledApp>
//         </ThemeProvider>
//     )
// }

// export default DarkMode

