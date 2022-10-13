import * as React from 'react'
import { Table } from 'react-bootstrap'
import Strings from '@res/strings'
import { Member } from '@utils/types'
import { FileInput, TextField } from '@components/FormControls'
import { TH } from '@components/TableComponents'
import CC from '@components/Modals/infoModal/cell'

const FormInputs = (
	<>
		<TextField name="name" />
		<TextField name="surname" />
		<TextField name="birthdate" />
		<TextField name="phone" />
		<TextField name="home" />
		<TextField name="address" />
		<FileInput name="memberPicture" />
		<TextField name="memberCode" />
	</>
)

const TableHead = (
	<>
		<TH width="4%">#</TH>
		<TH width="44%">{Strings.name}</TH>
		<TH width="44%">{Strings.surname}</TH>
		<TH width="8%">{Strings.memberCode}</TH>
	</>
)

const Info: React.FC<{ doc: Member }> = ({ doc }) => {
	return (
		<div className="memberInfoContainer">
			<div className="memberInfo_pictureContainer">
				<img src={doc.picture != '' ? `uploads/${doc.picture}` : '/nopic.png'} />
			</div>
			<Table>
				<tbody>
					<tr>
						<CC name="Name" text={doc.name} />
						<CC name="Surname" text={doc.surname} />
					</tr>
					<tr>
						<CC name="Birthdate" text={doc.birthdate} />
						<CC name="Phone" text={doc.phone} />
					</tr>
					<tr>
						<CC name="Home" text={doc.home} />
						<CC name="MemberCode" text={doc.memberCode} />
					</tr>
					<tr>
						<CC name="Address" text={doc.address} />
					</tr>
				</tbody>
			</Table>
		</div>
	)
}

export { FormInputs, TableHead, Info }
