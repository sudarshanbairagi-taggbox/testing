import React, { PureComponent } from "react";
import AuthorDetails from "./AuthorDetails";
import Media from "./Media";
import PostContent from '../../Elements/PostContent/PostContent'
import CTAButton from "../../Elements/CTA/CtaButton";
import Rating from "../../Elements/Rating/Rating";
import SocialAction from "../../Elements/SocialAction/SocialAction";
import { PostTrimContent } from '../../../../utils'

const trim_content_length = 140;
export default class Card extends PureComponent {
  constructor(props) {
    super(props)
    this.mediaHeight = React.createRef();
  }

  render() {
    const { itemData, personalization, ThemeRule, clickToShowPopUp, itemIndex, wallID, ownerId, onClickToCTA } = this.props;

    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;
    const rating = itemData.rating && (itemData.rating > 0 && itemData.network.id !== 29) ? true : false;

    const cardStyle = {
      backgroundColor: itemData.font.cardColor,
    };
    const contentClass = (itemData.rating > 0) ? 'tb_hc_rating_content' : 'tb_hc_content';
    const noMediaClass = (itemData.type === 1) ? 'tb_hc_text_post' : '';
    const textDecorate = (itemData.type === 1) && (personalization.textDecorate) ? 'tb_hc_text_decoration' : '';
    const ctaActive = personalization.cta.ctaStatus || itemData.cta.status ? true : false;
    const postTextContent = personalization.trimcontent ? PostTrimContent(itemData.content, trim_content_length) : itemData.content

    return (
      <div item-id={itemData.id} id={`tb-hc-post-${itemData.id}`} className="tb_hc_post_wrapper" onClick={clickToShowPopUp(itemIndex, itemData)} aria-label="Wrapper">
        <div className="tb_hc_post_in" style={cardStyle} aria-label="Card Post">
          {mediaType ? <div className="tb_hc_post_media_wrapp" role="img" aria-label="Media Wrapper">
            <Media itemData={itemData} wallID={wallID} />
          </div> : null}
          {rating ? <div className={`tb_hc_rating__`} >
            <Rating rating={itemData.rating} network={itemData.network} />
          </div> : null}

          <div className={`tb_hc_contant_wrapper ${noMediaClass}`} aria-label="Post Content Wrapper">
            <AuthorDetails ownerId={ownerId} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} rating={itemData.rating} />
            {ctaActive ? <div className="tb_hc_post_cta" aria-label="CTA Wrapper">
              <CTAButton ctaClass={'tb_hc_post_cta_btn'} cta={personalization.cta} postCta={itemData.cta} item={itemData} onClickToCTA={onClickToCTA} /> </div>
              : ''}
            {!itemData.hideContent ?
              <div className={`tb_hc_content_wrapper__`} aria-label="Content Wrapper">
                <PostContent contentClass={`${contentClass} ${textDecorate}`} item={itemData} content={postTextContent} font={itemData.font} ThemeRule={ThemeRule} personalization={personalization} item={itemData} contentTitle={itemData.contentTitle} />
              </div>
              : null}

          </div>
          {ThemeRule.socialAction ? <SocialAction itemData={itemData} ThemeRule={ThemeRule} ThemeID={personalization.widgetTheme} actionClass={'tb_hc_social_action__'} /> : ''}
        </div>
      </div>
    );
  }
}
