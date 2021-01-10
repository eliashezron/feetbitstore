import React from 'react'
import {Helmet} from "react-helmet"

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'FeetBit Online Store',
    description: 'we sell the best snickers at the cheapest prices',
    keywords:'snickers, buy snickers, trainers',


}

export default Meta
