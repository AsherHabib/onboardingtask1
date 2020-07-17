import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

export class Customerid extends Component{
    constructor(props){
        super(props);
        this.state = {custs:[]}
    }

    refreshList(){
        this.setState({

            custs:[{"Id":1,"Name":"Asher","Address":"address1"},
            {"Id":2,"Name":"Amoon","Address":"address1"}]
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    render(){

        const {custs} = this.state;
        return(
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {custs.map(cust=>
                        <tr key={cust.Id}>
                            <td>{cust.Id}</td>
                            <td>{cust.Name}</td>
                            <td>{cust.Address}</td>
                        </tr>
                        )}
                </tbody>
            </Table>
        )
    }
}