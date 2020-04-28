import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

function Resources() {
    return (
        <div className="m-4 p-3" style={{ borderRadius: "10px", backgroundColor: "lightgray" }}>
            <h4>Recursos</h4>
            <Accordion defaultActiveKey="" >
                <Card style={{ borderRadius: "10px" }}>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        1 Resource Name and Desc
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            Resource details Resource detailsResource details
                            Resource detailsResource detailsResource details
                            Resource detailsResource detailsResource details
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card style={{ borderRadius: "10px" }}>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        2 Resource Name and Desc
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            Resource details Resource detailsResource details
                            Resource detailsResource detailsResource details
                            Resource detailsResource detailsResource details
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}

export default Resources;
