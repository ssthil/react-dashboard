import React, { Component } from 'react';

class PanelFooter extends Component {
    render() {
      const footerData  = this.props.panelFooterData;
      const key = Object.keys(footerData)[0];
        return(
            <div className="panel-footer">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div>Allocation Start <span className="label label-default">{footerData[key].allocationstart}</span></div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="pull-right">Allocation End <span className="label label-primary">{footerData[key].allocationend}</span></div>
                </div>
              </div>
            </div>
        )
    }
}

export default PanelFooter;