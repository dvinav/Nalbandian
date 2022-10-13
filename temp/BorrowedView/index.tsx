import * as React from 'react'
import ViewLayout from '@layouts/ViewLayout'
import { FormInputs, Info, TableHead } from './components'
import { InfoModal } from '@components/Modals'
import Strings from '@res/strings'

const BorrowedView = () => {
	return (
		<ViewLayout name="borrowed" formInputs={FormInputs} tableHead={TableHead} onRowClick={() => {}}>
			<InfoModal
				title={Strings.memberInfo}
				onClose={function (event: React.MouseEvent<Element, MouseEvent>): void {
					throw new Error('Function not implemented.')
				}}
				onDelete={function (event: React.MouseEvent<Element, MouseEvent>): void {
					throw new Error('Function not implemented.')
				}}
				onEdit={function (event: React.MouseEvent<Element, MouseEvent>): void {
					throw new Error('Function not implemented.')
				}}
				show={false}
				className={''}
			>
				<Info
					doc={{
						bookID: '',
						memberID: '',
						borrowDate: '',
						deadline: '',
						returnDate: '',
					}}
				/>
			</InfoModal>
		</ViewLayout>
	)
}

export default BorrowedView
