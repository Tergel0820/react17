import React, { useState } from "react";
import "./style.css";
import axios from "../../axios";
import { toast } from "react-toastify";
import { Button, Modal, FormControl } from "react-bootstrap";

const AjiltanEdit = ({ name, id }) => {
  const [inputValueEdit, setInputValueEdit] = useState(name);

  const [showUstgah, setShowUstgah] = useState(false);
  const handleCloseUstgah = () => setShowUstgah(false);
  const handleShowUstgah = () => setShowUstgah(true);

  const [showZasah, setShowZasah] = useState(false);
  const handleCloseZasah = () => setShowZasah(false);
  const handleShowZasah = () => setShowZasah(true);

  const deleteHandler = async () => {
    try {
      await axios
        .delete(`employees/${id}`)
        .then(() => {
          toast.success("Амжилттай устгалаа");
          window.location.reload();
        })
        .catch((err) => toast.success(`Алдаа: ${err.response}`));
    } catch (error) {
      toast.error(`Алдаа: ${error}`);
    }
  };
  const updateHandler = async () => {
    try {
      await axios
        .put(`employees/${id}`, {
          name: inputValueEdit,
        })
        .then(() => {
          toast.success("Амжилттай заслаа");
          window.location.reload();
        })
        .catch((err) => toast.success(`Алдаа: ${err.response}`));
    } catch (error) {
      toast.error(`Алдаа: ${error}`);
    }
  };
  function handleInputChange(event) {
    setInputValueEdit(event.target.value);
  }
  return (
    <div className="ajiltan-item gap-4 mt-4 shadow">
      <div className="ajiltanName">{name}</div>
      <div className="actionsButtons">
        <Button variant="outline-secondary" className="aBtn" onClick={() => handleShowZasah()}>
          Засах
        </Button>
        <Button variant="danger" onClick={() => handleShowUstgah()}>
          Устгах
        </Button>
      </div>
      <Modal show={showUstgah} onHide={handleCloseUstgah}>
        <Modal.Header closeButton>
          <Modal.Title>Ажилтан устгах</Modal.Title>
        </Modal.Header>
        <Modal.Body>Та энэ ажилтанг устгахдаа итгэлтэй байна уу?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteHandler}>
            Устгах
          </Button>
          <Button variant="outline-secondary" onClick={handleCloseUstgah}>
            Болих
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showZasah} onHide={handleCloseZasah}>
        <Modal.Header closeButton>
          <Modal.Title>Ажилтан засах</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl placeholder="Ажилтны нэр..." onChange={handleInputChange} name="customer" value={inputValueEdit} className="mt-3" />
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
    </div>
  );
};

export default AjiltanEdit;
