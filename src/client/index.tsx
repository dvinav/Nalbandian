import Requests from './api/requests'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './app/App'
import Strings from './json/strings.json'

const Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

document.body.onload = () => {
    document.title = Strings.DocumentTitle
    Root.render(<App />)
}
