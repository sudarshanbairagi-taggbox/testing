import React, { PureComponent } from "react";
import AuthorDetails from "./AuthorDetails";
import SinglePostShare from "./SinglePostShare";
import Media from "./Media";
import PostContent from '../../Elements/PostContent/PostContent'
import CTAButton from "../../Elements/CTA/CtaButton";
import SinglePostSocialActions from "./SinglePostSocialActions";


export default class Card extends PureComponent {
  render() {
    const { itemData, personalization, ThemeRule, itemIndex, clickToShowPopUp, wallID, ownerId, onClickToCTA } = this.props;
    const overlayStyle = { backgroundColor: ThemeRule.cardColor }
    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;

    const ctaStatus = (itemData.cta && Object.keys(itemData.cta).length > 0 && itemData.cta.status) ? true : false;
    const actionStyle = {
      justifyContent: !itemData.share.status ? 'flex-end' : '',
      borderTop: `1px solid ${ThemeRule.fontColor}`
    }
    return (
      <div id={`tb-spt-post-${itemData.id}`} className="tb_spt_post_wrapper" tb-network={itemData.network.id}>
        <div className="tb_spt_post_in" onClick={clickToShowPopUp(itemIndex, itemData)}>
          <div className="tb_spt_post_media_wrapp">
            {mediaType ? <Media itemData={itemData} wallID={wallID} /> : ''}
            <div className="tb_spt_post_details">
              <div className="tb_spt_contant_wrapper">
                <AuthorDetails ownerId={ownerId} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />
                <div className="tb_spt_content_wrap">
                  <div className="tb_spt_content_wrap_in">
                    {!itemData.hideContent ? <PostContent contentClass={"tb_spt_content"} item={itemData} content={itemData.content} font={itemData.font} ThemeRule={ThemeRule} personalization={personalization} /> : ''}
                    {ctaStatus ? <div className="tb_spt_post_cta"><CTAButton ctaClass={'tb_spt_post_cta_btn'} cta={itemData.cta} contentTitle={itemData.contentTitle} item={itemData} onClickToCTA={onClickToCTA} /> </div> : ''}
                  </div>
                  <div className="tb_spt_social_actions_container" style={actionStyle}>
                    {itemData.share.status ? <SinglePostShare share={itemData.share} shareColor={ThemeRule.fontColor} /> : ''}
                    {ThemeRule.socialAction ? <SinglePostSocialActions itemData={itemData} ThemeRule={ThemeRule} /> : ''}
                  </div>
                </div>
              </div>
            </div>
            <div className="tb_spt_post_overlay" style={overlayStyle}><div></div></div>
          </div>
        </div>
      </div>
    );
  }
}
