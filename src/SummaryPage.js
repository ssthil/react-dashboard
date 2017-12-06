import React, { Component } from 'react';
import TableHeader from './TableHeader';
import PanelHeader from './PanelHeader';
import PanelFooter from './PanelFooter';

import {Button, Modal} from 'react-bootstrap';
//import data from './data.json';

const testNames = {
    coreServices: "Core Services",
    tradeQuery: "Trade Query",
    workflowsTasks: "Workflows' Tasks",
    dbConnection: "DB Connection"
}

class SummaryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            showModal: false,
            setKeyName: ''
        }
    }

    modalOpen(uid) {
        this.setState({
            showModal: true,
            setKeyName: uid
        })
        
    }

    modalClose() {
        this.setState({
            showModal: false,
            setKeyName: ''
        })
    }

    componentDidMount() {
        /* this.setState({
            data: data
        }) */
        this.fetchData();
    }

    fetchData() {
        fetch('https://api.myjson.com/bins/76rbz')
        .then( data => data.json())
        .then( result => this.setState({
            data: result
        }))
    }

    dynamicClassname(result, key, service) { 
        switch(result[key].healthcheckstatuses[service]) {
            case 9:
                return "warning";
            case 5:
                return "alert";
            case 1:
                return "danger";
            case 0:
                return "success";
            default:
                return null;
        }
    }

    dynamicIconForStatus(result, key, iconStatus) { 
        switch(result[key].healthcheckstatuses[iconStatus]) {
            case 9:
                return <span className="glyphicon glyphicon-exclamation-sign text-warning" aria-hidden="true"></span>;
            case 5:
                return <span className="glyphicon glyphicon-alert text-alert" aria-hidden="true"></span>;
            case 1:
                return <span className="glyphicon glyphicon-minus-sign text-danger" aria-hidden="true"></span>;
            case 0:
                return <span className="glyphicon glyphicon-ok text-success" aria-hidden="true"></span>;
            default:
                return null;
        }
    }

    summaryStatusIcon(result, key) {
        switch(result[key].summarystatus) {
            case 0:
                return <span className="glyphicon glyphicon-ok text-success" aria-hidden="true"></span>;
            case 1:
                return <span className="glyphicon glyphicon-minus-sign text-danger" aria-hidden="true"></span>;
            case 5:
                return <span className="glyphicon glyphicon-alert text-alert" aria-hidden="true"></span>;
            default:
                return null;
        }
    }

    getInitialState() {
        return { showModal: true };
    }

    showModal() {
        this.setState({ show: true }); 
    }

    render() {
        const Results = this.state.data.map( (result, i) => {
            const key = Object.keys(result)[0]
            //console.log(i);
            return (
                <div className="col-lg-4 col-md-6 col-sm-6" key={i}>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <p>Logical Resource Name: <span>{key} </span></p>
                        </div>
                        <div className="panel-body">
                            <table className="table table-layout">
                                <tbody>
                                    <tr>
                                        <td>Logical Resource Usage</td>
                                        <td>{result[key].allocationdetail}</td>
                                    </tr>
                                    <tr>
                                        <td>Version</td>
                                        <td>{result[key].version}</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>{this.summaryStatusIcon(result, key)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="panel-footer">
                            <button className="btn btn-primary" onClick={()=> this.modalOpen(i)}>More details</button>
                        </div>
                    </div>
                    {
                        i === this.state.setKeyName && ( 
                            <Modal show onHide={() =>this.modalClose()}>
                            <Modal.Header closeButton>
                                <Modal.Title>{key}</Modal.Title>
                            </Modal.Header>
                            <PanelHeader panelHeaderData = {result}/>
                            <Modal.Body>
                                
                                <table className="table table-bordered">
                                    <TableHeader />
                                    <tbody>     
                                    <tr className={this.dynamicClassname(result, key, 'servicescheck')}>
                                        <td>{testNames.coreServices}</td>
                                        <td>{this.dynamicIconForStatus(result, key, "servicescheck")}</td>
                                        <td>{result[key].healthcheckstatuses.servicescheck_ts}</td>
                                    </tr>
                                    <tr className={this.dynamicClassname(result, key, 'tradeqcheck')}>
                                        <td>{testNames.tradeQuery}</td>
                                        <td>{this.dynamicIconForStatus(result, key, "tradeqcheck")}</td>
                                        <td>{result[key].healthcheckstatuses.tradeqcheck_ts}</td>
                                    </tr>
                                    <tr className={this.dynamicClassname(result, key, 'wkflowstaskcheck')}>
                                        <td>{testNames.workflowsTasks}</td>
                                        <td>{this.dynamicIconForStatus(result, key, "wkflowstaskcheck")}</td>
                                    <td>{result[key].healthcheckstatuses.wkflowstaskcheck_ts}</td>
                                    </tr>
                                    <tr className={this.dynamicClassname(result, key, 'dbaccesscheck')}>
                                        <td>{testNames.dbConnection}</td>
                                        <td>{this.dynamicIconForStatus(result, key, "dbaccesscheck")}</td>
                                    <td>{result[key].healthcheckstatuses.dbaccesscheck_ts}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="owner-list">
                                    <h5>Owner List</h5>
                                    <hr />
                                    {result[key].ownerlist.map((name, i) => (
                                        <p key={i}>{name}</p>
                                    ))}
                                </div>
                                
                            </Modal.Body>
                            <PanelFooter panelFooterData = {result}/>
                            <Modal.Footer>
                                <Button onClick={() =>this.modalClose()}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        )
                    }
                    
                </div>
            )
        });

        return(
            <div>{Results}</div>
        )
    }
}

export default SummaryPage;