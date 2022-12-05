import ReactDOM from 'react-dom/client'
import React from 'react'
// import MainPage from 'pages/main'
import { BrowserRouter } from 'react-router-dom'
import Login from 'pages/login'

document.body.onload = () => {
	ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	)
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/serviceWorker.js')
