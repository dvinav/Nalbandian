import React, { useRef, useState } from 'react'
import './FormContainer.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { AddButton, ClearButton, CancelButton, SubmitButton } from '../../components/FormButtons/FormButtons'
import * as Requests from '../../api/requests'
import removeQuotes from '../../utils/removeQuotes'

const FormContainer: React.FC<{ children: React.ReactNode; onResult: Function; col: number }> = ({ children, onResult, col }) => {
	const [formState, switchFormState] = useState(0)

	const formRef = useRef<HTMLFormElement>(null)

	return (
		<div className="formContainer">
			<form
				encType="multipart/form-data"
				onSubmit={(e) => {
					e.preventDefault()
					var fd = new FormData(e.target as HTMLFormElement)
					fd.append('collection', String(col))
					if (formState == 1) {
						Requests.Add(fd, (id: string) => {
							formRef?.current?.reset()
							switchFormState(0)
							onResult(Object.fromEntries(fd), removeQuotes(id))
						})
					}
				}}
				ref={formRef}
			>
				<Container className="p-2">
					<Row className="g-2">
						<Col>
							<AddButton onClick={() => switchFormState(1)} disabled={Boolean(formState)} />
						</Col>
						<Col>
							<ClearButton onClick={() => formRef?.current?.reset()} disabled={!Boolean(formState)} />
						</Col>
					</Row>
					<fieldset disabled={!Boolean(formState)}>{children}</fieldset>
					<Row className="g-2">
						<Col>
							<CancelButton
								onClick={() => {
									switchFormState(0)
									formRef?.current?.reset()
								}}
								disabled={!Boolean(formState)}
							/>
						</Col>
						<Col>
							<SubmitButton disabled={!Boolean(formState)} />
						</Col>
					</Row>
				</Container>
			</form>
		</div>
	)
}

export default FormContainer
