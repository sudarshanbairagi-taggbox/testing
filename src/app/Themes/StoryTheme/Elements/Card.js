import React, { PureComponent } from "react";
import Media from "./Media";
import AuthorDetails from "./AuthorDetails";

export default class Card extends PureComponent {

  render() {
    const { itemData, personalization, adjustWidth, itemIndex, ThemeRule, clickToShowPopUp, wallID, ownerId } = this.props;
    //clickToShowPopUp = { clickToShowPopUp } wallID = { wall.Wall.id }
    const cardSize = {
      width: `${adjustWidth}%`,
      cursor: 'pointer'
    };
    const cardStyle = {
      backgroundColor: itemData.font.cardColor
    };
    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;

    return (
      <div id={`tb-stt-post-${itemData.id}`} className={`tb_stt_post_wrapper`} style={cardSize} tb-network={itemData.network.icon}>
        <div className="tb_stt_card_wrapper" style={cardStyle} onClick={clickToShowPopUp(itemIndex, itemData)}>
          {mediaType ?
            <div className="tb_stt_media_img">
              <Media itemData={itemData} wallID={wallID} />
            </div>
            : ''}
          <div className="tb_stt_card_wrapper_00">
            <div className="tb_stt_card_content_0">
              <AuthorDetails ownerId={ownerId} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
