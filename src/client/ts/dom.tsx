import React from 'react'
import ReactDOM from 'react-dom/client'
import Strings from '../json/strings.json'
import { UI } from './ui'
import { Components } from './components'

namespace DOM 
{
	export const Root = ReactDOM.createRoot( document.getElementById('root') as HTMLElement )

	export const Init = () => {
		document.title = Strings.DocumentTitle

		DOM.Root.render(<Components.Header />)
	}
}

export { DOM }