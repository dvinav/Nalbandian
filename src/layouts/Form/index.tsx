import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { AddDoc } from 'utils/api'
import unquote from 'utils/unquote'
import { FormButtons } from 'components/FormControls'
import styles from 'styles/form.module.sass'
import { Props, States } from 'types/form'
import * as layouts from './layouts'
import { getCol } from 'utils/get'
import { Doc } from 'types/documents'

class Form extends React.PureComponent<Props, States> {
	formRef: React.RefObject<HTMLFormElement>

	constructor(p: Props) {
		super(p)

		this.formRef = React.createRef()
	}

	submit = (e: React.FormEvent) => {
		e.preventDefault()
		var fd = new FormData(e.target as HTMLFormElement)
		fd.append('collection', String(getCol(this.props.name)))
		if (this.props.state == 1) {
			AddDoc(fd, (id: string) => {
				this.formRef?.current?.reset()
				this.props.setState(0)
				this.props.result(Object.fromEntries(fd) as Doc, id)
			})
		}
	}

	/* componentDidUpdate(): void {
		console.log(this.props.state)
	} */

	render() {
		return (
			<div className={styles.formContainerClass} style={{ marginLeft: this.props.show ? '0' : '-25vw' }}>
				<form encType="multipart/form-data" onSubmit={(e: React.FormEvent) => this.submit(e)} ref={this.formRef}>
					<Container className="p-2">
						<Row className="g-2">
							<Col>
								<FormButtons.AddButton onClick={() => this.props.setState(1)} disabled={Boolean(this.props.state)} />
							</Col>
							<Col>
								<FormButtons.ClearButton
									onClick={() => this.formRef?.current?.reset()}
									disabled={!Boolean(this.props.state)}
								/>
							</Col>
						</Row>
						<fieldset disabled={!this.props.state}>{layouts[this.props.name]}</fieldset>
						<Row className={'g-2 ' + styles.rowClass}>
							<Col>
								<FormButtons.CancelButton
									onClick={() => {
										this.props.setState(0)
										this.formRef?.current?.reset()
									}}
									disabled={!Boolean(this.props.state)}
								/>
							</Col>
							<Col>
								<FormButtons.SubmitButton disabled={!Boolean(this.props.state)} />
							</Col>
						</Row>
					</Container>
				</form>
			</div>
		)
	}
}

export default Form
/* const FormContainer = (p: Props) => {
	const formRef = useRef<HTMLFormElement>(null)
	return (
		<div className={styles.formContainerClass}>
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
					<Row className={'g-2 ' + styles.rowClass}>
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
 */
