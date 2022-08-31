import React from 'react'
import './App.scss'
import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Header from '../layouts/Header/Header'
import BorrowedView from '../views/BorrowedView/BorrowedView'
import MembersView from '../views/MembersView/MembersView'
import BooksView from '../views/BooksView/BooksView'
import TN from '../utils/TN'
import TS from '../utils/TS'

const defaultTab = 3

const App = () => {
	const location = useLocation()

	return (
		<>
			<Header
				currentTab={
					location.pathname == '/'
						? defaultTab
						: TS(location.pathname.substring(1))
				}
			/>
			<TransitionGroup component={null}>
				<CSSTransition
					key={location.key}
					classNames="tabFade"
					timeout={400}
				>
					<Routes location={location}>
						<Route path="/borrowed" element={<BorrowedView />} />
						<Route path="/members" element={<MembersView />} />
						<Route path="/books" element={<BooksView />} />
						<Route
							path="/*"
							element={<Navigate to={TN(defaultTab)} />}
						/>
					</Routes>
				</CSSTransition>
			</TransitionGroup>
			<Outlet />
		</>
	)
}

export default App
