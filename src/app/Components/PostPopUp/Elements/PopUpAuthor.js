import React, { PureComponent } from "react";
import moment from 'moment'
import Network from '../../../Themes/Elements/Network/Network'
import { fontColorIfWhite } from '../../../../utils'
import AuthorAvatar from "../../../Themes/Elements/Author/Elements/AuthorAvatar";


export default class PopUpAuthor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      picture: props.item.author.picture,
      isAuthorImagevalid: true
    }
  }
  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    this.setState({ picture: item.author.picture })
  }
  render() {
    const { item, ThemeRule, Personalization, ownerId } = this.props;
    const { picture } = this.state;

    const authorImage = item.author.picture && String(item.author.picture).includes('author') ? " " : item.author.picture
    const authorUserName = `${item.author.username && item.author.username.length > 0 ? `@` : ``}${item.author.username}`
    const authorDetailStatus = !(item.postAuthor == 0 || item.author.isInstaUser) ? true : false

    const dotStatus = !(item.postAuthor == 0 || item.timePost == 0 || item.author.isInstaUser) ? true : false
    const postTimeStatus = !(item.timePost == 0 || item.author.isInstaUser) ? true : false
    const authorNameStyle = {
      color: ThemeRule.authorColor
    };
    const sepratorStyle = {
      backgroundColor: ThemeRule.authorColor
    };

    return (
      <div className="tb_post_modal_post_author">
        <div className="tb_post_modal_author_details">
          {authorDetailStatus ? <><div className="tb_post_modal_author_media" style={{ backgroundImage: `url(${authorImage})` }}>
            {!this.state.isAuthorImagevalid && <AuthorAvatar username={item.author.name} color={item.network.color} />}
          </div>
            <img src={authorImage} style={{ display: `none` }}
              onError={(e) => {
                this.setState({
                  isAuthorImagevalid: false
                })
              }}
            />


          </> : null}

          <div className="tb_post_modal_author_deatils">
            {authorDetailStatus || ownerId === 100231 ? <div className="tb_post_modal_author_wrap">
              <div className="tb_post_modal_author_usrname" style={authorNameStyle}>{item.author.name} </div>
            </div> : null}
            <div className="tb_post_modal_author_info">
              {authorDetailStatus || ownerId === 100231 ? <div className="tb_post_modal_author_handlename" style={authorNameStyle}>{authorUserName}</div> : null}
              {dotStatus ? <div className="tb_post_modal_seprator_dot" style={sepratorStyle}> </div> : null}
              {postTimeStatus ? <span className="tb_post_modal_post_time" style={authorNameStyle}>{moment(
                new Date(item.createdAt * 1000)
              ).fromNow()}</span> : null}
            </div>
          </div>
        </div>
        <Network network={item.network} networkClass={`tb_post_modal_social_ico tb__icon`} font={item.font} ThemeRule={ThemeRule} isPopUp={true} />
      </div >
    );
  }
}
