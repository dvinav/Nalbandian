import * as React from 'react'
import { Row } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TextField from '../../components/TextField/TextField'
import TableContainer from '../../components/TableContainer/TableContainer'

class Borrowed extends React.Component {
    render() {
        return (
            <TabContainer>
                <FormContainer /* onSubmit={UI.Submit} */>
                    <Row className="g-2">
                        <TextField name="member"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="book"></TextField>
                    </Row>
                </FormContainer>
                <TableContainer></TableContainer>
            </TabContainer>
        )
    }
}

export default Borrowed
