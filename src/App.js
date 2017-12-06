import React, { Component } from 'react';
import Panel from './Panel';
import {
   PageHeader,
} from 'react-bootstrap';

const title = "Razor Development Environment Dashboard (EOLf)";

class App extends Component {

  render() {
    
    return (
      <div className="container-fluid">
        <div className="row rowHeader">
          <div className="col-lg-12">
            <PageHeader>{title}</PageHeader>
          </div>
        </div>
        <div className="row">
          <Panel />
      </div>
    </div>
    );
  }
}

export default App;
