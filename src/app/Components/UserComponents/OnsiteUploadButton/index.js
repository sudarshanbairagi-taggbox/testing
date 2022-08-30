import React, { PureComponent } from "react";
import QRCode from "react-qr-code";
import { connect } from "react-redux";
import { ServerUrl } from '../../../../constants'
import { onSitePopup } from '../../../../actions/themeActions'
class OnsiteUploadButton extends PureComponent {

  render() {
    const { UgcSettings, id } = this.props;

    const ButtonBgStyle = {
      fontFamily: UgcSettings.onsite_css_font_btn,
      backgroundColor: UgcSettings.onsite_btn_color
    }

    const QRButtonText = UgcSettings.onsite_qr_code_status && UgcSettings.onsite_qr_code_btn_text != '' ? UgcSettings.onsite_qr_code_btn_text : ''

    const buttonStyle = {
      fontFamily: UgcSettings.onsite_css_font_btn,
      color: UgcSettings.onsite_btn_txt_color,
      fontSize: UgcSettings.btn_fontSize + 'px',
      textAlign: UgcSettings.onsite_qr_code_status == 1 ? 'left' : 'center'
    }

    return UgcSettings.onsite_status && (UgcSettings.onsite_qr_code_status == "1" || QRButtonText != "") ? <div className="tb_onsite_upload_btn_wrap">
      <div className="tb_onsite_upload_btn">
        <div style={ButtonBgStyle} className='tb_onsite_btn' onClick={() => this.props.onSitePopup(true)}>
          <div className="tb_onsite_qr_btn_wrap">
            {UgcSettings.onsite_qr_code_status == 1 ? <div className='tb_onsite_qr_code'>
              <QRCode level="L" size={60} value={`${ServerUrl}/${id}?onsite-upload=true`} />
            </div> : null}
            {QRButtonText !== '' ?
              <div className={`tb_onsite_btn_txt tb-sGFfonte-${UgcSettings.onsite_font_varient_btn}`} style={buttonStyle}>
                {QRButtonText}
              </div> : ''}
          </div>
        </div>
      </div>
    </div> : null
  }
}
const mapStateToProps = state => {
  return {
    modalPop: state.modalPop
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSitePopup: (status) => dispatch(onSitePopup(status)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OnsiteUploadButton);