import React from 'react'
import 'material-icons/iconfont/material-icons.css'
import './Icon.scss'

type Props = {
	children: React.ReactNode
	style?: object
}

const Icon = (props: Props) => {
	return (
		<i className="material-icons-round" role="button" style={props.style}>
			{props.children}
		</i>
	)
}

export default Icon
