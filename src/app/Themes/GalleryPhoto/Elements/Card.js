import React, { PureComponent } from "react";
import AuthorDetails from "./AuthorDetails";
import Media from "./Media";
import PostContent from '../../Elements/PostContent/PostContent'
import Network from "../../Elements/Network/Network";

export default class Card extends PureComponent {
  render() {
    const { itemData, personalization, adjustWidth, ThemeRule, clickToShowPopUp, itemIndex, wallID, ownerId } = this.props;
    const overlayStyle = {backgroundColor: ThemeRule.cardColor}
    const cardSize = {
      width: `${adjustWidth}%`, padding: personalization.padding / 2
    };
    const cardStyle = {
      backgroundColor: itemData.font.cardColor
    };
    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;

    return (
      <div id={`tb-gp-post-${itemData.id}`} className="tb_gp_post_wrapper" style={cardSize} tb-network={itemData.network.id}>
        {/* {itemIndex} */}
        <div className="tb_gp_post_in" style={cardStyle} onClick={clickToShowPopUp(itemIndex, itemData)}>
          <div className="tb_gp_post_media_wrapp">
            {mediaType ? <Media itemData={itemData} wallID={wallID} /> : ''}
            {itemData.network.id != 7 ?
              <div className="tb_gp_contant_">
                <div className="tb_gp_contant__in">

                 
                  <div className="tb_gp_content__">
                    <AuthorDetails postTime={itemData.createdAt}  network={itemData.network} ownerId={ownerId} author={itemData.author} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />
                    {!itemData.hideContent ? <PostContent item={itemData} contentClass={'tb_gp_content'} content={itemData.content} font={itemData.font} ThemeRule={ThemeRule} personalization={personalization} contentTitle={itemData.contentTitle} /> : ''}
                  </div>
                  <div className="tb_gp_post_overlay" style={overlayStyle}><div></div></div>

                </div>
              </div>
              : ''}
            <div className="tb_gp_social_">
              <Network networkClass={'tb_gp_social__ico'} network={itemData.network} ThemeRule={ThemeRule} font=
              {itemData.font} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
