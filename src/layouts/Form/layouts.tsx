import React, { KeyboardEvent } from 'react'
import { TextField, Select, FileInput } from 'components/FormControls'
import { getString } from 'utils/get'

const books = (
	<>
		<TextField name="title" />
		<TextField name="subtitle" />
		<TextField name="author" />
		<TextField name="publishing" />
		<TextField name="publishDate" />
		<TextField name="publishLocation" />
		<TextField name="translator" />
		<TextField name="ISBN" />
		<Select name="language" defaultValue="hy">
			<option value="hy">{getString('hy')}</option>
			<option value="fa">{getString('fa')}</option>
			<option value="en">{getString('en')}</option>
		</Select>
		<TextField name="bookCode" />
		<TextField name="ebook" />
	</>
)

const members = (
	<>
		<TextField name="name" />
		<TextField name="surname" />
		<TextField name="birthdate" date />
		<TextField name="phone" number />
		<TextField name="home" />
		<TextField name="address" />
		<FileInput name="memberPicture" />
		<TextField name="memberCode" />
	</>
)

const borrowed = (
	<>
		<TextField name="member" />
		<TextField name="book" />
	</>
)

export { books, members, borrowed }
