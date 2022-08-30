import React, { Component } from 'react';
import { componentWillAppendToBody } from "react-append-to-body";
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import App from './app';
import { getThemeDataWithWallID } from './actions/themeActions'
import ErrorPage from './app/Components/ErrorPages';
import PostPopUp from './app/Components/PostPopUp'
import ReportMedia from './app/Components/UserComponents/ReportMedia'
import SharePost from './app/Components/UserComponents/SharePost'
import AppHead from './app/Components/Head/Head';
import UserComponents from './app/Components/UserComponents';

export const ADD_SCRIPT = url => {
  const script = document.head.appendChild(document.createElement("script"))
  script.src = url
  script.async = true
  document.body.appendChild(script)
}

export const WINDOW_ON_LOAD = () => {
  window.onload = () => {
    if (!window.jQuery) ADD_SCRIPT("https://widget.taggbox.com/common-assets/js/jquery.min.js");
    ADD_SCRIPT("https://widget.taggbox.com/common-assets/js/slackdown.js");
  }
}

const MyComponent = ({ children }) => {
  return children;
}
const TaggboxThemes = (props) => {
  if (props.loader && props.loader.loader != null && props.error.errorWithMessage == null && !props.error.planLimit && (props.error.themeError == null || (Object.keys(props.error.themeError).length > 0 && props.error.themeError.error_code == 0)))
    return <App {...props} />
  else if (props.error.errorWithMessage || props.error.planLimit || props.error.themeError)
    return <ErrorPage {...props} />
  else
    return null
}
const AppendedMyComponent = componentWillAppendToBody(MyComponent);
class WidgetApp extends Component {
  componentDidMount() {
    const { wallID } = this.props;
    this.props.getThemeDataWithWallID(wallID, null)
    WINDOW_ON_LOAD()
  }
  render() {

    const { appData, modalPop } = this.props;
    return <>
      {appData && appData.wall && Object.keys(appData.wall).length > 0 ? <AppHead wall={appData.wall} /> : null}
      <UserComponents />
      <TaggboxThemes {...appData} />
      {modalPop.isShowPopUp ? <AppendedMyComponent><PostPopUp wall={appData.wall} data={modalPop.data} languageSetting={appData.languageSetting} /></AppendedMyComponent> : null}
      {modalPop.reportStatus ? <AppendedMyComponent><ReportMedia item={modalPop.reportData} wall={appData.wall} /></AppendedMyComponent> : null}
      {modalPop.shareStatus ? <AppendedMyComponent><SharePost postLink={modalPop.shareData.link} userName={modalPop.shareData.author.name} /></AppendedMyComponent> : null}
    </>
  }
}
const mapStateToProps = state => {
  return {
    appData: state.appData,
    modalPop: state.modalPop
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getThemeDataWithWallID: (Id, heightEvent) => dispatch(getThemeDataWithWallID(Id, heightEvent))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WidgetApp);

