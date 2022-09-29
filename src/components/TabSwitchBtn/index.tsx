import Icon from '@components/Icon'
import Icons from '@res/icons'
import Strings from '@res/strings'
import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

type Props = {
	name: string
	activeTab: number
	tab: number
	switchFunction: Function
}

const TabSwitchBtn = (props: Props) => {
	const navigate = useNavigate()
	return (
		<div
			onClick={() => {
				props.switchFunction()
				navigate('/' + props.name)
			}}
			className="tabButton"
			style={props.activeTab == props.tab ? { color: 'var(--bs-primary)', fontWeight: 'bold' } : {}}
		>
			<span>
				<Icon>{Icons[props.name]}</Icon>
				{Strings[props.name]}
			</span>
		</div>
	)
}

export default TabSwitchBtn
