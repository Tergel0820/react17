import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
export default function Restricted() {
    let history = useHistory();

    return (
        <Row>
            <Col></Col>
            <Col md={4} className="restricted">
                <div>Та энэ хуудсыг үзэхийн тулд нэврэх шаардлагатай</div>
                <Button onClick={() => history.push("/")} className="mt-4">Нэвтэх</Button>
            </Col>
            <Col></Col>
        </Row>
    );
}
