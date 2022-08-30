import ReactDOM from 'react-dom/client'
import React from 'react'
import Strings from './json/strings.json'
import App from './app/App'
import Requests from './api/requests'

const Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export var FormStates = {
    1: 0,
    2: 0,
    3: 0,
}

export var Tabs = {
    Active: -1,
    SetActiveTab: (tab: number) => (Tabs.Active = tab),
}

namespace UI {
    export const Init = () => {
        document.title = Strings.DocumentTitle
        Root.render(<App />)
    }

    export const Submit = (e: any) => {
        e.preventDefault()
        var fd = new FormData(e.target)
        fd.append('collection', String(Tabs.Active))
        /* Requests.Add(fd, (id) => {
            Table.Insert(
                $(e.target).parents('.tabContainer').data('tab'),
                Object.fromEntries(fd),
                id
            )
            Forms.Update(0)
        }) */
    }
}

export default UI
