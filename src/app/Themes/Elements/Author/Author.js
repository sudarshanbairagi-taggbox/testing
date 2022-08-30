import React, { PureComponent } from "react";
import AuthorAvatar from "./Elements/AuthorAvatar";

const SpaceRemove = (image, stingMatch) => {
  if (image && String(image) && String(image).includes(stingMatch)) return image.replace(/\s/g, '')
  else return image
}
export default class Author extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
    isAuthorImagevalid:true
   }
  }
  // componentWillReceiveProps(nextProps) {
  //   const { author } = nextProps;
  //   this.setState({ picture: SpaceRemove(author.picture, "ui-avatars") })
  // }
  componentDidMount() {
    const { author } = this.props;
    // this.setState({ picture: SpaceRemove(author.picture, "ui-avatars") })
  }
  render() {
    const { author, authorClass , network } = this.props;
    const { picture } = this.state;
    return <>

 <div className={authorClass} style={{ backgroundImage: `url(${author.picture && String(author.picture).includes('author.png') ? " " : author.picture }) ` }}> 
 {!this.state.isAuthorImagevalid && <AuthorAvatar username={author.name} color={network.id===null?`#000`:network.color} />}
 {this.state.isAuthorImagevalid && <img src={author.picture && String(author.picture).includes("author.png")? " ":author.picture} style={{ display: `none` }}
            onError={(e)=>{
              this.setState({
                isAuthorImagevalid:false
              })
            }}
            /> }
      </div>

 </>
  }
}

