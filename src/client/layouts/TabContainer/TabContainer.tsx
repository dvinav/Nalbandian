import React from 'react'
import './TabContainer.scss'

const TabContainer = (props: any) => {
    return (
        <div
            className={
                'tabContainer ' +
                (props.activeTab == props.tab ? 'activeTabContainer' : '')
            }
        >
            {props.children}
        </div>
    )
}

export default TabContainer
