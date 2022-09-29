import React from 'react'

type Props = {
	width: string
	children: React.ReactNode
}

export default (props: Props) => {
	return <th style={{ width: props.width }}>{props.children}</th>
}
