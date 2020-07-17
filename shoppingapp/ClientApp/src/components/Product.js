import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddProdModal} from './AddProdModal';
import {EditProdModal} from './EditProdModal';

export class Product extends Component{

    constructor(props){
        super(props);
        this.state = {pros:[], addModalShow : false, editModalShow : false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('https://fonboadingtask1.azurewebsites.net/api/products')
        //fetch('https://localhost:44354/api/products')
        .then(response=> response.json())
        .then(data => {
            this.setState({pros:data});
        }
            );
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletePro(proid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch('https://fonboadingtask1.azurewebsites.net/api/products/'+proid, {
            //fetch('https://localhost:44354/api/products/'+proid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    render(){

        const {pros, proid, proname, proprice} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});

        return(
            <div>
            <p></p>
            <ButtonToolbar>
        <Button
        variant="primary"
        onClick={()=> this.setState({addModalShow: true})}
        >New Product</Button>

        <AddProdModal
        show={this.state.addModalShow}
        onHide={addModalClose}
        />
    </ButtonToolbar>
        <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {pros.map(pro=>
                    <tr key={pro.id}>
                        
                        <td>{pro.name}</td>
                        <td>{pro.price}</td>
                        <td>
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info"
                                onClick={() => this.setState({editModalShow:true, proid: pro.id, proname: pro.name, proprice: pro.price})}
                                >
                                    EDIT
                                </Button>

                                

                                <EditProdModal
                                show = {this.state.editModalShow}
                                onHide={editModalClose}
                                proid = {proid}
                                proname = {proname}
                                proprice = {proprice}
                                
                                />
                            </ButtonToolbar>
                        </td>
                        <td>
                        <Button className='mr-2'
                                
                                onClick={()=>this.deletePro(pro.id)} variant="danger"
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