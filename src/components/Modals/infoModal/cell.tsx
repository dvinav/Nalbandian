import Icon from 'components/Icon'
import { getString, getIcon } from 'utils/get'
import * as React from 'react'
import { CollectionNames } from 'types/general'

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
					<Icon>{getIcon(props.name)}</Icon>
					<b>{getString(props.name) + ': '}</b>
					{props.text != '' ? (
						<a target="blank" href={props.text}>
							{props.text}
							<Icon style={{ marginLeft: '10px' }}>{getIcon('openInNew')}</Icon>
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
				<Icon>{getIcon(props.name)}</Icon>
				<b>{getString(props.name) + ': '}</b>
				{props.text != '' ? props.text : '-'}
			</span>
		</td>
	)
}

export default CC
