import React from 'react'
import 'material-icons/iconfont/material-icons.css'
import './Icon.scss'

const Icon = (props: any) => {
    return (
        <i className="material-icons-round" role="button">
            {props.children}
        </i>
    )
}

export default Icon
