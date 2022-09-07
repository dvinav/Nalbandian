import React, { useEffect, useState } from 'react'
import './TableContainer.scss'

type Props = {
	children: React.ReactNode
	onScroll: Function
}

const TableContainer = React.forwardRef<HTMLDivElement, Props>((props: Props, ref) => (
	<div className="tableContainer" onScroll={() => props.onScroll()} ref={ref}>
		{props.children}
	</div>
))

export default TableContainer
