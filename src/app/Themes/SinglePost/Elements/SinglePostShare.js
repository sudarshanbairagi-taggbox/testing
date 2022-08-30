import React, { PureComponent } from "react";
export default class SinglePostShare extends PureComponent {
  render() {    
    const { share, shareColor } = this.props;
    const shareStyle= {color:shareColor}
    return (
        <div className="tb_spt_share_wrapper">
            <div className="tb_spt_share_button_">
                <div className="tb_spt_share_ico tb__icon tb-share-outline" style={shareStyle}><div></div></div>
                <div className="tb_spt_share_btn_txt" style={shareStyle}>Share</div>
            </div>
            <div className="tb_spt_share_wrapper_dropdown">
                <div className="tb_spt_share_icon_list">
                    {share.facebook ?
                    <a href={share.facebook} target="_blank" className="tb_spt_share_list_in" rel="noopener noreferrer nofollow">
                        <div className="tb_spt_share_ico__ tb__icon tb-facebook"><div></div></div>
                        <div className="tb_spt_share_ico_txt">Facebook</div>
                    </a>
                    : ''}
                    {share.twitter ?
                    <a href={share.twitter} target="_blank" className="tb_spt_share_list_in" rel="noopener noreferrer nofollow">
                        <div className="tb_spt_share_ico__  tb__icon tb-twitter"><div></div></div>
                        <div className="tb_spt_share_ico_txt">Twitter</div>
                    </a>
                    : ''}
                    {share.linkedin ?
                    <a href={share.linkedin} target="_blank" className="tb_spt_share_list_in" rel="noopener noreferrer nofollow">
                        <div className="tb_spt_share_ico__ tb__icon tb-linkedin"><div></div></div>
                        <div className="tb_spt_share_ico_txt">LinkedIn</div>
                    </a>
                    : ''}
                </div>
            </div>
        </div>
    );
  }
}