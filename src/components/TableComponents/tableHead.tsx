import React from 'react'

type Props = {
	children: React.ReactNode
	scrollShadow: boolean
}

export default (props: Props) => {
	return (
		<thead>
			<tr className={props.scrollShadow ? 'thS' : ''}>{props.children}</tr>
		</thead>
	)
}
