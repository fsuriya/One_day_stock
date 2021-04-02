import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';


const InputJson = () => {

    return (
        <div>
            <main class="container" bg="dark">
                <Form>
                    <br></br>
                    <Form.Group controlId="formInput">
                        <Form.Label>Input Json</Form.Label>
                        <Form.Control type="input" placeholder="Enter input" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </main>
        </div>
    );
};

export default (InputJson);
