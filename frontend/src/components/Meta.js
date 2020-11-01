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
    title: 'Bartender Online Store',
    description: 'We sell the best liquor for the cheapest prices',
    keywords:'liquor, beer, alcohol, wine, spirit, brandy',

}

export default Meta
