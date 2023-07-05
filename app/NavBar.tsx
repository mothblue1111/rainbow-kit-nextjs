"use client";

import '../app/globals.css'

import { Container, Navbar } from "react-bootstrap";

import { BsExclude } from "react-icons/bs";

export default function NavBar() {
    return (
        <Navbar className="py-3" style={{backgroundColor: '##0c030f', borderBottom: "2px solid #f310e1", fontSize: "1.9rem" }} bg="light" variant="light" sticky="top">
            <Container className="d-flex align-items-center justify-content-center">
                    <BsExclude size={40} className="custom-icon mr-2" />
                    <span className="text-center">DASHBOARD</span>
            </Container>
        </Navbar>
    );
}