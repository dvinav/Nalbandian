import React from 'react'
import { Routes, Route, Outlet, useLocation, Navigate, To } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Header from '../layouts/Header/Header'
import BorrowedView from '../views/BorrowedView/BorrowedView'
import MembersView from '../views/MembersView/MembersView'
import BooksView from '../views/BooksView/BooksView'
import GetCol from '../utils/GetCol'
import './App.scss'

const defaultTab = 3

const App = () => {
	const location = useLocation()

	return (
		<>
			<Header currentTab={location.pathname == '/' ? defaultTab : (GetCol(location.pathname.substring(1)) as number)} />
			<TransitionGroup component={null}>
				<CSSTransition key={location.key} classNames="tabFade" timeout={800}>
					<Routes location={location}>
						<Route path="/borrowed" element={<BorrowedView />} />
						<Route path="/members" element={<MembersView />} />
						<Route path="/books" element={<BooksView />} />
						<Route path="/*" element={<Navigate to={GetCol(defaultTab) as To} />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
			<Outlet />
		</>
	)
}

export default App
