import React, { PureComponent } from "react";

export default class SocialActions extends PureComponent {
  render() {
    const { itemData, ThemeRule } = this.props;
    const iconColorStyle = { color:ThemeRule.iconType === 1 ? ThemeRule.iconColor : itemData.font.iconColor }

    return <div className="tb_nc_social_actions_">
            <a href={itemData.link} target="_blank" className="tb_nc_action_counts_wrap" rel="noopener noreferrer nofollow">
              <div className="tb_nc_action_ico tb__icon tb-share-in-alt" style={iconColorStyle}> </div>
            </a>
            <a href={itemData.link} target="_blank" className="tb_nc_action_counts_wrap" rel="noopener noreferrer nofollow">
              <div className="tb_nc_action_ico tb__icon tb-comment-dots" style={iconColorStyle}> </div>
            </a>
            <a href={itemData.link} target="_blank" className="tb_nc_action_counts_wrap" rel="noopener noreferrer nofollow">
              <div className="tb_nc_action_ico tb__icon tb-thumbs-up" style={iconColorStyle}> </div>
              {itemData.like_count > 0 ? <div className="tb_nc_action_counts" style={iconColorStyle}>{itemData.like_count}</div> : '' }
            </a>
          </div>
  }
}