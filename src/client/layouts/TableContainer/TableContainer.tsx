import React from 'react'
import SearchBox from '../../components/SearchBox/SearchBox'
import './TableContainer.scss'

const TableContainer = (props: any) => {
	return (
		<div className="tableContainer">
			<SearchBox />
			{props.children}
		</div>
	)
}

export default TableContainer
