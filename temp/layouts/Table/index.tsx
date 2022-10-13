import React from 'react'
import styles from '@styles/modules/table.module.sass'

type Props = {
	children: React.ReactNode
	onScroll: Function
}

const TableContainer = React.forwardRef<HTMLDivElement, Props>((props: Props, ref) => (
	<div className={styles.tableContainer} onScroll={() => props.onScroll()} ref={ref}>
		{props.children}
	</div>
))

export default TableContainer
