import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './app'
import { BrowserRouter } from 'react-router-dom'

document.body.onload = () => {
	ReactDOM.createRoot(document.body).render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	)
}
