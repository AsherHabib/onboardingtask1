import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddCustModal } from './AddCustModal';
import { EditCustModal } from './EditCustModal';

export class Customer extends Component{

    constructor(props){
        super(props);
        this.state = {custs:[], addModalShow : false, editModalShow : false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        //fetch('https://localhost:44354/api/customers')
        fetch('https://fonboadingtask1.azurewebsites.net/api/customers')
        .then(response=> response.json())
        .then(data => {
            this.setState({custs:data});
        }
            );
    }


    componentDidUpdate(){
        this.refreshList();
    }

    deleteCust(custid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch('https://fonboadingtask1.azurewebsites.net/api/customers/'+custid, {
            //fetch('https://localhost:44354/api/customers/'+custid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    render(){
        
        const {custs, custid, custname, custaddress} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});

        
        return(
            <div>
                <p></p>
                <ButtonToolbar>
        <Button
        variant="primary"
        onClick={()=> this.setState({addModalShow: true})}
        >New Customer</Button>

        <AddCustModal
        show={this.state.addModalShow}
        onHide={addModalClose}
        />
    </ButtonToolbar>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {custs.map(cust=>
                        <tr key={cust.Id}>
                            
                            <td>{cust.name}</td>
                            <td>{cust.address}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={() => this.setState({editModalShow:true, custid: cust.id, custname: cust.name, custaddress: cust.address})}
                                    >
                                        EDIT
                                    </Button>

                                    

                                    <EditCustModal
                                    show = {this.state.editModalShow}
                                    onHide={editModalClose}
                                    custid = {custid}
                                    custname = {custname}
                                    custaddress = {custaddress}
                                    />
                                </ButtonToolbar>
                            </td>
                            <td>
                            <Button className='mr-2'
                                    
                                    onClick={()=>this.deleteCust(cust.id)} variant="danger"
                                    >DELETE</Button>
                            </td>
                        </tr>
                        )}
                </tbody>
            </Table>


</div>
        )
    }
}