import * as React from 'react'
import { Row } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TextField from '../../components/TextField/TextField'
import TableContainer from '../../components/TableContainer/TableContainer'

class Books extends React.Component {
    render() {
        return (
            <TabContainer>
                <FormContainer>
                    <Row className="g-2">
                        <TextField name="title"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="subtitle"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="author"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="publishing"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="publishDate"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="publishLocation"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="translator"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="ISBN"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="bookCode"></TextField>
                    </Row>
                    <Row className="g-2">
                        <TextField name="ebook"></TextField>
                    </Row>
                </FormContainer>
                <TableContainer></TableContainer>
            </TabContainer>
        )
    }
}

export default Books
