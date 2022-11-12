import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { AddDoc, EditDoc } from 'utils/api'
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
		} else if (this.props.state == 2) {
			EditDoc(fd, this.props.editId, (id: string) => {
				this.formRef?.current?.reset()
				this.props.setState(0)
				this.props.result(Object.fromEntries(fd) as Doc, id)
			})
		}
	}

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
