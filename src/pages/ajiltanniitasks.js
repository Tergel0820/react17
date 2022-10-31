import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import useTasks from "../hooks/useTasks";
// import useTasksForUsers from "../hooks/useTasksForUsers";
import { toast } from "react-toastify";
import { Row, Col, Table, FormControl, Form, Button, Alert, Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

const AjiltanTasks = (props) => {
  const { id, empName } = useParams();
  const [page, setPage] = useState(1);
  const [empTaskCount, setEmpTaskCount] = useState([]);
  const limit = 50;
  const [today, setToday] = useState(moment().toISOString());
  const [thisWeek, setThisWeek] = useState(moment().toISOString());

  const todayEnd = moment(today).utc(new Date()).endOf("day").toISOString();
  const todayStart = moment(today).utc(new Date()).startOf("day").toISOString();

  const [thatErrorMessage, setThatErrorMessage] = useState(null);
  const [checkData, setCheckData] = useState(0);

  const [taskId, setTaskId] = useState("");

  const [showZasah, setShowZasah] = useState(false);
  const handleCloseZasah = () => setShowZasah(false);
  const handleShowZasah = () => setShowZasah(true);

  const [daySelectorActive, setDaySelectorActive] = useState({
    day1: true,
    day2: false,
    day3: false,
    day4: false,
    day5: false,
    day6: false,
    day7: false,
  });

  const [employeeTaksData] = useTasks(page, limit, todayStart, todayEnd, id, today, thisWeek, checkData);
  //tuhain odriin niit bvrtgeliig awah
  useEffect(() => {
    axios
      .get(`/tasks?page=${page}&limit=${limit}&start=${todayStart}&end=${todayEnd}&sort=date`)
      .then((result) => {
        setEmpTaskCount(result.data.data);
        // setPagination(result.data.pagination);
      })
      .catch((err) => toast.error(`Алдаа: ${err.response}`));
  }, [page, limit, todayStart, todayEnd]);

  const [employeeData, setEmployeeData] = useState([]);

  const [burtgel, setBurtgel] = useState({
    customer: "",
    note: "",
    arrived: "",
    payment: "",
    date: moment(today).toISOString(),
    employee: id,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setThatErrorMessage(null);
    setCheckData(checkData + 1);
    setBurtgel({
      ...burtgel,
      [event.target.name]: value,
    });
  };

  // console.log(today + "Өнөөдөр");
  // console.log(thisWeek + "7 хоног");
  // console.log(burtgel.date + "burgel date");

  // console.log(todayEnd, " ------------------ Today start")
  // console.log(todayEnd, " ------------------ Today start")

  const tsagBurtgeh = async () => {
    if (burtgel.customer === "") {
      toast.warning("Утасны дугаарыг оруулна уу!!");
      return;
    }
    try {
      await axios
        .post(`tasks`, burtgel)
        .then(() => {
          toast.success("Бүртгэл амжилттай");
          setCheckData(checkData + 1);
        })
        .catch((err) => toast.warning(`Алдаа: ${err.response.data.error.message}`));
    } catch (error) {
      toast.error(`Алдаа: ${error}`);
    }
  };

  const NextWeekHandler = () => {
    setThisWeek(moment(thisWeek).add(1, "week").toISOString());
    setDaySelectorActive({
      ...daySelectorActive[false],
    });
  };
  const PrevWeekHandler = () => {
    setThisWeek(moment(thisWeek).subtract(1, "week").toISOString());
    setDaySelectorActive({
      ...daySelectorActive[false],
    });
  };

  const thisDay = () => {
    setThisWeek(moment().toISOString());
    setToday(moment().toISOString());
    setDaySelectorActive({
      ...daySelectorActive[false],
      day1: true,
    });
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const startPage = () => {
    setPage(1);
  };

  useEffect(() => {
    axios
      .get(`employees`)
      .then((result) => {
        setEmployeeData(result.data.data);
      })
      .catch((err) => toast.error(`Алдаа: ${err.response}`));
  }, []);

  const paginationBasic = (
    <div className="paginationsButtons">
      <Button className="paginationStart" variant="outline-secondary" onClick={() => startPage()}>
        Эхний хуудас
      </Button>
      <Button className="paginationNext" variant="outline-secondary" onClick={() => prevPage()}>
        Өмнөх
      </Button>
      <span className="paginationPageNumber">{"Хуудас " + page}</span>
      <Button className="paginationPrev" variant="outline-secondary" onClick={() => nextPage()}>
        Дараах
      </Button>
    </div>
  );
  const dateExtractor = (userSelectedDate) => {
    let dayEng = moment(userSelectedDate).format("dddd");
    const mongoldate = () => {
      if (dayEng === "Monday") return "Даваа";
      if (dayEng === "Tuesday") return "Мягмар";
      if (dayEng === "Wednesday") return "Лхагва";
      if (dayEng === "Thursday") return "Пүрэв";
      if (dayEng === "Friday") return "Баасан";
      if (dayEng === "Saturday") return "Бямба";
      if (dayEng === "Sunday") return "Ням";
    };
    return (
      <div>
        <div className="sMount">{moment(userSelectedDate).format("MM") + " сарын"}</div>
        <div className="sDay">{moment(userSelectedDate).format("DD")}</div>
        <div className="ssDay">{mongoldate()}</div>
        <div className="sYear">{moment(userSelectedDate).format("YYYY")}</div>
      </div>
    );
  };

  const updateHandler = async () => {
    try {
      await axios
        .patch(`tasks/${taskId}`, {
          ...burtgel,
        })
        .then(() => {
          toast.success("Амжилттай заслаа.");
          setCheckData(checkData + 1);
          handleCloseZasah();
        })
        .catch((err) => toast.error(`Алдаа: ${err.response}`));
    } catch (error) {
      toast.error(`Алдаа: ${error}`);
    }
  };
  return (
    <div>
      <Modal show={showZasah} onHide={handleCloseZasah}>
        <Modal.Header closeButton>
          <Modal.Title>Цаг бүртгэл засах</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {thatErrorMessage ? (
            <Alert variant="warning" className="mt-2">
              {thatErrorMessage}
            </Alert>
          ) : null}
          <FormControl placeholder="Утасны дугаар" onChange={handleChange} name="customer" value={burtgel.customer} className="mt-3" />
          <FormControl placeholder="Тэмдэглэл" className="mt-3" name="note" onChange={handleChange} value={burtgel.note} />
          <div className="mt-3">Ирсэн эсэх</div>
          <Form.Select aria-label="Ирсэн эсэх" name="arrived" onChange={handleChange}>
            <option></option>
            <option value="Тийм">Тийм</option>
            <option value="Үгүй">Үгүй</option>
          </Form.Select>
          <div className="mt-3">Төлбөр</div>
          <Form.Select aria-label="Төлбөр" name="payment" onChange={handleChange}>
            <option value=""></option>
            <option value="Бүрэн">Бүрэн</option>
            <option value="Дутуу">Дутуу</option>
          </Form.Select>
          <Form.Select aria-label="Хариуцсан ажилтан" name="employee" onChange={handleChange} className="mt-3">
            {employeeData.map((el) => (
              <option value={el._id} key={el._id} selected={el._id === id ? true : false}>
                {el.name}
              </option>
            ))}
          </Form.Select>
          <div>
            <TextField
              id="datetime-local"
              type="datetime-local"
              className="mt-3"
              defaultValue={moment(burtgel.date).toISOString().slice(0, 16)}
              name="date"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={updateHandler}>
            Засах
          </Button>
          <Button variant="outline-secondary" onClick={handleCloseZasah}>
            Болих
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mb-3">
        {
          <Row className="daySelectorContainer">
            <Col
              className={daySelectorActive.day1 ? "daySelector firstDay" : "daySelector"}
              onClick={() => {
                setToday(moment(thisWeek).add(0, "day").toISOString());
                setDaySelectorActive({
                  ...daySelectorActive[false],
                  day1: true,
                });
              }}
            >
              {dateExtractor(moment(thisWeek).add(0, "day").toISOString())}
            </Col>
            <Col
              className={daySelectorActive.day2 ? "daySelector firstDay" : "daySelector"}
              onClick={() => {
                setToday(moment(thisWeek).add(1, "day").toISOString());
                setDaySelectorActive({
                  ...daySelectorActive[false],
                  day2: true,
                });
              }}
            >
              {dateExtractor(moment(thisWeek).add(1, "day").toISOString())}
            </Col>
            <Col
              className={daySelectorActive.day3 ? "daySelector firstDay" : "daySelector"}
              onClick={() => {
                setToday(moment(thisWeek).add(2, "day").toISOString());
                setDaySelectorActive({
                  ...daySelectorActive[false],
                  day3: true,
                });
              }}
            >
              {dateExtractor(moment(thisWeek).add(2, "day").toISOString())}
            </Col>
            <Col
              className={daySelectorActive.day4 ? "daySelector firstDay" : "daySelector"}
              onClick={() => {
                setToday(moment(thisWeek).add(3, "day").toISOString());
                setDaySelectorActive({
                  ...daySelectorActive[false],
                  day4: true,
                });
              }}
            >
              {dateExtractor(moment(thisWeek).add(3, "day").toISOString())}
            </Col>
            <Col
              className={daySelectorActive.day5 ? "daySelector firstDay" : "daySelector"}
              onClick={() => {
                setToday(moment(thisWeek).add(4, "day").toISOString());
                setDaySelectorActive({
                  ...daySelectorActive[false],
                  day5: true,
                });
              }}
            >
              {dateExtractor(moment(thisWeek).add(4, "day").toISOString())}
            </Col>
            <Col
              className={daySelectorActive.day6 ? "daySelector firstDay" : "daySelector"}
              onClick={() => {
                setToday(moment(thisWeek).add(5, "day").toISOString());
                setDaySelectorActive({
                  ...daySelectorActive[false],
                  day6: true,
                });
              }}
            >
              {dateExtractor(moment(thisWeek).add(5, "day").toISOString())}
            </Col>
            <Col
              className={daySelectorActive.day7 ? "daySelector firstDay" : "daySelector"}
              onClick={() => {
                setToday(moment(thisWeek).add(6, "day").toISOString());
                setDaySelectorActive({
                  ...daySelectorActive[false],
                  day7: true,
                });
              }}
            >
              {dateExtractor(moment(thisWeek).add(6, "day").toISOString())}
            </Col>
          </Row>
        }

        <div className="filterControllersEmpName">
          <div>
            <Button className="mr15" onClick={PrevWeekHandler}>
              Өмнөх 7 хоног
            </Button>
            <Button className="mr15" onClick={NextWeekHandler}>
              Дараа 7 хоног
            </Button>
            <Button onClick={thisDay}>Өнөөдөр</Button>
          </div>
          <h3>{empName}</h3>
        </div>
      </div>
      {/* DateFilter END */}
      <Row>
        <Col md={8}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Цаг</th>
                <th>Үйлчлүүлэгч</th>
                <th>Ирсэн</th>
                <th>Төлбөр</th>
                <th>Тэмдэглэл</th>
              </tr>
            </thead>
            <tbody>
              {employeeTaksData.map((task) => (
                <tr
                  key={task._id}
                  onClick={() => {
                    handleShowZasah();
                    setTaskId(task._id);
                    setBurtgel({
                      ...burtgel,
                      customer: task.customer,
                      note: task.note,
                      arrived: task.arrived,
                      payment: task.payment,
                      date: task.date,
                    });
                  }}
                >
                  <td>{task.date !== "" || null ? moment(task.date).toISOString().slice(11, 16) : ""}</td>
                  <td>{task.customer}</td>
                  <td>{task.arrived}</td>
                  <td>{task.payment}</td>
                  <td>{task.note}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {paginationBasic}
        </Col>

        <Col md={4} className="p-3 pt-0">
          <div className="tsagburtgehtitle">Цаг бүртгэх</div>
          {thatErrorMessage ? (
            <Alert variant="warning" className="mt-2">
              {thatErrorMessage}
            </Alert>
          ) : null}
          <FormControl placeholder="Утасны дугаар" onChange={handleChange} name="customer" value={burtgel.customer} className="mt-3" />
          <FormControl placeholder="Тэмдэглэл" className="mt-3" name="note" onChange={handleChange} value={burtgel.note} />
          <div className="mt-3">Ирсэн эсэх</div>
          <Form.Select aria-label="Ирсэн эсэх" name="arrived" onChange={handleChange}>
            <option></option>
            <option value="Тийм">Тийм</option>
            <option value="Үгүй">Үгүй</option>
          </Form.Select>
          <div className="mt-3">Төлбөр</div>
          <Form.Select aria-label="Төлбөр" name="payment" onChange={handleChange}>
            <option></option>
            <option value="Бүрэн">Бүрэн</option>
            <option value="Дутуу">Дутуу</option>
          </Form.Select>

          <div>
            <TextField
              id="datetime-local"
              type="datetime-local"
              className="mt-3"
              defaultValue={today.slice(0, 16)}
              name="date"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <Button onClick={() => tsagBurtgeh()} variant="primary" className="mt-3 float-right">
            Нэмэх
          </Button>
        </Col>
      </Row>
      <h3 className="mt-4">Тухайн өдрийн ажилтны ачаалал</h3>
      <Row md={5} className="mt-4 mb-4 emptask-container">
        {employeeData.map((ajiltan) => {
          let ajiltanii_tuhain_odriin_task = 0;

          empTaskCount.map((elm) => {
            return elm.employee ? (elm.employee.name === ajiltan.name ? (ajiltanii_tuhain_odriin_task = ajiltanii_tuhain_odriin_task + 1) : (ajiltanii_tuhain_odriin_task = ajiltanii_tuhain_odriin_task + 0)) : (ajiltanii_tuhain_odriin_task = ajiltanii_tuhain_odriin_task + 0);
          });

          return (
            <Col key={ajiltan._id} className="border p-3 emptask-item">
              <a href={`/ajiltan/${ajiltan._id}/${ajiltan.name}`} className="m-2">
                <span className="emptask-count-empname">{ajiltan.name}</span>
                <span className="emptask-count-text">{ajiltanii_tuhain_odriin_task}</span>
              </a>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default AjiltanTasks;
