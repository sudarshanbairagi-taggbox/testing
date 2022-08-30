import React, { PureComponent } from "react";
import { connect } from "react-redux";
import AuthorDetails from "./AuthorDetails";
import ClassicCardMedia from "./Media";
import PostContent from '../../Elements/PostContent/PostContent'
import CTAButton from "../../Elements/CTA/CtaButton";
import Rating from "../../Elements/Rating/Rating";
import ShareAndSocialActions from "./ShareAndSocialActions";
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
    const contentClass = (itemData.rating > 0) ? 'tb_cc_rating_content' : 'tb_cc_content'
    const textDecorate = (itemData.type === 1 && personalization.textDecorate) ? 'tb_cc_text_decoration tb_cc_text_post' : '';
    const ctaStatus = (itemData.cta && Object.keys(itemData.cta).length > 0 && itemData.cta.status) ? true : false;
    const cardActions = (ctaStatus || ThemeRule.socialAction) ? true : false;
    const postTextContent = personalization.trimcontent ? PostTrimContent(itemData.content, trim_content_length) : itemData.content
    return (
      <div id={`tb-cc-post-${itemData.id}`} className={`tb_cc_post_wrapper`} style={cardSize} tb-network={itemData.network.icon}>
        <div className="tb_cc_post_in" style={cardStyle} onClick={clickToShowPopUp(itemIndex, itemData)}>
          <div className="tb_cc_contant_wrapper">
            <AuthorDetails ownerId={ownerId} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />
            {!itemData.hideContent ? <PostContent item={itemData} contentClass={`${contentClass} ${textDecorate}`} content={postTextContent} font={itemData.font} ThemeRule={ThemeRule} personalization={personalization} contentTitle={itemData.contentTitle} /> : ''}
            {rating ? <div className="tb_cc_rating__"><Rating rating={itemData.rating} network={itemData.network} /> </div> : ''}
          </div>
          {mediaType ?
            <div className="tb_cc_post_media_wrapp">
              <ClassicCardMedia itemData={itemData} wallID={wallID} />
            </div>
            : ''}
          {cardActions ?
            <div className="tb_cc_post_actions">
              {ctaStatus ? <div className="tb_cc_post_cta"><CTAButton ctaClass={'tb_cc_post_cta_btn'} cta={itemData.cta} item={itemData} onClickToCTA={onClickToCTA} /> </div> : ''}
              {cardActions ? <ShareAndSocialActions itemData={itemData} ThemeRule={ThemeRule} /> : ''}
            </div>
            : ''}
        </div>
      </div>

    );
  }
}