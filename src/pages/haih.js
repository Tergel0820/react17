import React, { Fragment, useEffect, useState } from "react";
import { InputGroup, FormControl, Button, Table, Modal, Spinner } from "react-bootstrap";
import axios from "../axios";
import moment from "moment";
import { toast } from "react-toastify";
import Restricted from "../components/restricted";
import TextField from "@material-ui/core/TextField";

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Haih = ({ token }) => {
  const [tasksData, setTasksData] = useState([]);
  const [archiveData, setArchiveData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [pagination, setPagination] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeItems, setChangeItems] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [page, setPage] = useState(1);
  const limit = 8;
  const archiveLimit = 1000000;

  const today = moment().toISOString();
  const [start, setStart] = useState(moment(today).subtract(2, "months").utc(new Date()).startOf("month").toISOString());
  const [end, setEnd] = useState(moment(today).utc(new Date()).endOf("month").toISOString());

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("salon")) {
      try {
        axios
          .get(`tasks?search=${inputValue}&page=${page}&limit=${limit}&start=${start}&end=${end}&sort=-date`)
          .then((result) => {
            setTasksData(result.data.data);
            setPagination(result.data.pagination);
            setLoading(false);
          })
          .catch((error) => {
            toast.error(`Алдаа: ${error.data.error.message}`);
            setLoading(false);
          });
      } catch (error) {
        toast.error(`Алдаа: ${error}`);
      }
    }
  }, [inputValue, page, limit, token, changeItems, start, end]);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("salon")) {
      try {
        axios
          .get(`tasks?search=${inputValue}&page=${page}&limit=${archiveLimit}&start=${start}&end=${end}&sort=-date`)
          .then((result) => {
            setArchiveData(result.data.data);
            setLoading(false);
          })
          .catch((error) => {
            toast.error(`Алдаа: ${error.data.error.message}`);
            setLoading(false);
          });
      } catch (error) {
        toast.error(`Алдаа: ${error}`);
      }
    }
  }, [inputValue, page, limit, token, changeItems, start, end]);

  const deleteHandler = async () => {
    try {
      await axios
        .delete(`tasks/${deleteId}`)
        .then(() => {
          setChangeItems(changeItems + 1);
          toast.success(`Амжилттай устгалаа`);
        })
        .catch((err) => toast.error(`Алдаа: ${err.response}`));
    } catch (error) {
      toast.error(`Алдаа: ${error}`);
    }
  };

  function onSearchHandle(event) {
    setInputValue(event.target.value);
  }

  const nextPage = () => {
    if (Math.ceil(pagination.total / limit) > page) setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const startPage = () => {
    setPage(1);
  };

  archiveData.map((el) => {
    if (el.employee == null) {
      el.employee = { name: "------------" };
    }
    return (el.empName = el.employee.name);
  });

  const paginationBasic = (
    <div>
      <div className="paginationsButtonsHaih">
        <Button className="paginationStart" variant="outline-secondary" onClick={() => startPage()}>
          Эхний хуудас
        </Button>
        <Button className="paginationNext" variant="outline-secondary" onClick={() => prevPage()}>
          Өмнөх
        </Button>
        <span className="paginationPageNumber">{" Хуудас " + page + "/" + Math.ceil(pagination.total / limit)}</span>
        <Button className="paginationPrev" variant="outline-secondary" onClick={() => nextPage()}>
          Дараах
        </Button>
      </div>
      <div className="filterDate">
        <TextField
          id="datetime-start"
          type="date"
          defaultValue={start.slice(0, 10)}
          name="date"
          onChange={startHandler}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="datetime-end"
          type="date"
          defaultValue={end.slice(0, 10)}
          name="date"
          onChange={endHandler}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <ExcelFile element={<button>Бүх дата-г татаж авах</button>}>
        <ExcelSheet data={archiveData} name="Employees">
          <ExcelColumn label="Огноо" value="date" />
          <ExcelColumn label="Үйлчлүүлэгч" value="customer" />
          <ExcelColumn label="Х/Ажилтан" value="empName" />
          <ExcelColumn label="Ирсэн" value="arrived" />
          <ExcelColumn label="Төлбөр" value="payment" />
          <ExcelColumn label="Тэмдэглэл" value="note" />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );

  function endHandler(e) {
    setEnd(e.target.value);
  }
  function startHandler(e) {
    setStart(e.target.value);
  }
  return (
    <Fragment>
      {localStorage.getItem("salon") ? (
        <div>
          <InputGroup onChangeCapture={onSearchHandle} className="mb-3" size="md">
            <FormControl placeholder="Хайх үгээ энд оруулна уу..." />
            <Button variant="primary">Хайх</Button>
          </InputGroup>
          {paginationBasic}
          {loading && (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Огноо</th>
                <th>Үйлчлүүлэгч</th>
                <th>Х/Ажилтан</th>
                <th>Ирсэн</th>
                <th>Төлбөр</th>
                <th>Тэмдэглэл</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {tasksData &&
                tasksData.map((task) => (
                  <tr key={task._id}>
                    <td>{task.date !== "" || null ? moment(task.date).toISOString().slice(0, 16).replace("T", " ...... ") : ""}</td>
                    <td>{task.customer}</td>
                    <td>{task.employee !== null ? task.employee.name : ""}</td>
                    <td>{task.arrived}</td>
                    <td>{task.payment}</td>
                    <td>{task.note}</td>
                    <td>
                      <div className="hailtUstgahBtns">
                        <Button
                          variant="danger"
                          onClick={() => {
                            setDeleteId(task._id);
                            handleShow();
                          }}
                        >
                          Устгах
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Ажилтан устгах</Modal.Title>
            </Modal.Header>
            <Modal.Body>Бүртгэлийг устгахдаа итгэлтэй байна уу?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => {
                  deleteHandler();
                  handleClose();
                }}
              >
                Устгах
              </Button>
              <Button variant="outline-secondary" onClick={handleClose}>
                Болих
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <Restricted />
      )}
    </Fragment>
  );
};

export default Haih;