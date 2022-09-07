import * as React from 'react'
import TextField from '../../components/TextField/TextField'
import Strings from '../../json/strings.json'
import TH from '../../components/TH/TH'
import ViewLayout from '../../layouts/ViewLayout/ViewLayout'
import FileInput from '../../components/FileInput/FileInput'

const MembersView = () => {
	return (
		<ViewLayout
			name="members"
			formInputs={
				<>
					<TextField name="name"></TextField>
					<TextField name="surname"></TextField>
					<TextField name="birthdate"></TextField>
					<TextField name="phone"></TextField>
					<TextField name="home"></TextField>
					<TextField name="address"></TextField>
					<FileInput name="memberPicture"></FileInput>
					<TextField name="memberCode"></TextField>
				</>
			}
			tableHead={
				<>
					<TH width="4%">#</TH>
					<TH width="44%">{Strings.Name}</TH>
					<TH width="44%">{Strings.Surname}</TH>
					<TH width="8%">{Strings.MemberCode}</TH>
				</>
			}
		/>
	)
}

export default MembersView
