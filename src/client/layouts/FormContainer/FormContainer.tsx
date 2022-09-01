import React, { useState } from 'react'
import './FormContainer.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { AddButton, ClearButton, CancelButton, SubmitButton } from '../../components/FormButtons/FormButtons'

type Props = {
	onSubmit: React.FormEventHandler<HTMLFormElement>
	children: React.ReactNode
}

const FormContainer = (props: Props) => {
	const [formState, switchFormState] = useState(0)

	return (
		<div className="formContainer">
			<form encType="multipart/form-data" onSubmit={props.onSubmit}>
				<Container className="p-2">
					<Row className="g-2">
						<Col>
							<AddButton onClick={() => switchFormState(1)} disabled={Boolean(formState)} />
						</Col>
						<Col>
							<ClearButton onClick={() => {}} disabled={!Boolean(formState)} />
						</Col>
					</Row>
					<fieldset disabled={!Boolean(formState)}>{props.children}</fieldset>
					<Row className="g-2">
						<Col>
							<CancelButton onClick={() => switchFormState(0)} disabled={!Boolean(formState)} />
						</Col>
						<Col>
							<SubmitButton onClick={() => {}} disabled={!Boolean(formState)} />
						</Col>
					</Row>
				</Container>
			</form>
		</div>
	)
}

export default FormContainer
