import React, { PureComponent } from "react";
import Isotope from 'isotope-layout';

class MasonryIsotop {
    constructor() {
        var elem = document.querySelector('.tb_mc_post_container');
        this.isotopData = () => new Isotope(elem, {
            itemSelector: '.tb_mc_post_wrapper',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: 1,
                horizontalOrder: true
            }
        });
        setTimeout(() => this.isotopData.arrange(), 200)
    }

}

const Masonry = new MasonryIsotop();
export default Masonry;