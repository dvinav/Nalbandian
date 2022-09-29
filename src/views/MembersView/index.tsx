import * as React from 'react'
import ViewLayout from '@layouts/ViewLayout'
import { GetOne } from '@utils/api'
import { FormInputs, TableHead } from './components'
import Strings from '@res/strings'
import { Member, ViewStates } from '@utils/types'
import { View } from '@utils/interfaces'

class MembersView extends React.Component<{}, ViewStates> implements View {
	constructor(props: {}) {
		super(props)
		this.state = {
			infoModal: {
				show: false,
				data: this.fetchInfoData(),
			},
		}
	}

	fetchInfoData(id?: string): Member {
		if (id)
			GetOne(id, 2).then((res) => {
				return res[0]!
			})
		return {
			address: '-',
			name: '-',
			surname: '-',
			birthdate: '-',
			phone: '-',
			home: '-',
			memberCode: '-',
			picture: '',
		}
	}

	openInfoModal(id: string): void {
		this.setState({ infoModal: { data: this.fetchInfoData(id), show: true } })
	}

	resetInfoModal(): void {
		this.setState({ infoModal: { show: false, data: this.fetchInfoData() } })
	}

	render() {
		return (
			<ViewLayout
				name="members"
				formInputs={FormInputs}
				tableHead={TableHead}
				infoModalContent={<></>}
				infoModalTitle={Strings.bookInfo}
				onRowClick={(id: string) => this.openInfoModal(id)}
				onInfoModalClose={this.resetInfoModal}
				onRowDelete={this.resetInfoModal}
				imShow={this.state.infoModal.show}
			/>
		)
	}
}

export default MembersView
