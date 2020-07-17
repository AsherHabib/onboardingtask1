import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddStoreModal} from './AddStoreModal';
import {EditStoreModal} from './EditStoreModal';

export class Store extends Component{

    constructor(props){
        super(props);
        this.state = {stos:[], addModalShow : false, editModalShow : false}
    }
    
    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('https://fonboadingtask1.azurewebsites.net/api/stores')
        //fetch('https://localhost:44354/api/stores')
        .then(response=> response.json())
        .then(data => {
            this.setState({stos:data});
        }
            );
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteSto(stoid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch('https://fonboadingtask1.azurewebsites.net/api/stores/'+stoid,{
            //fetch('https://localhost:44354/api/stores/'+stoid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    render(){

        const {stos, stoid, stoname, stoaddress} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});

        return(
            <div>
            <p></p>
            <ButtonToolbar>
    <Button
    variant="primary"
    onClick={()=> this.setState({addModalShow: true})}
    >New Store</Button>

    <AddStoreModal
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
                {stos.map(sto=>
                    <tr key={sto.id}>
                        
                        <td>{sto.name}</td>
                        <td>{sto.address}</td>
                        <td>
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info"
                                onClick={() => this.setState({editModalShow:true, stoid: sto.id, stoname: sto.name, stoaddress: sto.address})}
                                >
                                    EDIT
                                </Button>

                                

                                <EditStoreModal
                                show = {this.state.editModalShow}
                                onHide={editModalClose}
                                stoid = {stoid}
                                stoname = {stoname}
                                stoaddress = {stoaddress}
                                />
                            </ButtonToolbar>
                        </td>
                        <td>
                        <Button className='mr-2'
                                
                                onClick={()=>this.deleteSto(sto.id)} variant="danger"
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