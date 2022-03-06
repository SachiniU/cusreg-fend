import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Customer extends Component{

    constructor(props){
        super(props);
    
        this.state={
            customers:[],
            Customer_Id:0,
            modalTitle:"",
            Customer_Name:"", 
            Customer_Phone:"", 
            Customer_Address:"",  
            Customer_Email:"",
                      
            Customer_NameFilter:"",            
            customersWithoutFilter:[]
        }
    }

    FilterFn(){
        var Customer_NameFilter = this.state.Customer_NameFilter;
        
        var filteredData=this.state.customersWithoutFilter.filter(
            function(el){
                return el.Customer_Name.toString().toLowerCase().includes(
                    Customer_NameFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({customers:filteredData});

    }

    changeCustomerNameFilter = (c)=>{
        this.state.Customer_NameFilter=c.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'customer')
        .then(response=>response.json())
        .then(data=>{
          this.setState({customers:data,customersWithoutFilter:data});
        });
    }
    
    componentDidMount(){
        this.refreshList();
    }

    changeCustomerName =(c)=>{
        this.setState({Customer_Name:c.target.value});
    }

    changeCustomerPhone =(c)=>{
        this.setState({Customer_Phone:c.target.value});
    }

    changeCustomerAddress =(c)=>{
        this.setState({Customer_Address:c.target.value});
    }

    changeCustomerEmail =(c)=>{
        this.setState({Customer_Email:c.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Customer",
            Customer_Id:0,
            Customer_Name:"",
            Customer_Phone:"",
            Customer_Address:"",
            Customer_Email:""
        });
    }

    editClick(cus){
        this.setState({
            modalTitle:"Edit Customer",
            Customer_Id:cus.Customer_Id,
            Customer_Name:cus.Customer_Name,
            Customer_Phone:cus.Customer_Phone,
            Customer_Address:cus.Customer_Address,
            Customer_Email:cus.Customer_Email
        });
    }

    createClick(){
        fetch(variables.API_URL+'customer',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Customer_Name:this.state.Customer_Name,
                Customer_Phone:this.state.Customer_Phone,
                Customer_Address:this.state.Customer_Address,
                Customer_Email:this.state.Customer_Email
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'customer',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Customer_Id:this.state.Customer_Id,
                Customer_Name:this.state.Customer_Name,
                Customer_Phone:this.state.Customer_Phone,
                Customer_Address:this.state.Customer_Address,
                Customer_Email:this.state.Customer_Email
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'customer/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const{
            customers,
            modalTitle,
            Customer_Id,
            Customer_Name, 
            Customer_Phone, 
            Customer_Address, 
            Customer_Email
        }=this.state;
        return(
            <div>
                <br/>
                <h3>Customers</h3>


                <div class="container">
                    <div class="row">
                        
                        <div class="col-sm">
                            <input className="form-control m-2"
                            onChange={this.changeCustomerNameFilter}
                            placeholder="Search by Customer Name"/>
                        </div>
                        
                        <div class="col-sm">
                        
                        </div>

                        <div class="col-sm">
                        
                        </div>
                        
                        <div class="col-sm">
                            <button type="button"
                                className="btn btn-warning m-2 btn-sm float-end"
                                data-bs-toggle="modal"
                                data-bs-target="#customerModal"
                                onClick={()=>this.addClick()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                    </svg>
                                    &nbsp;
                                    Add Customer
                            </button>
                        </div>
                    
                    </div>
                </div>

                
                <table className="table table-hover table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map(cus=>
                        <tr key={cus.Customer_Id}>
                            <td>{cus.Customer_Id}</td>
                            <td>{cus.Customer_Name}</td>
                            <td>{cus.Customer_Phone}</td>
                            <td>{cus.Customer_Address}</td>
                            <td>{cus.Customer_Email}</td>
                            <td>
                                <button type="button"
                                    className="btn btn-outline-primary mr-1 btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#customerModal"
                                    onClick={()=>this.editClick(cus)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>  
                                </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="button"
                                    className="btn btn-outline-danger mr-1 btn-sm"
                                    onClick={()=>this.deleteClick(cus.Customer_Id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </button>
                            </td>
                            

                        </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="customerModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-lable="Close"></button>
                            </div>

                            <form>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Name</span>
                                    <input type="text" className="form-control"
                                    defaultValue={Customer_Name}
                                    onChange={this.changeCustomerName}/>
                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text">Phone</span>
                                    <input type="text" className="form-control"
                                    defaultValue={Customer_Phone}
                                    onChange={this.changeCustomerPhone}/>
                                </div>

                            

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Address</span>
                                    <input type="text" className="form-control"
                                    defaultValue={Customer_Address}
                                    onChange={this.changeCustomerAddress}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Email</span>
                                    <input type="email" className="form-control"
                                    defaultValue={Customer_Email}
                                    onChange={this.changeCustomerEmail}/>
                                </div>

                            </div>

                            <div className="modal-footer">

                                {Customer_Id==0?
                                    <button type="button"
                                    className="btn btn-success btn-sm float-start"
                                    onClick={()=>this.createClick()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save2" viewBox="0 0 16 16">
                                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                                        </svg>
                                        &nbsp;&nbsp;
                                        Save</button>
                                    :null}

                                {Customer_Id!=0?
                                    <button type="button"
                                    className="btn btn-success btn-sm float-start"
                                    onClick={()=>this.updateClick()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                                        </svg>
                                        &nbsp;&nbsp;
                                    Update</button>
                                    :null}
                                
                            </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}