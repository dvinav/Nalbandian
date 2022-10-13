import React from 'react'
import styles from 'styles/icons.module.sass'

type Props = {
	children: React.ReactNode
	style?: object
}

const Icon = (props: Props) => {
	return (
		<i className={'material-icons-round ' + styles.icon} role="button" style={props.style}>
			{props.children}
		</i>
	)
}

export default Icon
