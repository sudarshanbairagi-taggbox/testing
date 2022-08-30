import React, { Component, Fragment } from 'react';
import ReactStars from "react-rating-stars-component";

class SingleProductTab extends Component {
    //for caption 1 and review 2
    state = { isActive: 1 }
    componentWillMount() {
        const { item } = this.props;
        this.setState({ isActive: item.activeTab })
    }
    componentDidMount() {
        const { item } = this.props;
        this.setState({ isActive: item.activeTab })
    }
    onUpdateTab = (id) => event => {
        const { index, updateActiveTab } = this.props;

        this.setState({ isActive: id }, () => updateActiveTab(index, id))
    }
    ratingChanged = (newRating) => {
        const { index, onUpdateImageAddRatings } = this.props;

        onUpdateImageAddRatings(newRating, index)
    };
    render() {
        const { item, onUpdateImageAddCaption, onUpdateImageAddReview, onUpdateImageAddRatings, index, onRemoveImage } = this.props;
        const { isActive } = this.state;


        return <div className="submit_pic_post_wrapper">

            {/* <div className="submit_pic_post_img" style={{ backgroundImage: `url(${item.image})` }}></div> */}
            <div className="submit_pic_submit_post_wrap">
                <img className="submit_pic_submit_post" src={item.thumb_file} />
                <div className="submit_pic_remove_post" onClick={onRemoveImage(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g id="tb_close----" data-name="Group 1" transform="translate(1 1)">
                            <circle id="tb_Ellipse_1" data-name="Ellipse 1" cx="9" cy="9" r="9" transform="translate(-1 -1)" fill="#db4b20" />
                            <rect id="tb_Rectangle_1" data-name="Rectangle 1" width="11.893" height="1.487" rx="0.743" transform="translate(4.321 3.27) rotate(45)" fill="#fff" />
                            <rect id="tb_Rectangle_2" data-name="Rectangle 2" width="11.893" height="1.487" rx="0.743" transform="translate(12.73 4.321) rotate(135)" fill="#fff" />
                        </g>
                    </svg>
                </div>
            </div>

            <div className="submit_pic_post_content">
                <div className="submit_pic_tab_btn_wrap">
                    <div className={`submit_pic_tab_btn ${isActive == 1 ? 'submit_pic_active_btn' : ''}`} onClick={this.onUpdateTab(1)}>Add Caption</div>
                    <div className="submit_pic_tab_txt">OR</div>
                    <div className={`submit_pic_tab_btn ${isActive == 2 ? 'submit_pic_active_btn' : ''}`} onClick={this.onUpdateTab(2)}>Submit Review</div>
                </div>

                <div className={`submit_pic_tab_content`} style={isActive == 1 ? { display: 'block' } : { display: 'none' }}>
                    <textarea className="submit_pic_content_input" placeholder="Add your caption here...." rows="1" onChange={onUpdateImageAddCaption(index)} value={item.caption}>{item.caption}</textarea>
                    {item.error && item.activeTab == 1 ? <div className="submit_pic_error_">* Please add caption.</div> : null}
                </div>

                <div className={`submit_pic_tab_content`} style={isActive == 2 ? { display: 'block' } : { display: 'none' }}>
                    <textarea className="submit_pic_content_input" placeholder="Add your review here...." rows="1" onChange={onUpdateImageAddReview(index)} value={item.review}>{item.review}</textarea>
                    {isActive == 2 ? <ReactStars
                        count={5}
                        onChange={this.ratingChanged}
                        size={20}
                        color="#d1d1d1"
                        activeColor="#F8B808"
                        value={item.rating}
                    /> : null}

                    {item.error && item.activeTab == 2 ? <div className="submit_pic_error_">* Please add review and ratings.</div> : null}

                </div>
            </div>
        </div>

    }
}
export default SingleProductTab