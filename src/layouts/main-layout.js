import React from "react";
import Container from "react-bootstrap/Container";
import Navigation from "../components/navigation";
const MainLayout = ({ children }) => {
    return (
        <Container>
            <Navigation />
            <div>{children}</div>
        </Container>
    );
};

export default MainLayout;
