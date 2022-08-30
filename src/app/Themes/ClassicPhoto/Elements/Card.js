import React, { PureComponent } from "react";
import AuthorDetails from "./AuthorDetails";
import Media from "./Media";
import ShareOnHover from "../../Elements/ShareOnHover/ShareOnHover";
import CTAButton from "../../Elements/CTA/CtaButton";
import Rating from "../../Elements/Rating/Rating";
import SocialAction from "../../Elements/SocialAction/SocialAction";
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
    const ctaStatus = (itemData.cta && Object.keys(itemData.cta).length > 0 && itemData.cta.status) ? true : false;
    return (

      <div id={`tb-cp-post-${itemData.id}`} className={`tb_cp_post_wrapper`} style={cardSize} tb-network={itemData.network.id}>
        <div className="tb_cp_post_in" style={cardStyle} onClick={clickToShowPopUp(itemIndex, itemData)}>
          <div className="tb_cp_post_media_wrapper">
            {itemData.share.status ? <ShareOnHover share={itemData.share} shareClass={'tb_cp_share_container'} item={itemData} wallID={wallID} /> : ''}
            {mediaType ? <Media itemData={itemData} wallID={wallID} /> : ''}
            {rating ? <div className="tb_cp_rating__"><Rating rating={itemData.rating} network={itemData.network} /> </div> : ''}
            {ctaStatus ? <div className="tb_cp_post_cta"><CTAButton ctaClass={'tb_cp_post_cta_btn'} cta={itemData.cta} item={itemData} onClickToCTA={onClickToCTA} /> </div> : ''}
          </div>
          <div className="tb_cp_contant_wrapper">
            <AuthorDetails ownerId={ownerId} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />
          </div>
          {ThemeRule.socialAction ? <SocialAction itemData={itemData} ThemeRule={ThemeRule} ThemeID={personalization.widgetTheme} actionClass={'tb_mc_social_action__'} /> : ''}
        </div>
      </div>
    );
  }
}
