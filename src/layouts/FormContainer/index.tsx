import React, { useRef } from 'react'
import './index.css'
import { Container, Row, Col } from 'react-bootstrap'
import { AddDoc } from '@utils/api'
import unquote from '@utils/unquote'
import { FormButtons } from '@components/FormControls'

type Props = {
	children: React.ReactNode
	onResult: Function
	col: number
	formState: 0 | 1 | 2
	switchFormState: Function
}

const FormContainer = (props: Props) => {
	const formRef = useRef<HTMLFormElement>(null)
	return (
		<div className="formContainer">
			<form
				data-col={props.col}
				encType="multipart/form-data"
				onSubmit={(e) => {
					e.preventDefault()
					var fd = new FormData(e.target as HTMLFormElement)
					fd.append('collection', String(props.col))
					if (props.formState == 1) {
						AddDoc(fd, (id: string) => {
							formRef?.current?.reset()
							props.switchFormState(0)
							props.onResult(Object.fromEntries(fd), unquote(id))
						})
					}
				}}
				ref={formRef}
			>
				<Container className="p-2">
					<Row className="g-2">
						<Col>
							<FormButtons.AddButton onClick={() => props.switchFormState(1)} disabled={Boolean(props.formState)} />
						</Col>
						<Col>
							<FormButtons.ClearButton onClick={() => formRef?.current?.reset()} disabled={!Boolean(props.formState)} />
						</Col>
					</Row>
					<fieldset disabled={!Boolean(props.formState)}>{props.children}</fieldset>
					<Row className="g-2">
						<Col>
							<FormButtons.CancelButton
								onClick={() => {
									props.switchFormState(0)
									formRef?.current?.reset()
								}}
								disabled={!Boolean(props.formState)}
							/>
						</Col>
						<Col>
							<FormButtons.SubmitButton disabled={!Boolean(props.formState)} />
						</Col>
					</Row>
				</Container>
			</form>
		</div>
	)
}

export default FormContainer
