import { Component, Fragment } from 'react';
import ReactStars from "react-rating-stars-component";

class Ratings extends Component {
    state = {
        rating: 0
    }
    componentDidMount() {
        const { item } = this.props;
        if (item.rating > 0) this.setState({ rating: item.rating })
    }
    componentWillUnmount() {
        this.setState({ rating: 0 })
    }
    render() {
        const { item, ratingChanged } = this.props;
        const { rating } = this.state;
        return <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ff4051"
            value={rating}
        />
    }
}

export default Ratings;

