import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

function Log() {
    return (
        <div className="m-4 p-3" style={{ borderRadius: "10px", backgroundColor: "lightgray" }}>
            <h4>Bitácora</h4>
            <ListGroup>
                <ListGroup.Item variant="primary">Normal</ListGroup.Item>
                <ListGroup.Item variant="secondary">Normal 2</ListGroup.Item>
                <ListGroup.Item variant="success">Éxitoso</ListGroup.Item>
                <ListGroup.Item variant="danger">Fallido</ListGroup.Item>
                <ListGroup.Item variant="warning">Warning</ListGroup.Item>
                <ListGroup.Item variant="info">Informacion</ListGroup.Item>
                <ListGroup.Item variant="light">Normal 3</ListGroup.Item>
                <ListGroup.Item variant="dark">Dark</ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default Log;
