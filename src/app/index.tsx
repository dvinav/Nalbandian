import React from 'react'
import { Routes, Route, Outlet, useLocation, Navigate, To } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Header from 'layouts/Header'
import Page from 'layouts/Page'
import { getCol } from 'utils/get'
import { CollectionNames, CollectionNumbers } from 'types/general'
import 'style-imports'
import tabfade from 'styles/tabfade.module.sass'

const defaultTab: CollectionNumbers = 3

const App = () => {
	const location = useLocation()
	const [formState, setFormState] = React.useState(true)

	return (
		<>
			<Header
				currentTab={
					location.pathname == '/' ? defaultTab : (getCol(location.pathname.substring(1) as CollectionNames) as CollectionNumbers)
				}
				formToggle={() => setFormState(!formState)}
				formState={formState}
			/>
			<TransitionGroup component={null}>
				<CSSTransition
					key={location.key}
					classNames={{
						enterActive: tabfade.enterActive,
						enter: tabfade.enter,
						exitActive: tabfade.exitActive,
						exit: tabfade.exit,
					}}
					timeout={800}
				>
					<Routes location={location}>
						<Route path="/borrowed" element={<Page name="borrowed" isFormOpen={formState} />} />
						<Route path="/members" element={<Page name="members" isFormOpen={formState} />} />
						<Route path="/books" element={<Page name="books" isFormOpen={formState} />} />
						<Route path="/*" element={<Navigate to={getCol(defaultTab) as To} />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
			<Outlet />
		</>
	)
}

export default App
