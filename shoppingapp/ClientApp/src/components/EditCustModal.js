import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditCustModal extends Component{

    constructor(props){
        super(props);

        this.state = {snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen:false});
    };

    handleSubmit(event){
        event.preventDefault();

        fetch('https://fonboadingtask1.azurewebsites.net/api/customers/' + this.props.custid, {
        //fetch('https://localhost:44354/api/customers/' + this.props.custid, {

            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.Id.value,
                Name: event.target.Name.value,
                Address: event.target.Address.value
            })
        })
        .then(res=> res.json())
        .then((result)=>
        {
            this.setState({snackbaropen:true, snackbarmsg:result})
            //alert(result);
        },
        (error)=>{
            //this.setState({snackbaropen:true, snackbarmsg:'failed'})
            alert('Updated Successfully')
            
        }
        )
    }

    render(){
        return(

            <div className="container">

                <Snackbar
                anchorOrigin={{vertical:'center',horizontal:'center'}}
                open = {this.state.snackbaropen}
                autoHideDuration = {3000}
                
                onClose={this.snackbarClose}

                message = {<span id="message-id">{this.state.snackbarmsg}</span>}
                action={[
                    <IconButton
                    key="close"
                    arial-label="Close"
                    color="inherit"
                    onClick={this.snackbarClose}
                    >
                        x
                    </IconButton>
                ]}
                />
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Id">
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                            type="text"
                            name="Id"
                            required
                            disabled
                            defaultValue = {this.props.custid}
                            placeholder="Id"
 
                            />

                        </Form.Group>
                        
                        <Form.Group controlId="Name">
                            <Form.Label>NAME</Form.Label>
                            <Form.Control
                            type="text"
                            name="Name"
                            required
                            defaultValue = {this.props.custname}
                            placeholder="Name"
 
                            />

                        </Form.Group>
                        <Form.Group controlId="Address">
                            <Form.Label>ADDRESS</Form.Label>
                            <Form.Control
                            type="text"
                            name="Address"
                            required
                            defaultValue = {this.props.custaddress}
                            placeholder="Address"
 
                            />

                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Edit
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    </div>

        )
    }

}