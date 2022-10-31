import React, { useState, useEffect, Fragment } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { Row, Col, Spinner, Button, Form } from "react-bootstrap";
import Restricted from "../components/restricted";
import AjiltanItem from "../components/ajiltan-item/ajiltan-item";

const Ehlel = ({ logout }) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [checkData, setCheckData] = useState(0);

  const [myInputState, setMyInputState] = useState({
    email: "",
    password: "",
    name: "",
  });

  const userAddHandler = async () => {
    if (localStorage.getItem("salon")) {
      setLoading(true);
      setError(null);
      try {
        await axios
          .post(`users/register`, {
            name: myInputState.name,
            email: myInputState.email,
            password: myInputState.password,
            role: "administrator",
          })
          .then(() => {
            toast.success("Амжилттай");
            setCheckData(checkData + 1);
            setLoading(false);
          })
          .catch((err) => {
            toast.error(`Алдаа: ${err.response.data.error.message}`);
            setLoading(false);
          });
      } catch (error) {
        toast.error(`Алдаа: ${error}`);
      }
    }
  };

  const deleteUserHandler = async (userid) => {
    if (localStorage.getItem("salon")) {
      setLoading(true);
      setError(null);
      try {
        await axios
          .delete(`users/${userid}`)
          .then(() => {
            toast.success("Амжилттай");
            setCheckData(checkData + 1);
            setLoading(false);
          })
          .catch((err) => {
            toast.error(`Алдаа: ${err.response.data.error.message}`);
            setLoading(false);
          });
      } catch (error) {
        toast.error(`Алдаа: ${error}`);
      }
    }
  };

 useEffect(() => {
    if (localStorage.getItem("salon")) {
      setLoading(true);
      setError(null);
      try {
        axios
          .get(`employees`)
          .then((result) => {
            setEmployeeData(result.data.data);
            setLoading(false);
          })
          .catch((err) => {
            toast.error(`Алдаа: ${err.response.data.error.message}`);
            setLoading(false);
          });
      } catch (error) {
        toast.error(`Алдаа: ${error}`);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("salon")) {
      try {
        axios
        .get(`users`)
        .then((result) => {
          setLoading(false);
          setUsers(result.data.data);
        })
        .catch((err) => {
          toast.error(`Алдаа: ${err.response.data.error.message}`);
          setLoading(false);
        });
      } catch (error) {
        toast.error(`Алдаа: ${error}`);
      }
    }
  }, [checkData]);

  const typingHandler = (e) => {
    const { name, value } = e.target;
    setError(null);
    setMyInputState({ ...myInputState, [name]: value });
  };

  return (
    <div>
      {loading && (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {localStorage.getItem("salon") ? (
        <Fragment>
          {error && <div>{error}</div>}
          <Row md={3}>
            {employeeData.map((el) => (
              <Col key={el._id}>
                <a href={`/ajiltan/${el._id}/${el.name}`}>
                  <AjiltanItem name={el.name} />
                </a>
              </Col>
            ))}
          </Row>
          <div className="col text-center">
            <Button className="mt-4 justify-center" onClick={logout}>
              Гарах
            </Button>
          </div>
          <Row className="mt-5">
            <Col>
              <h4>Бүртгэлтэй хэрэглэгчид</h4>
              <div>
                {users.map((el) => (
                  <Row key={el.email} className="shadow border mt-3 p-3 rounded registeredusers">
                    <Col className="item-user">
                      <div>
                        <div className="userName">{el.name}</div>
                        <div className="userEmail">{el.email}</div>
                      </div>
                      <Button
                        onClick={() => {
                          deleteUserHandler(el._id);
                        }}
                        className="userDelete"
                        disabled={1 >= users.length}
                      >
                        Устгах
                      </Button>
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
            <Col className="mb-5">
              <h4>Нэвтрэх эрх үүсгэх</h4>
              <Form>
                <Form.Group className="mb-3 mt-3">
                  <Form.Control type="text" name="name" onChange={typingHandler} placeholder="Нэр" />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                  <Form.Control type="email" name="email" onChange={typingHandler} placeholder="И-мэйл хаяг" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="password" name="password" onChange={typingHandler} placeholder="Нууц үг" />
                </Form.Group>
                <Button
                  variant="primary"
                  className="float-right"
                  onClick={() => {
                    userAddHandler();
                  }}
                >
                  Хэрэглэгч нэмэх
                </Button>
              </Form>
            </Col>
          </Row>
        </Fragment>
      ) : (
        <Restricted />
      )}
    </div>
  );
};

export default Ehlel;
