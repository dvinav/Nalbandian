import * as React from 'react'
import ViewLayout from '@layouts/ViewLayout'
import { FormInputs, TableHead } from './components'

const BorrowedView = () => {
	return (
		<ViewLayout
			name="borrowed"
			formInputs={FormInputs}
			tableHead={TableHead}
			infoModalContent={<></>}
			infoModalTitle=""
			onRowClick={() => {}}
			onInfoModalClose={function (event: React.MouseEvent<Element, MouseEvent>): void {
				throw new Error('Function not implemented.')
			}}
			onRowDelete={() => {}}
			imShow={false}
		/>
	)
}

export default BorrowedView
