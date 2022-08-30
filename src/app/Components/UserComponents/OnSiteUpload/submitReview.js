import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
class SubmitReview extends Component {
    ratingChanged = (newRating) => {
        const { isActiveIndex, addRatings } = this.props;

        addRatings(newRating, isActiveIndex)
    };
    render() {
        const { onClickToUpdateStep, isAddMoreActive, isActiveIndex, addReview, item,onClickToUpdateMoreStep } = this.props;
        return (
            <div className='tb_onsite_add_caption_tab'>
                <div className='tb_onsite_form_group'>
                    <textarea className="tb_onsite_form_control_textarea" rows="2" placeholder='Add your review here....' onChange={addReview(isActiveIndex)} value={(item && item.review) ? item.review : ""} />
                    {item.error ? <div className='tb_onsite_error'>* Please add review and ratings.</div> : null}
                </div>
                <div className='tb_onsite_rating'>
                    <ReactStars size={28} count={5} onChange={this.ratingChanged} value={item && item.rating ? item.rating : 0} />
                </div>
                <div className='tb_onsite_form_actions' style={item && isAddMoreActive ? { justifyContent: 'space-between' } : null}>
                    {item && isAddMoreActive ? <div className='tb_onsite_btn_secondary' onClick={onClickToUpdateMoreStep(2)}>Skip</div> : null}
                    <div className='tb_onsite_btn_primary' onClick={onClickToUpdateStep(2)}>Next</div>
                </div>
            </div>
        )
    }
}

export default SubmitReview;