import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import 'style-imports'
import Icon from 'components/Icon'
import { getIcon, getString } from 'utils/get'
import styles from 'styles/login.module.sass'
import sha512 from 'crypto-js/sha512'

type Props = {
	success(): void
}

type State = {
	auth: Boolean | null
}

class Login extends React.PureComponent<Props, State> {
	inputRef: React.RefObject<HTMLInputElement>

	constructor(p: any) {
		super(p)

		this.state = {
			auth: null,
		}

		document.title = getString('loginTitle')

		this.inputRef = React.createRef()

		console.log(document.cookie.split('='))

		if (document.cookie.split('=')[1] != '')
			fetch('/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({
					type: 'key',
					key: document.cookie.split('=')[1],
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.result) {
						console.log(data)
						this.props.success()
						this.setState({ auth: true })
					} else this.setState({ auth: false })
				})
	}

	keydown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') this.submit()
	}

	submit = () => {
		if (this.inputRef.current?.value) {
			fetch('/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({
					type: 'hash',
					hash: sha512(this.inputRef.current.value).toString(),
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.result === true) {
						console.log(data.key)
						this.props.success()
						var date = new Date(2990270256951)
						document.cookie = `key=${data.key}; expires=${date.toUTCString()}`
					} else if (this.inputRef.current) this.inputRef.current.style.border = '1px solid red'
				})
		}
	}

	render() {
		if (this.state.auth === false)
			return (
				<div className={styles.CS}>
					<div className={styles.SS}>
						<span className={styles.HS}>{getString('auth')}</span>
						<InputGroup>
							<InputGroup.Text>
								<Icon>{getIcon('key')}</Icon>
							</InputGroup.Text>
							<Form.Control
								onKeyDown={this.keydown}
								type="password"
								placeholder={getString('password')}
								ref={this.inputRef}
							/>
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
