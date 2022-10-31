import React, { useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";

const Login = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myInputState, setMyInputState] = useState({
    email: "",
    password: "",
  });

  const LoginHandler = async() => {
    setLoading(true);
    try {
      await axios
        .post(`users/login`, {
          email: myInputState.email,
          password: myInputState.password,
        })
        .then((result) => {
          setLoading(false);
          props.onLogin(result.data.token);
        })
        .catch((err) => {
          toast.error(`Алдаа: ${err.response.data.error.message}`);
          setLoading(false);
        });
    } catch (error) {
      toast.error(`Алдаа: ${error}`);
    }
  };

  const typingHandler = (e) => {
    const { name, value } = e.target;
    setError(null);
    setMyInputState({ ...myInputState, [name]: value });
  };
  return (
    <Row>
      <Col></Col>
      <Col md={4}>
        {error && <div>{error}</div>}
        {loading && (
          <div className="col text-center m-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" name="email" onChange={typingHandler} placeholder="И-мэйл хаяг" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" name="password" onChange={typingHandler} placeholder="Нууц үг" />
          </Form.Group>
          <Button variant="primary" onClick={LoginHandler}>
            Нэвтэх
          </Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Login;