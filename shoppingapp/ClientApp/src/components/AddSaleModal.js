import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddSaleModal extends Component{
    constructor(props){
        super(props);

        this.state = {custs:[], pros:[], stos:[], snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        //fetch('https://localhost:44354/api/customers')
        fetch('https://fonboadingtask1.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => {
            this.setState({custs:data});
        });

        //fetch('https://localhost:44354/api/products')
        fetch('https://fonboadingtask1.azurewebsites.net/api/products')
        .then(response => response.json())
        .then(data => {
            this.setState({pros:data});
        });

        //fetch('https://localhost:44354/api/stores')
        fetch('https://fonboadingtask1.azurewebsites.net/api/stores')
        .then(response => response.json())
        .then(data => {
            this.setState({stos:data});
        });
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen:false});
    };
    
    handleSubmit(event){
        event.preventDefault();

        fetch('https://fonboadingtask1.azurewebsites.net/api/sales', {
        //fetch('https://localhost:44354/api/sales', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
    //           ProductName: event.target.ProductName.value,
      //          CustomerName: event.target.CustomerName.value,
        //        StoreName: event.target.StoreName.value,
                
                productId: event.target.ProductName.value,
                customerId: event.target.CustomerName.value,
                storeId: event.target.StoreName.value,
                dateSold: event.target.DateSold.value
            })
        })
        .then(res=> res.json())
        .then((result)=>
        {
            //this.setState({snackbaropen:true, snackbarmsg:result})

            alert('Created Successfully');
        },
        (error)=>{
            //this.setState({snackbaropen:true, snackbarmsg:'failed'})
            alert('Failed')
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
          Create sales
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="DateSold">
                            <Form.Label>Date sold</Form.Label>
                            <Form.Control
                            type="date"
                            name="DateSold"
                            required
                            placeholder="DateSold"
 
                            />

                        </Form.Group>
                        <Form.Group controlId="CustomerName">
                            <Form.Label>Customer</Form.Label>
                            <Form.Control as="select">
                                {this.state.custs.map(cust =>
                                    <option key={cust.id} Value = {cust.id}>{cust.name}</option>
                                    )}
                            </Form.Control>

                        </Form.Group>

                        <Form.Group controlId="ProductName">
                            <Form.Label>Product</Form.Label>
                            <Form.Control as="select">
                                {this.state.pros.map(pro =>
                                    <option key={pro.id} Value = {pro.id}>{pro.name}</option>
                                    )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="StoreName">
                            <Form.Label>Store</Form.Label>
                            <Form.Control as="select">
                                {this.state.stos.map(sto =>
                                    <option key={sto.id} Value = {sto.id}>{sto.name}</option>
                                    )}
                            </Form.Control>

                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Create
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