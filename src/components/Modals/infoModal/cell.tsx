import Icon from '@components/Icon'
import Icons from '@res/icons'
import Strings from '@res/strings'
import * as React from 'react'

type CCProps = {
	name: string
	text: string
	span?: number
	link?: true
}

const CC = (props: CCProps) => {
	if (props.link)
		return (
			<td colSpan={props.span ?? 1}>
				<span title={typeof props.text == 'string' ? String(props.text) : '-'}>
					<Icon>{Icons[props.name]}</Icon>
					<b>{Strings[props.name] + ': '}</b>
					{props.text != '' ? (
						<a target="blank" href={props.text}>
							{props.text}
							<Icon style={{ marginLeft: '10px' }}>{Icons.openInNew}</Icon>
						</a>
					) : (
						'-'
					)}
				</span>
			</td>
		)

	return (
		<td colSpan={props.span ?? 1}>
			<span title={typeof props.text == 'string' ? String(props.text) : '-'}>
				<Icon>{Icons[props.name]}</Icon>
				<b>{Strings[props.name] + ': '}</b>
				{props.text != '' ? props.text : '-'}
			</span>
		</td>
	)
}

export default CC
