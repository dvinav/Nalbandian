import React, { useEffect, useState } from 'react'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import Icon from '../../components/Icon/Icon'
import { Link } from 'react-router-dom'
import TabSwitchBtn from '../../components/TabSwitchBtn/TabSwitchBtn'
import './Header.scss'

const Header = (props: any) => {
    const [tab, switchTab] = useState(props.defaultTab)
    return (
        <header>
            <div className="headerLeft">
                <span>{Strings.Header.Title}</span>
            </div>
            <div className="headerCenter">
                <TabSwitchBtn
                    name="borrowed"
                    tab="1"
                    activeTab={tab}
                    switchFunction={() => switchTab(1)}
                />
                <TabSwitchBtn
                    name="members"
                    tab="2"
                    activeTab={tab}
                    switchFunction={() => switchTab(2)}
                />
                <TabSwitchBtn
                    name="books"
                    tab="3"
                    activeTab={tab}
                    switchFunction={() => switchTab(3)}
                />

                <div
                    id="tabIndicator"
                    style={{
                        marginLeft: `${
                            5 + 23.333 * (tab - 1) + [0, 2, 4][tab - 1] * 5
                        }%`,
                    }}
                ></div>
            </div>
            <div className="headerRight" />
        </header>
    )
}

export default Header
