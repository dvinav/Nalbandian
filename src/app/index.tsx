import React from 'react'
import { Routes, Route, Outlet, useLocation, Navigate, To } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Header from '@layouts/Header'
import BorrowedView from '@views/BorrowedView'
import MembersView from '@views/MembersView'
import BooksView from '@views/BooksView'
import getCol from '@utils/getCol'
import { CollectionNames, CollectionNumbers } from '@utils/types'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const defaultTab: CollectionNumbers = 3

const App = () => {
	const location = useLocation()

	return (
		<>
			<Header
				currentTab={
					location.pathname == '/' ? defaultTab : (getCol(location.pathname.substring(1) as CollectionNames) as CollectionNumbers)
				}
			/>
			<TransitionGroup component={null}>
				<CSSTransition key={location.key} classNames="tabFade" timeout={800}>
					<Routes location={location}>
						<Route path="/borrowed" element={<BorrowedView />} />
						<Route path="/members" element={<MembersView />} />
						<Route path="/books" element={<BooksView />} />
						<Route path="/*" element={<Navigate to={getCol(defaultTab) as To} />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
			<Outlet />
		</>
	)
}

export default App
