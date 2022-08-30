import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Icon from '../Icon/Icon'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'

const TabSwitchBtn = (props: any) => {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => {
                props.switchFunction()
                navigate('/' + props.name)
            }}
            className={
                'tabButton ' +
                (props.activeTab == Number(props.tab) ? 'activeTabBtn' : '')
            }
            data-tab={String(props.tab)}
        >
            <span>
                <Icon>
                    {
                        Icons[
                            (props.name.charAt(0).toUpperCase() +
                                props.name.slice(1)) as keyof typeof Icons
                        ]
                    }
                </Icon>
                {
                    Strings.Header[
                        (props.name.charAt(0).toUpperCase() +
                            props.name.slice(1)) as keyof typeof Icons
                    ]
                }
            </span>
        </div>
    )
}

export default TabSwitchBtn
