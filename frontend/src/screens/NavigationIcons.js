import React from 'react'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import { Link } from 'react-router-dom';
import './NavigationIcons.css'

function NavigationIcons() {
    return (
        <div>
             <nav>
                <ul>
                <Link to ='/'>
                <li className="active">
                    <HomeOutlinedIcon/>
                    <p>Home</p>
                </li>
                </Link>
                <Link to ='/'>
                <li>
                    <SearchOutlinedIcon/>
                    <p>search</p>
                </li>
                </Link>
                <Link to='/cart'>
                <li>
                    <AddShoppingCartOutlinedIcon/>
                    <p>Cart</p>
                </li>
                </Link>
                <Link to='/profile'>
                <li>
                    <PersonOutlineOutlinedIcon/>
                    <p>Account</p>
                </li>
                </Link>
                <Link to='/aboutus'>
                <li>
                    <SupervisorAccountOutlinedIcon/>
                    <p>About Us</p>
                </li>
                </Link>
                </ul>
      </nav>
        </div>
    )
}

export default NavigationIcons
