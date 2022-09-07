import * as React from 'react'
import TextField from '../../components/TextField/TextField'
import Strings from '../../json/strings.json'
import TH from '../../components/TH/TH'
import ViewLayout from '../../layouts/ViewLayout/ViewLayout'

const BorrowedView = () => {
	return (
		<ViewLayout
			name="borrowed"
			formInputs={
				<>
					<TextField name="member"></TextField>
					<TextField name="book"></TextField>
				</>
			}
			tableHead={
				<>
					<TH width="4%">#</TH>
					<TH width="25%">{Strings.Name}</TH>
					<TH width="26%">{Strings.Book}</TH>
					<TH width="15%">{Strings.Date}</TH>
					<TH width="15%">{Strings.Deadline}</TH>
					<TH width="15%">{Strings.Return}</TH>
				</>
			}
		/>
	)
}

export default BorrowedView
