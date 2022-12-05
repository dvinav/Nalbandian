import TabButton from 'components/TabButton'
import Icon from 'components/Icon'
import Icons from 'res/icons'
import React from 'react'
import styles from 'styles/header.module.sass'

type Props = {
	currentTab: number
	formToggle: React.MouseEventHandler
	formState: boolean
	show: Boolean
}

const Header = (p: Props) => {
	const [tab, switchTab] = React.useState(p.currentTab)

	return (
		<header className={styles.header} style={!p.show ? { display: 'none' } : {}}>
			<div className={styles.left}>
				<button className={styles.formToggle} onClick={p.formToggle}>
					{p.formState ? <Icon>{Icons.formActive}</Icon> : <Icon>{Icons.formHidden}</Icon>}
				</button>
			</div>
			<div className={styles.center}>
				<TabButton name="borrowed" tab={1} activeTab={tab} switchFunction={() => switchTab(1)} />
				<TabButton name="members" tab={2} activeTab={tab} switchFunction={() => switchTab(2)} />
				<TabButton name="books" tab={3} activeTab={tab} switchFunction={() => switchTab(3)} />
				<div
					style={{
						marginLeft: `${5 + 23.333 * (tab - 1) + [0, 2, 4][tab - 1] * 5}%`,
					}}
					className={styles.indicator}
				></div>
			</div>
			<div />
		</header>
	)
}

export default Header
