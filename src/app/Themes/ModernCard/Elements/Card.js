import React, { PureComponent } from "react";
import { connect } from "react-redux";
import AuthorDetails from "./AuthorDetails";
import Media from "./Media";
import PostContent from '../../Elements/PostContent/PostContent'
import ShareOnHover from "../../Elements/ShareOnHover/ShareOnHover";
import CTAButton from "../../Elements/CTA/CtaButton";
import Rating from "../../Elements/Rating/Rating";
import SocialAction from "../../Elements/SocialAction/SocialAction";
import Network from "../../Elements/Network/Network";
import { showPopUP } from '../../../../actions/themeActions'
import { PostTrimContent } from '../../../../utils'


const trim_content_length = 200;
class Card extends PureComponent {

  render() {
    const { itemData, personalization, adjustWidth, ThemeRule, clickToShowPopUp, itemIndex, wallID, ownerId, onClickToCTA } = this.props;

    const cardSize = {
      width: `${itemData.highlight == 1 ? adjustWidth * 2 : adjustWidth}%`, padding: personalization.padding / 2
    };
    const cardStyle = {
      backgroundColor: itemData.font.cardColor
    };
    const mediaType = (itemData.type === 2 || itemData.type === 3 || itemData.type === 4 || itemData.type === 5) ? true : false;
    const rating = (itemData.rating > 0) ? true : false;
    const contentClass = (itemData.rating > 0) ? 'tb_mc_rating_content' : 'tb_mc_content'
    const textDecorate = (itemData.type === 1 && personalization.textDecorate) ? 'tb_mc_text_decoration tb_mc_text_post' : '';
    const ctaStatus = (itemData.cta && Object.keys(itemData.cta).length > 0 && itemData.cta.status) ? true : false;
    const postTextContent = personalization.trimcontent ? PostTrimContent(itemData.content, trim_content_length) : itemData.content
    return (

      <div className={`tb_mc_post_wrapper`} data-id={itemData.id} style={cardSize} tb-network={itemData.network.icon}>
        <div className="tb_nc_post_wrap_in">
          <div className="tb_mc_post_in" style={cardStyle} onClick={clickToShowPopUp(itemIndex, itemData)}>
            <div className="tb_mc_post_media_wrapp">
              {!mediaType ? <div className="tb_mc_social_top_"> <Network networkClass={'tb_mc_social_center_ico'} network={itemData.network} ThemeRule={ThemeRule} font={itemData.font} /> </div> : null}
              {itemData.share.status ? <ShareOnHover share={itemData.share} shareClass={'tb_mc_share_container'} item={itemData} wallID={wallID} /> : null}
              {mediaType ? <Media itemData={itemData} wallID={wallID} /> : null}

              {rating ? <div className={`tb_mc_rating__ ${itemData.network.id === 29 ? `tb_mc_onsite_rating__` : ``}`}><Rating rating={itemData.rating} network={itemData.network} /> </div> : null}
            </div>
            <div className="tb_mc_contant_wrapper">
              {mediaType && ctaStatus ? <div className="tb_mc_post_cta"><CTAButton ctaClass={'tb_mc_post_cta_btn'} cta={itemData.cta} item={itemData} onClickToCTA={onClickToCTA} /> </div> : null}

              {itemData.hideContent !== 1 ? <PostContent item={itemData} contentClass={`${contentClass} ${textDecorate}`} content={postTextContent} font={itemData.font} ThemeRule={ThemeRule} personalization={personalization} contentTitle={itemData.contentTitle} /> : null}

              {!mediaType && ctaStatus ? <div className="tb_mc_post_cta"><CTAButton ctaClass={'tb_mc_post_cta_btn'} cta={itemData.cta} item={itemData} onClickToCTA={onClickToCTA} /> </div> : null}

              <AuthorDetails ownerId={ownerId} mediaType={mediaType} postTime={itemData.createdAt} author={itemData.author} network={itemData.network} font={itemData.font} personalization={personalization} ThemeRule={ThemeRule} />

            </div>
            {ThemeRule.socialAction ? <SocialAction itemData={itemData} ThemeRule={ThemeRule} ThemeID={personalization.widgetTheme} actionClass={'tb_mc_social_action__'} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalPop: state.modalPop
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showPopUP: (data) => dispatch(showPopUP(data)),

  }
}

export default connect(mapStateToProps)(Card);