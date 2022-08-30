import React, { useState, Component } from 'react';

class AddCaption extends Component {
    
    state = {
        uploadHide: true
    }

    handleHide = event => this.setState({ uploadHide: false })


    render() {
        const { uploadHide } = this.state;
        const { updateImageWithData, hasActive, onClickToUpdateStep, isActiveIndex, isAddMoreActive, addCaption, item, onClickToUpdateMoreStep } = this.props
        return (
            <div className='tb_onsite_add_caption_tab'>
                <div className='tb_onsite_form_group'>
                    <textarea className="tb_onsite_form_control_textarea" rows="2" placeholder='Add your caption here....' onChange={addCaption(isActiveIndex)} value={(item && item.caption) ? item.caption : ""} />
                    {item.error ? <div className='tb_onsite_error'>* Please add caption.</div> : null}
                </div>
                <div className='tb_onsite_form_actions' style={item && isAddMoreActive ? { justifyContent: 'space-between' } : null}>
                    {item && isAddMoreActive ? <div className='tb_onsite_btn_secondary' onClick={onClickToUpdateMoreStep(2)}>Skip</div> : null}
                    <div className='tb_onsite_btn_primary' onClick={onClickToUpdateStep(2)}>Next</div>
                </div>
            </div>
        )
    }
}

export default AddCaption;