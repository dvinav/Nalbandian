import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Icon from '../Icon/Icon'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import PascalCase from '../../utils/PascalCase'

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
				<Icon>{Icons[PascalCase(props.name) as keyof typeof Icons]}</Icon>
				{Strings.Header[PascalCase(props.name) as keyof typeof Icons]}
			</span>
		</div>
	)
}

export default TabSwitchBtn
