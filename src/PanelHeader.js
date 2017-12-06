import React, { Component } from 'react';

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
                        <td>{hedaerData[key].allocationdetail}</td>
                        <td>{hedaerData[key].version}</td>
                    </tr>
                    <tr>
                        <td>Financial DB</td>
                        <td>{hedaerData[key].findbconnstring}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}

export default PanelHeader;

