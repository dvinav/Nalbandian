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

const InfoModalContent = (props: Member) => {
	return (
		<div className="memberInfoContainer">
			<div className="memberInfo_pictureContainer">
				<img src={props.picture != '' ? `uploads/${props.picture}` : '/nopic.png'} />
			</div>
			<Table>
				<tbody>
					<tr>
						<CC name="Name" text={props.name} />
						<CC name="Surname" text={props.surname} />
					</tr>
					<tr>
						<CC name="Birthdate" text={props.birthdate} />
						<CC name="Phone" text={props.phone} />
					</tr>
					<tr>
						<CC name="Home" text={props.home} />
						<CC name="MemberCode" text={props.memberCode} />
					</tr>
					<tr>
						<CC name="Address" text={props.address} />
					</tr>
				</tbody>
			</Table>
		</div>
	)
}

export { FormInputs, TableHead, InfoModalContent }
