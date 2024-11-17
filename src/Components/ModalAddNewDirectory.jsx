import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/edit-modal-new-directory.css'

function EditModalNewDirectory({ show, handleClose }) {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const modalHeaderStyle = {
    backgroundColor: isDarkMode ? "#11012f" : "rgba(201, 206, 250, 0.7)",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center"
  };

  const modalBodyStyle = {
    backgroundColor: isDarkMode ? "#11012f" : "rgba(201, 206, 250, 0.7)"
  };

  const formControlStyle = {
    backgroundColor: isDarkMode ? "#20174dac" : "white",
    border: isDarkMode ? "2px solid rgba(120, 53, 153, 0.485)" : "2px solid rgba(120, 53, 153, 0.485)",
    marginBottom: "0",
    color: isDarkMode ? "white" : "black",  
  };

  const buttonStyle = {
    backgroundColor: isDarkMode ? "rgb(85, 55, 126)" : "rgb(114, 69, 187)",
    border: "none",
    fontSize: "15px",
    width: "68px"
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header style={modalHeaderStyle} closeButton>
        <Modal.Title style={{ backgroundColor: "transparent", color: isDarkMode ? "white" : "black" }}>
          Create new directory
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={modalBodyStyle}>
        <Form style={{ backgroundColor: "transparent" }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ backgroundColor: "transparent", color: isDarkMode ? "white" : "black" }}>
              Title
            </Form.Label>
            <Form.Control 
              style={formControlStyle} 
              type="text" 
              placeholder="Enter a directory name"
              className={isDarkMode ? "dark-placeholder" : "light-placeholder"}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      
      <Modal.Footer 
        style={{
          justifyContent: "left", 
          backgroundColor: isDarkMode ? "#11012f" : "rgba(201, 206, 250, 0.7)", 
          paddingTop: "0"
        }}
      >
        <Button style={buttonStyle} onClick={handleClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModalNewDirectory;
