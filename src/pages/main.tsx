import React from 'react'
import { Routes, Route, Outlet, useLocation, Navigate, To } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Header from 'layouts/Header'
import View from 'layouts/View'
import { getCol } from 'utils/get'
import { CollectionNames, CollectionNumbers } from 'types/general'
import 'style-imports'
import tabfade from 'styles/tabfade.module.sass'
import BorrowedView from 'layouts/BorrowedView'

const defaultTab: CollectionNumbers = 1

const checkLocation = (): Boolean => {
	if (location.pathname == '/borrowed' || location.pathname == '/books' || location.pathname == '/members') return true
	else return false
}

const MainPage = () => {
	const location = useLocation()
	const [formState, setFormState] = React.useState(false)

	return (
		<>
			<Header
				currentTab={
					location.pathname == '/' ? defaultTab : (getCol(location.pathname.substring(1) as CollectionNames) as CollectionNumbers)
				}
				formToggle={() => setFormState(!formState)}
				formState={formState}
				show={checkLocation()}
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
						<Route path="/borrowed" element={<BorrowedView isFormOpen={formState} />} />
						<Route path="/members" element={<View name="members" isFormOpen={formState} />} />
						<Route path="/books" element={<View name="books" isFormOpen={formState} />} />
						<Route path="/*" element={<Navigate to={getCol(defaultTab) as To} />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
			<Outlet />
		</>
	)
}

export default MainPage
