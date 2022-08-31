import React, { useState } from 'react'
import './FormContainer.scss'
import { Container, Row, Col } from 'react-bootstrap'
import {
	AddButton,
	ClearButton,
	CancelButton,
	SubmitButton,
} from '../../components/FormButtons/FormButtons'

const FormContainer = (props: any) => {
	const [formState, switchFormState] = useState(0)

	return (
		<div className="formContainer">
			<form encType="multipart/form-data" onSubmit={props.onSubmit}>
				<Container className="p-2">
					<Row className="g-2">
						<Col>
							<AddButton onClick={() => switchFormState(1)} />
						</Col>
						<Col>
							<ClearButton />
						</Col>
					</Row>
					<fieldset disabled={!Boolean(formState)}>
						{props.children}
					</fieldset>
					<Row className="g-2">
						<Col>
							<CancelButton onClick={() => switchFormState(0)} />
						</Col>
						<Col>
							<SubmitButton />
						</Col>
					</Row>
				</Container>
			</form>
		</div>
	)
}

export default FormContainer
