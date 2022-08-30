import React, { Component, Fragment } from 'react';
import './assets/css/product-tab.css'
import SingleProductTab from './singleProductTab'

class ProductTab extends Component {
    render() {
        const { upload_image } = this.props;
        return <div className="submit_pic_products">
            {
                upload_image && upload_image.map((item, index) => <SingleProductTab item={item} index={index} {...this.props} />)
            }
        </div>
    }
}
export default ProductTab