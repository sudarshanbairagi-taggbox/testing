export const styleHeaderBanner = (Banner) => {
    const bannerStyle = {
        backgroundImage: Banner.transparent == 1 ? 'none' : `url(${Banner.CustomBannerImage})`,
        backgroundColor: Banner.transparent == 1 || Banner.CustomBannerImage ? 'transparent' : Banner.background_color,
        height: Banner.banner_height
    }
    const bannerStyleBgRight = {
        backgroundColor: Banner.background_color_two,
    }
    const subTitleStyle = {
        color: Banner.subTitle_font_color,
        fontSize: Banner.subTitle_font_size,
        fontFamily: Banner.subtitle_css_font,
    }
    const subTitleVarentClass = Banner.subtitle_font_varient
    const titleStyle = {
        color: Banner.title_font_color,
        fontSize: Banner.title_font_size,
        fontFamily: Banner.title_css_font,
    }
    const titleVarentClass = Banner.title_font_varient
    var socialIconSize = 50
    if (Banner.social_icon_size > 50) {
        socialIconSize = 50
    } else {
        socialIconSize = Banner.social_icon_size
    }
    const iconAreaStyle = {
        height: socialIconSize * 1.8,
        width: socialIconSize * 1.8
    }
    const iconStyle = {
        fontSize: socialIconSize,
    }


    const facebookIconAreaStyle = {
        borderColor: (Banner.social_icon_color_status === 2) ? Banner.social_icon_color : '#1b74e4',
    }
    const facebookIconStyle = {
        color: (Banner.social_icon_color_status === 2) ? Banner.social_icon_color : '#1b74e4',
    }
    const twitterIconAreaStyle = {
        borderColor: (Banner.social_icon_color_status === 2) ? Banner.social_icon_color : '#29a9e1',
    }
    const twitterIconStyle = {
        color: (Banner.social_icon_color_status === 2) ? Banner.social_icon_color : '#29a9e1',
    }
    const instagramIconAreaStyle = {
        borderColor: (Banner.social_icon_color_status === 2) ? Banner.social_icon_color : '#E2306C',
    }
    const instagramIconStyle = {
        color: (Banner.social_icon_color_status === 2) ? Banner.social_icon_color : '#E2306C',
    }
    const isFacebook = Banner.social_icons.includes("1");
    const isTwitter = Banner.social_icons.includes("2");
    const isInstagram = Banner.social_icons.includes("3");


    return { bannerStyle, bannerStyleBgRight, subTitleStyle, titleStyle, iconAreaStyle, iconStyle, isFacebook, isTwitter, isInstagram, facebookIconAreaStyle, facebookIconStyle, twitterIconAreaStyle, twitterIconStyle, instagramIconAreaStyle, instagramIconStyle, subTitleVarentClass, titleVarentClass }

}
