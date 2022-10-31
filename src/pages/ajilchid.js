import React, { Fragment, useEffect, useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import AjiltanEdit from "../components/ajiltan-edit/ajiltan-edit";
import Restricted from "../components/restricted";
import { FormControl, Col, Row, Button, Alert, Spinner } from "react-bootstrap";

const Ajilchid = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [checkData, setCheckData] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get(`employees`)
        .then((result) => {
          setEmployeesData(result.data.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(`Алдаа: ${err.response}`);
          setLoading(false);
        });
    } catch (error) {
      toast.error(`Алдаа: ${error}`);
    }
  }, [checkData]);

  const EmployeeAddHandler = async () => {
    if (inputValue === "") {
      toast.warning("Ажилтны нэрийг оруулна уу");
      return;
    }
    try {
      await axios
        .post("employees", {
          name: inputValue,
        })
        .then(() => {
          toast.success(`Ажилтан нэмэгдлээ`);
          setCheckData(checkData + 1);
        })
        .catch((err) => toast.error(`Алдаа: ${err.response}`));
    } catch (error) {
      toast.error(`Алдаа: ${error}`);
    }
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
    setError(null);
  }
  return (
    <Fragment>
      {localStorage.getItem("salon") ? (
        <div>
          {loading && (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <Row md={3}>
            <Col md={8}>
              <Row md={2}>
                {employeesData.map((employee) => (
                  <Col key={employee._id}>
                    <AjiltanEdit name={employee.name} id={employee._id} />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={4} className="p-3 pt-0">
              <div className="tsagburtgehtitle">Ажилтан нэмэх</div>
              {error ? (
                <Alert variant="warning" className="mt-2">
                  {error}
                </Alert>
              ) : null}
              <FormControl placeholder="Ажилтны нэр..." onChange={handleInputChange} name="customer" value={inputValue} className="mt-3" />
              <Button onClick={() => EmployeeAddHandler()} variant="primary" className="mt-3 float-right">
                Нэмэх
              </Button>
            </Col>
          </Row>
        </div>
      ) : (
        <Restricted />
      )}
    </Fragment>
  );
};

export default Ajilchid;
