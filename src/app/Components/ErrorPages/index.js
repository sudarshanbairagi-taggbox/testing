import React, { PureComponent } from "react";
import { CloudUrl, CloudHostUrl, WebWidgetUrl } from "../../../constants";
import OnsiteUploadButton from "../UserComponents/OnsiteUploadButton"

import PlanLimit from "./PlanLimit/PlanLimit";
import ErrorMessage from './ErrorCode/errorMessage'
import Error201 from "./ErrorCode/201";
import Error202 from "./ErrorCode/202";
import Error203 from "./ErrorCode/203";
import Error204 from "./ErrorCode/204";
import Error205 from "./ErrorCode/205";
import Error206 from "./ErrorCode/206";
import Error207 from "./ErrorCode/207";
import Error208 from "./ErrorCode/208";
import Error209 from "./ErrorCode/209";
import Error211 from "./ErrorCode/211";
import Error212 from "./ErrorCode/212";


const errorType = (error, wall) => {
  //props.error.errorWithMessage || !props.error.planLimit || props.error.themeError
  if (error.errorWithMessage) return <ErrorMessage error={error} />
  else if (error.planLimit) return <PlanLimit />
  else if (error.themeError && Object.keys(error.themeError).length) {
    switch (error.themeError.error_code) {
      case 201:
        return <Error201 {...error.themeError} wall={wall} />;
      case 202:
        return <Error202 {...error.themeError} wall={wall} />;
      case 203:
        return <Error203 {...error.themeError} wall={wall} />;
      case 204:
        return <Error204 {...error.themeError} wall={wall} />;
      case 205:
        return <Error205 {...error.themeError} wall={wall} />;
      case 206:
        return <Error206 {...error.themeError} wall={wall} />;
      case 207:
        return <Error207 {...error.themeError} wall={wall} />;
      case 208:
        return <Error208 {...error.themeError} wall={wall} />;
      case 209:
        return <Error209 {...error.themeError} wall={wall} />;
      case 211:
        return <Error211 {...error.themeError} wall={wall} />;
      case 212:
        return <Error212 {...error.themeError} wall={wall} />;
      default:
        return ""
    }

  }
  else return <Error206 />
}
export default class ErrorPage extends PureComponent {
  render() {
    const ErrorImage = {
      backgroundImage: `url(${CloudUrl}/media/images/nopost.png)`
    }
    const LogoImage = {
      backgroundImage: `url(${CloudUrl}/media/images/taggbox-widget.svg)`
    }
    const { error, wall } = this.props
    return (
      <div className="tb_error_page">
        <div className="tb_error_page_bg" style={ErrorImage}> </div>
        {(wall && Object.keys(wall).length > 0 && wall.UserRule.on_site_upload && wall.UgcSettings.onsite_status) ? <div className="tb_error_onsite_btn">
          <OnsiteUploadButton UgcSettings={wall.UgcSettings} id={wall.Wall.id} />
        </div> : null}
        <div className="tb_error_page_wrapper">
          {errorType(error, wall)}
          <div className="tb_error_page_logo">
            <a href={WebWidgetUrl} traget="_blank" className="tb_error_page_logo_ico" style={LogoImage}> </a>
          </div>
        </div>
      </div>
    );
  }
}
