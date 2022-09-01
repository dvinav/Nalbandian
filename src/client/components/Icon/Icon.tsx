import React from 'react'
import 'material-icons/iconfont/material-icons.css'
import './Icon.scss'

type Props = {
	children: React.ReactNode
}

const Icon = (props: Props) => {
	return (
		<i className="material-icons-round" role="button">
			{props.children}
		</i>
	)
}

export default Icon
