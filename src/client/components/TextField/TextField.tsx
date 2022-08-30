import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import Icon from '../Icon/Icon'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'

const TextField = (props: any) => {
    return (
        <InputGroup>
            <InputGroup.Text>
                <Icon>
                    {
                        Icons[
                            (props.name.charAt(0).toUpperCase() +
                                props.name.slice(1)) as keyof typeof Icons
                        ]
                    }
                </Icon>
            </InputGroup.Text>
            <Form.Control
                placeholder={String(
                    Strings[
                        (props.name.charAt(0).toUpperCase() +
                            props.name.slice(1)) as keyof typeof Strings
                    ]
                )}
                name={props.name}
            />
        </InputGroup>
    )
}

export default TextField
