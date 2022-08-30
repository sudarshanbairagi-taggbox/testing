import React, { PureComponent } from "react";
import AuthorDetails from "./AuthorDetails";
import Media from "./Media";
import PostContent from '../../Elements/PostContent/PostContent'
import { PostTrimContent } from '../../../../utils'


const trim_content_length = 200;
export default class Card extends PureComponent {
  render() {
    const { itemData, personalization, ThemeRule, itemIndex, clickToShowPopUp, wallID, ownerId } = this.props;
    const overlayStyle = {backgroundColor: ThemeRule.cardColor}
    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;
    const postTextContent = personalization.trimcontent ? PostTrimContent(itemData.content, trim_content_length) : itemData.content

    return (
      <div id={`tb-hs-post-${itemData.id}`} className="tb_hs_post_wrapper" tb-network={itemData.network.id}>
        <div className="tb_hs_post_in" onClick={clickToShowPopUp(itemIndex, itemData)}>
          <div className="tb_hs_post_media_wrapp">
            {mediaType ? <Media itemData={itemData} wallID={wallID} /> : ''}
            <div className="tb_hs_post_details">
              <div className="tb_hs_contant_wrapper">
                {!itemData.hideContent ? <PostContent contentClass={'tb_hs_content'} item={itemData} content={postTextContent} font={itemData.font} ThemeRule={ThemeRule} personalization={personalization} item={itemData} contentTitle={itemData.contentTitle} /> : null}
              </div>
              <AuthorDetails ownerId={ownerId} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />
            </div>
            <div className="tb_hs_post_overlay" style={overlayStyle}><div></div></div>
          </div>
        </div>
      </div>
    );
  }
}
