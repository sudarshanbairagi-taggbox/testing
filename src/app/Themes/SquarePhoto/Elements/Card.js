import React, { PureComponent } from "react";
import AuthorDetails from "./AuthorDetails";
import Media from "./Media";
import PostContent from '../../Elements/PostContent/PostContent'
import { PostTrimContent } from '../../../../utils'
const trim_content_length = 200;
export default class Card extends PureComponent {
  render() {
    const { itemData, personalization, adjustWidth, ThemeRule, clickToShowPopUp, itemIndex, wallID, ownerId } = this.props;

    const cardSize = {
      width: `${adjustWidth}%`, padding: personalization.padding / 2
    };
    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;
    const postTextContent = personalization.trimcontent ? PostTrimContent(itemData.content, trim_content_length) : itemData.content
    const overlayStyle = {backgroundColor: ThemeRule.cardColor}
    return (
      <div id={`tb-sp-post-${itemData.id}`} className="tb_sp_post_wrapper" style={cardSize} tb-network={itemData.network.id}>
        <div className="tb_sp_post_in" onClick={clickToShowPopUp(itemIndex, itemData)}>
          <div className="tb_sp_post_media_wrapp">
            {mediaType ? <Media itemData={itemData} wallID={wallID} /> : ''}
            <div className="tb_sp_post_details">
              <div className="tb_sp_contant_wrapper">
                {!itemData.hideContent ? <PostContent contentClass={'tb_sp_content'} item={itemData} content={postTextContent} font={itemData.font} ThemeRule={ThemeRule} personalization={personalization} contentTitle={itemData.contentTitle} /> : ''}
              </div>
              <AuthorDetails ownerId={ownerId} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />
            </div>
            <div className="tb_sp_post_overlay" style={overlayStyle}><div></div></div>
          </div>
        </div>
      </div>
    );
  }
}
