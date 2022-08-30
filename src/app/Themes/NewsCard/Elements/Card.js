import React, { PureComponent } from "react";
import AuthorDetails from "./AuthorDetails";
import Media from "./Media";
import PostContent from '../../Elements/PostContent/PostContent'
import ShareOnHover from "../../Elements/ShareOnHover/ShareOnHover";
import SocialActions from "./SocialActions";
import CTAButton from "../../Elements/CTA/CtaButton";
import Rating from "../../Elements/Rating/Rating";
import SocialAction from "../../Elements/SocialAction/SocialAction";
import { PostTrimContent } from '../../../../utils'
const trim_content_length = 200;

export default class Card extends PureComponent {
  render() {
    const { itemData, personalization, adjustWidth, ThemeRule, clickToShowPopUp, itemIndex, wallID, ownerId, onClickToCTA } = this.props;
    const cardSize = {
      width: `${adjustWidth}%`, padding: personalization.padding / 2
    };
    const cardStyle = {
      backgroundColor: itemData.font.cardColor
    };
    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;
    const rating = (itemData.rating > 0) ? true : false;
    const contentClass = (itemData.rating > 0) ? 'tb_nc_rating_content' : 'tb_nc_content'
    const textDecorate = (itemData.type === 1 && personalization.textDecorate) ? 'tb_nc_text_decoration tb_nc_text_post' : '';
    const ctaStatus = (itemData.cta && Object.keys(itemData.cta).length > 0 && itemData.cta.status) ? true : false;
    const postTextContent = personalization.trimcontent ? PostTrimContent(itemData.content, trim_content_length) : itemData.content
    return (
      <div id={`tb-nc-post-${itemData.id}`} className="tb_nc_post_wrapper" style={cardSize} tb-network={itemData.network.icon}>
        <div className="tb_nc_post_wrap_in">
          <div className="tb_nc_post_in" style={cardStyle} onClick={clickToShowPopUp(itemIndex, itemData)}>
            <div className="tb_nc_post_media_wrapp">
              {itemData.share.status ? <ShareOnHover share={itemData.share} shareClass={'tb_nc_share_container'} item={itemData} wallID={wallID} /> : ''}
              {mediaType ? <Media itemData={itemData} wallID={wallID} /> : ''}
              {rating ? <div className="tb_nc_rating__"><Rating rating={itemData.rating} network={itemData.network} /></div> : ''}
            </div>
            <div className="tb_nc_contant_wrapper">

              <AuthorDetails ownerId={ownerId} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />
              {ctaStatus ? <div className="tb_nc_post_cta"><CTAButton ctaClass={'tb_nc_post_cta_btn'} cta={itemData.cta} item={itemData} onClickToCTA={onClickToCTA} /></div> : ''}
              {!itemData.hideContent ? <PostContent contentClass={`${contentClass} ${textDecorate}`} item={itemData} content={postTextContent} font={itemData.font} ThemeRule={ThemeRule} personalization={personalization} contentTitle={itemData.contentTitle} /> : ''}
            </div>
            {ThemeRule.socialAction ? <SocialAction itemData={itemData} ThemeRule={ThemeRule} ThemeID={personalization.widgetTheme} actionClass={'tb_nc_social_action__'} /> : ''}
          </div>
        </div>
      </div>
    );
  }
}
