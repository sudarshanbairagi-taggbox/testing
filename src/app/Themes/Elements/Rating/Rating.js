import React, { PureComponent } from "react";

const ThemeRender = ({ network }) => {
    switch (network.id) {
        case 3:
            return <div className="tb_rating_ico__ tb__icon tb-rating" style={{ color: '#1b74e4' }} tb-network={network.id}> </div>
            break;
        case 4:
            return <div className="tb_rating_ico__ tb__icon tb-google-rating" style={{ color: '#F8B90C' }} tb-network={network.id}> </div>
            break;
        case 19:
            return <div className="tb_rating_ico__ tb__icon tb-yelp-rating" style={{ color: '#e00707' }} tb-network={network.id}>
                <div className="tb_color_icon__ tb__icon tb-yelp-star"> </div>
            </div>
            break;
        case 23:
            return <div className="tb_rating_ico__ tb__icon tb-airbnb-rating" style={{ color: '#ff385c' }} tb-network={network.id}> </div>
            break;
        case 29:
            return <div className="tb_rating_ico__ tb__icon tb-rating" style={{ color: '#613983' }} tb-network={network.id}> </div>
            break;
        default:
            return <div className="tb_rating_ico__ tb__icon tb-rating" style={{ color: '#F8B90C' }} tb-network={network.id}> </div>
    }
}
export default class Rating extends PureComponent {
    render() {
        const { rating, network, id } = this.props;
        return (
            <div className="tb__rating__" aria-hidden>
                {
                    rating ? [...Array(rating)].map((el, index) => <ThemeRender key={index} network={network} />) : null
                }
            </div>
        );
    }
}
