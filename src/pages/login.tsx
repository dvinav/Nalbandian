import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import 'style-imports'
import Icon from 'components/Icon'
import { getIcon, getString } from 'utils/get'
import styles from 'styles/login.module.sass'
import sha256 from 'crypto-js/sha256'

class Login extends React.PureComponent {
	inputRef: React.RefObject<HTMLInputElement>

	constructor(p: any) {
		super(p)

		document.title = getString('loginTitle')

		this.inputRef = React.createRef()
	}

	submit = () => {}

	render() {
		return (
			<div className={styles.CS}>
				<div className={styles.SS}>
					<span className={styles.HS}>{getString('auth')}</span>
					<InputGroup>
						<InputGroup.Text>
							<Icon>{getIcon('key')}</Icon>
						</InputGroup.Text>
						<Form.Control placeholder={getString('password')} ref={this.inputRef} />
					</InputGroup>
					<Button variant="primary" className={styles.BS} onClick={() => this.submit()}>
						{getString('login')}
					</Button>
				</div>
			</div>
		)
	}
}

export default Login
