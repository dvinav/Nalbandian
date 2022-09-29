import React from 'react'
import './index.css'

const TabContainer = (props: { children: React.ReactNode; onClick: React.MouseEventHandler }) => {
	return (
		<div className="tabContainer" onClick={props.onClick}>
			{props.children}
		</div>
	)
}

export default TabContainer
