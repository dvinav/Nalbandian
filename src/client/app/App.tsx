import React, { useState, useEffect } from 'react'
import './App.scss'
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Header from '../layouts/Header/Header'
import BorrowedView from '../views/BorrowedView/BorrowedView'
import MembersView from '../views/MembersView/MembersView'
import BooksView from '../views/BooksView/BooksView'
import TN from '../utils/TN'

const defaultTab = 3

const AppContainer = (props: any) => {
    return (
        <>
            <Header defaultTab={defaultTab} />
            {props.children}
            <Outlet />
        </>
    )
}

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<AppContainer />}>
                        <Routes>
                            <TransitionGroup>
                                <CSSTransition
                                    key={location.pathname}
                                    classNames="fade"
                                    timeout={300}
                                >
                                    <Route
                                        path="borrowed"
                                        element={<BorrowedView />}
                                    />
                                    <Route
                                        path="members"
                                        element={<MembersView />}
                                    />
                                    <Route
                                        path="books"
                                        element={<BooksView />}
                                    />
                                    <Route
                                        path="*"
                                        element={
                                            <Navigate to={TN(defaultTab)} />
                                        }
                                    />
                                </CSSTransition>
                            </TransitionGroup>
                        </Routes>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
