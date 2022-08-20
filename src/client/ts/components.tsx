import React, { useEffect, useRef } from 'react'
import Strings from '../json/strings.json'
import Icons from '../json/icons.json'
import { UI } from './ui'
import { render } from 'sass'
/*import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'*/

export namespace Components
{
	export const Icon = (props: any) => {
		return <i className="material-icons-round" role="button">{ props.name }</i>
	}

	const TabButton = (props: any) => { // @ts-ignore
		return <div onClick={() => UI.Tabs.Switch(props.tab)} className="tabButton" data-tab={props.tab}><span><Icon name={Icons[props.name]} />{Strings.Header[props.name]}</span></div>
	}

	export class Header extends React.Component {
		// useEffect(() => UI.Tabs.Switch(UI.Tabs.Active))

		componentDidMount() { UI.Tabs.Switch(UI.Tabs.Active) }
		
		render() {	
			return (
					<header>
						<div className="headerLeft"><span>{Strings.Header.Title}</span></div>
						<div className="headerCenter">
							<TabButton tab="1" name="Borrowed" />
							<TabButton tab="2" name="Members" />
							<TabButton tab="3" name="Books" />
							<div id="tabIndicator"></div>
						</div>
						<div className="headerRight">
							<button className="headerExitButton"><Icon name={Icons.Exit} /></button>
						</div>
					</header >)
		}
	}
		
}