import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddSaleModal} from './AddSaleModal';
import {EditSaleModal} from './EditSaleModal';

export class Sales extends Component{

    constructor(props){
        super(props);
        this.state = {sales:[], addModalShow : false, editModalShow : false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('https://fonboadingtask1.azurewebsites.net/api/sales')
        //fetch('https://localhost:44354/api/sales')
        .then(response=> response.json())
        .then(data => {
            this.setState({sales:data});
        }
            );
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteSales(saleid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch('https://fonboadingtask1.azurewebsites.net/api/sales/'+saleid, {
            //fetch('https://localhost:44354/api/sales/'+saleid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    render(){

        const {sales, saleid, salecust, salepro, salestore, saledatesold} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});

        return(
            <div>
                <p></p>
                <ButtonToolbar>
        <Button
        variant="primary"
        onClick={()=> this.setState({addModalShow: true})}
        >Create Sales</Button>

        <AddSaleModal
        show={this.state.addModalShow}
        onHide={addModalClose}
        />
    </ButtonToolbar>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Date Sold</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale=>
                        <tr key={sale.id}>
                            
                            <td>{sale.customerName}</td>
                            <td>{sale.productName}</td>
                            <td>{sale.storeName}</td>
                            <td>{sale.dateSold}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={() => this.setState({editModalShow:true, saleid: sale.id, salecust: sale.customerName, salepro: sale.productName, salestore: sale.storeName, saledatesold: sale.dateSold})}
                                    >
                                        EDIT
                                    </Button>

                                    

                                    <EditSaleModal
                                    show = {this.state.editModalShow}
                                    onHide={editModalClose}
                                    
                                    saleid ={saleid}
                                    salecust = {salecust}
                                    salepro = {salepro}
                                    salestore = {salestore}
                                    saledatesold = {saledatesold}
                                    />
                                </ButtonToolbar>
                            </td>
                            <td>
                            <Button className='mr-2'
                                    
                                    onClick={()=>this.deleteSales(sale.id)} variant="danger"
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