import React from 'react'

type Props = {
	children: React.ReactNode
	scrollShadow: boolean
}

const TableHead = (props: Props) => {
	return (
		<thead>
			<tr className={props.scrollShadow ? 'thS' : ''}>{props.children}</tr>
		</thead>
	)
}

export default TableHead
