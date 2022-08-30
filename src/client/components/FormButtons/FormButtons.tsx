import React from 'react'
import { Button } from 'react-bootstrap'
import Icon from '../Icon/Icon'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'

const AddButton = (props: any) => {
    return (
        <Button variant="primary" className="addBtn" onClick={props.onClick}>
            <Icon>{Icons.Add}</Icon>
            {Strings.Add}
        </Button>
    )
}

const ClearButton = () => {
    return (
        <Button variant="primary" className="clearBtn">
            <Icon>{Icons.Clear}</Icon>
            {Strings.Clear}
        </Button>
    )
}

const SubmitButton = () => {
    return (
        <Button variant="success" type="submit">
            <Icon>{Icons.Submit}</Icon>
            {Strings.Submit}
        </Button>
    )
}

const CancelButton = (props: any) => {
    return (
        <Button variant="danger" onClick={props.onClick}>
            <Icon>{Icons.Clear}</Icon>
            {Strings.Clear}
        </Button>
    )
}

export { AddButton, ClearButton, CancelButton, SubmitButton }
