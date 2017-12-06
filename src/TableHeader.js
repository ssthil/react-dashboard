import React, { Component } from 'react';

const tableHeader = {
    services: "Test name",
    status: "Status",
    date: "Timestamp of status"
}
class TableHeader extends Component {
    render() {
        return(
            <thead>
                <tr>
                <th>{tableHeader.services}</th>
                <th>{tableHeader.status}</th>
                <th>{tableHeader.date}</th>
                </tr>
            </thead>
        )
    }
}

export default TableHeader;