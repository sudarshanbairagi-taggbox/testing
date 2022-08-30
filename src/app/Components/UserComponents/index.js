import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import OnSiteUpload from "./OnSiteUpload";


class UserComponents extends PureComponent {
  render() {
    const { modalPop, appData, loaderData } = this.props

    return (<>
      {modalPop.onSiteIsShowPopUp ? <OnSiteUpload wall={appData.wall} wallId={appData.wall.Wall.id} /> : ''}
    </>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalPop: state.modalPop,
    appData: state.appData,
    loaderData: state.loaderData
  }
}

export default connect(mapStateToProps)(UserComponents);

