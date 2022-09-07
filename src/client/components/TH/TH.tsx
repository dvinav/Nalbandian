import React from 'react'

type Props = {
	width: string
	children: React.ReactNode
}

const TH = (props: Props) => {
	return <th style={{ width: props.width }}>{props.children}</th>
}

export default TH
