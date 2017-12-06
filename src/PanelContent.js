import React, { Component } from 'react';
import TableHeader from './TableHeader';
import PanelHeader from './PanelHeader';
import PanelFooter from './PanelFooter';

import data from './data.json';

class PanelContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount() {
        this.setState({
            data: data
        })
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

    render() { 
       // console.log(this.state.data)
        const Results = this.state.data.map( (result, i) => {
            const key = Object.keys(result)[0]
            return (
                <div className="col-lg-4 col-md-6 col-sm-6" key={i}>
                <div class="page-header">
                    <h3>{key}</h3>
                </div>
                <div className="panel panel-default">
                    <PanelHeader panelHeaderData = {result}/>
                    <div className="panel-body">
                    <table className="table table-bordered">
                        <TableHeader />
                        <tbody>     
                        <tr className={this.dynamicClassname(result, key, 'servicescheck')}>
                            <td>Core Services</td>
                            <td>{this.dynamicIconForStatus(result, key, "servicescheck")}</td>
                            <td>{result[key].healthcheckstatuses.servicescheck_ts}</td>
                        </tr>
                        <tr className={this.dynamicClassname(result, key, 'tradeqcheck')}>
                            <td>Trade Query</td>
                            <td>{this.dynamicIconForStatus(result, key, "tradeqcheck")}</td>
                            <td>{result[key].healthcheckstatuses.tradeqcheck_ts}</td>
                        </tr>
                        <tr className={this.dynamicClassname(result, key, 'wkflowstaskcheck')}>
                            <td>Workflows' Tasks</td>
                            <td>{this.dynamicIconForStatus(result, key, "wkflowstaskcheck")}</td>
                        <td>{result[key].healthcheckstatuses.wkflowstaskcheck_ts}</td>
                        </tr>
                        <tr className={this.dynamicClassname(result, key, 'dbaccesscheck')}>
                            <td>DB Connection</td>
                            <td>{this.dynamicIconForStatus(result, key, "dbaccesscheck")}</td>
                        <td>{result[key].healthcheckstatuses.dbaccesscheck_ts}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <PanelFooter panelFooterData = {result}/>
            </div>
            </div>
            )
        });
        return( 
            <div>{Results}</div>
        )
    }
}

export default PanelContent;