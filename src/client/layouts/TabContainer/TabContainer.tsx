import React from 'react'
import './TabContainer.scss'

const TabContainer = (props: { children: React.ReactNode }) => {
	return <div className="tabContainer">{props.children}</div>
}

export default TabContainer
