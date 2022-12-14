import React from "react";
import { Breadcrumb, Card, Container } from "react-bootstrap";

const PageLayout = ({ children, page }) => {
  return (
    <Container>
      <Card className="page">
        <Card.Header className="page-header">
          <h2 className="d-flex align-items-center">
            {page.icon}
            <span className="mx-2">{page}</span>
          </h2>
          <hr /> 
        </Card.Header>
        <Card.Body>
          {children}
        </Card.Body>
        <Card.Footer>
        <Breadcrumb id="breadcrumb">
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{page}</Breadcrumb.Item>
        </Breadcrumb>
        </Card.Footer>
      </Card>
      
    </Container>
  );
};

export default PageLayout;