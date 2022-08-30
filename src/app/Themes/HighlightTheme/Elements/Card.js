import React, { PureComponent } from "react";
import Media from "./Media";
import Network from "../../Elements/Network/Network";

export default class Card extends PureComponent {
  render() {
    const { itemData, personalization, adjustWidth, ThemeRule, clickToShowPopUp, wallID, itemIndex } = this.props;
    const overlayStyle = {backgroundColor: ThemeRule.cardColor}
    const cardSize = {
      padding: personalization.padding / 2
    };
    const cardStyle = {
      backgroundColor: itemData.font.cardColor
    };
    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;
    return (
      <div id={`tb-sp-post-${itemData.id}`} className="tb_ht_post_wrapper" style={cardSize} tb-network={itemData.network.id}>
        <div className="tb_ht_post_in" style={cardStyle} onClick={clickToShowPopUp(itemIndex, itemData)}>
          <div className="tb_ht_post_media_wrapp">
            {mediaType ? <Media itemData={itemData} wallID={wallID} /> : ''}
            <div className="tb_ht_post_details">
              <div className="tb_ht_social_">
                <Network networkClass={'tb_ht_social_ico_'} network={itemData.network} ThemeRule={ThemeRule} font={itemData.font} />
              </div>
            </div>
            <div className="tb_ht_post_overlay" style={overlayStyle}><div></div></div>
          </div>
        </div>
      </div>
    );
  }
}
