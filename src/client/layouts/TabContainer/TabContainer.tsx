import React from 'react'
import './TabContainer.scss'

const TabContainer = (props: { children: React.ReactNode; onClick: React.MouseEventHandler }) => {
	return (
		<div className="tabContainer" onClick={props.onClick}>
			{props.children}
		</div>
	)
}

export default TabContainer
