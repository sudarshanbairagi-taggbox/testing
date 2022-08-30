import React, { PureComponent } from "react";
import AuthorDetails from "./AuthorDetails";
import Media from "./Media";
import PostContent from '../../Elements/PostContent/PostContent'
import CTAButton from "../../Elements/CTA/CtaButton";
import Rating from "../../Elements/Rating/Rating";
import WidgetShare from "./WidgetShare";
import WidgetSocialActions from "./WidgetSocialActions";

export default class Card extends PureComponent {
  render() {
    const { itemData, personalization, ThemeRule, wallID, clickToShowPopUp, itemIndex, ownerId, onClickToCTA } = this.props;

    const cardStyle = {
      backgroundColor: itemData.font.cardColor
    };
    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;
    const rating = (itemData.rating > 0) ? true : false;
    const contentClass = (itemData.rating > 0) ? 'tb_wt_rating_content' : 'tb_wt_content'
    const textDecorate = (itemData.type === 1 && personalization.textDecorate) ? 'tb_wt_text_decoration tb_wt_text_post' : '';
    const ctaStatus = (itemData.cta && Object.keys(itemData.cta).length > 0 && itemData.cta.status) ? true : false;

    return (

      <div id={`tb-wt-post-${itemData.id}`} className={`tb_wt_post_wrapper`} tb-network={itemData.network.id}>
        <div className="tb_wt_post_in" style={cardStyle} onClick={clickToShowPopUp(itemIndex, itemData)}>
          <AuthorDetails ownerId={ownerId} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />
          <div className="tb_wt_post_media_wrapp">
            {mediaType ? <Media itemData={itemData} wallID={wallID} /> : ''}
            {rating ? <div className="tb_wt_rating__"><Rating rating={itemData.rating} network={itemData.network} /> </div> : ''}
          </div>
          <div className="tb_wt_contant_wrapper">
            {ctaStatus ? <div className="tb_wt_post_cta"><CTAButton ctaClass={'tb_wt_post_cta_btn'} cta={itemData.cta} item={itemData} onClickToCTA={onClickToCTA} /> </div> : ''}
            {!itemData.hideContent ? <PostContent contentClass={`${contentClass} ${textDecorate}`} item={itemData} content={itemData.content} font={itemData.font} ThemeRule={ThemeRule} personalization={personalization} contentTitle={itemData.contentTitle} /> : ''}
            <div className="tb_wt_post_share_container" style={(itemData && itemData.network.id == 29 || !ThemeRule.socialAction) ? { justifyContent: `flex-end` } : {}}>
              {ThemeRule.socialAction ? <WidgetSocialActions itemData={itemData} ThemeRule={ThemeRule} /> : ''}
              {itemData.share.status ? <WidgetShare share={itemData.share} shareClass={'tb_mc_share_container'} /> : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
