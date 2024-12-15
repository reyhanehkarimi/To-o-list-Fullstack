import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../styles/responsive-page.css';

function LogOutModal({ show, onHide }) {
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
    const navigate = useNavigate();

    const modalHeaderStyle = {
        backgroundColor: isDarkMode ? "#11012f" : "rgba(201, 206, 250, 0.7)",
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
    };

    const modalBodyStyle = {
        backgroundColor: isDarkMode ? "#11012f" : "rgba(201, 206, 250, 0.7)",
    };

    const buttonStyle = {
        backgroundColor: isDarkMode ? "rgb(85, 55, 126)" : "rgb(114, 69, 187)",
        border: "none",
        fontSize: "15px",
        maxWidth: "100px",
    };

    const handleConfirmLogout = () => {
        navigate("/login");
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header style={modalHeaderStyle} closeButton>
                <Modal.Title style={{ backgroundColor: "transparent", color: isDarkMode ? "white" : "black" }}>
                    Are you sure?
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={modalBodyStyle}>
                Are you sure you want to log out?
            </Modal.Body>

            <Modal.Footer style={modalBodyStyle}>
                <Button
                    style={{
                        backgroundColor: isDarkMode ? "#20174dac" : "rgba(201, 206, 250, 0.7)",
                        border: "none",
                    }}
                    onClick={onHide}
                >
                    Cancel
                </Button>
                <Button style={buttonStyle} onClick={handleConfirmLogout}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogOutModal;
