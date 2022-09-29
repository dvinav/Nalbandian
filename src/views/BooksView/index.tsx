import * as React from 'react'
import ViewLayout from '@layouts/ViewLayout'
import Strings from '@res/strings'
import { Book, ViewStates } from '@utils/types'
import { View } from '@utils/interfaces'
import { FormInputs, TableHead } from './components'
import { GetOne } from '@utils/api'

class BooksView extends React.Component<{}, ViewStates> implements View {
	constructor(props: {}) {
		super(props)
		this.state = {
			infoModal: {
				show: false,
				data: this.fetchInfoData(),
			},
		}
	}

	fetchInfoData(id?: string): Book {
		if (id)
			GetOne(id, 3).then((res) => {
				return res[0]!
			})
		return {
			title: '-',
			author: '-',
			subtitle: '-',
			bookCode: '-',
			language: '-',
			publishDate: '-',
			ISBN: '-',
			ebook: '-',
			translator: '-',
			publishLocation: '-',
			publishing: '-',
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
				name="books"
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

export default BooksView
