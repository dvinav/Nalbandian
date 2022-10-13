import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from 'components/Icon'
import styles from 'styles/header.module.sass'
import { getIcon, getString } from 'utils/get'

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
			className={styles.tabButton}
			style={props.activeTab == props.tab ? { color: 'var(--bs-primary)', fontWeight: 'bold' } : {}}
		>
			<span>
				<Icon>{getIcon(props.name)}</Icon>
				{getString(props.name)}
			</span>
		</div>
	)
}

export default TabSwitchBtn
