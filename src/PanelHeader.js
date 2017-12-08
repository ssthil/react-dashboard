import React, { Component } from 'react';
import { PanelHeaderNames } from './StaticNamesConfig';

class PanelHeader extends Component {
    render() { 
        const hedaerData  = this.props.panelHeaderData;
        //console.log(hedaerData);
        const key = Object.keys(hedaerData)[0];


        return(
            <div className="panel-heading">
            <table className="table table-layout">
                <tbody>
                    <tr>
                        <td>{PanelHeaderNames[0]}</td>
                        <td>{hedaerData[key].allocationdetail}</td>
                    </tr>
                    <tr>
                        <td>{PanelHeaderNames[1]}</td>
                        <td>{hedaerData[key].version ? hedaerData[key].version : 'No info'}</td>
                    </tr>
                    <tr>
                        <td>{PanelHeaderNames[2]}</td>
                        <td>{hedaerData[key].findbconnstring ? hedaerData[key].findbconnstring : 'No info'}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}

export default PanelHeader;

