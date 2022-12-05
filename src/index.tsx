import ReactDOM from 'react-dom/client'
import React from 'react'
import MainPage from 'pages/main'
import Login from 'pages/login'
import { BrowserRouter } from 'react-router-dom'

const main = (
	<BrowserRouter>
		<MainPage />
	</BrowserRouter>
)

document.body.onload = () => {
	const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)
	root.render(<Login success={() => root.render(main)} />)
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/serviceWorker.js')
