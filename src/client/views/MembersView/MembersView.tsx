import * as React from 'react'
import { Row } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TextField from '../../components/TextField/TextField'
import TableContainer from '../../components/TableContainer/TableContainer'

class Members extends React.Component {
    render() {
        return (
            <TabContainer>
                <FormContainer>
                    <Row className="g-2">
                        <TextField name="name"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="surname"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="birthdate"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="phone"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="home"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="address"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="memberCode"></TextField>
                    </Row>
                </FormContainer>
                <TableContainer></TableContainer>
            </TabContainer>
        )
    }
}

export default Members
