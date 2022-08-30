import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { CloudUrl } from "../../../constants";

export default class AppHead extends PureComponent {

    render() {
        const { wall } = this.props;
        const postFont = wall.ThemeRule && Object.keys(wall.ThemeRule).length > 0 && wall.ThemeRule.link_font && wall.ThemeRule.link_font !== "" ? true : false
        const isPostInheritFont = postFont && wall.ThemeRule.link_font === 'inherit' ? true : false
        const isUgcButtonInheritFont = wall.UgcSettings.onsite_link_font_btn === 'inherit' ? true : false
        const isUgcModalInheritFont = wall.UgcSettings.onsite_link_font_msg === 'inherit' ? true : false
        const isBTitleInheritFont = wall.Banner.title_link_font === 'inherit' ? true : false
        const isBSubTitleInheritFont = wall.Banner.subtitle_link_font === 'inherit' ? true : false

        const queryParams = new URLSearchParams(window.location.search);
        const previewId = queryParams.get('preview');
        const themeID = wall.Personalization.widgetTheme;
        return (
            <Helmet>
                {previewId ?
                    document.body.classList.add(`previw__${themeID}`)
                    : null
                }
                {<style>
                    {`@font-face {
                        font-family: 'TaggboxSocialFonts';
                        src:  url('${CloudUrl}/media/web-fonts/TaggboxIcon.eot?jkob7x');
                        src:  url('${CloudUrl}/media/web-fonts/TaggboxIcon.eot?jkob7x#iefix') format('embedded-opentype'),
                            url('${CloudUrl}/media/web-fonts/TaggboxIcon.ttf?jkob7x') format('truetype'),
                            url('${CloudUrl}/media/web-fonts/TaggboxIcon.woff?jkob7x') format('woff'),
                            url('${CloudUrl}/media/web-fonts/TaggboxIcon.svg?jkob7x#TaggboxSocialFonts') format('svg');
                        font-weight: normal;
                        font-style: normal;
                        font-display: block;
                    }`}
                </style>
                }
                {wall.Personalization.cssStatus === 1 ? <style type="text/css">{wall.Personalization.css}</style> : null}
                {
                    wall.UgcSettings.onsite_status && wall.UgcSettings.onsite_link_font_btn ? !isUgcButtonInheritFont ? <link href={`https://fonts.googleapis.com/css?family=${wall.UgcSettings.onsite_link_font_btn}:${wall.UgcSettings.onsite_font_varient_btn}`} rel="stylesheet" /> : null : null
                }
                {
                    wall.UgcSettings.onsite_status && wall.UgcSettings.onsite_link_font_msg ? !isUgcModalInheritFont ? <link href={`https://fonts.googleapis.com/css?family=${wall.UgcSettings.onsite_link_font_msg}:${wall.UgcSettings.onsite_font_varient_msg}`} rel="stylesheet" /> : null : null
                }
                {
                    postFont ? !isPostInheritFont ? <link href={`https://fonts.googleapis.com/css?family=${wall.ThemeRule.link_font}:${wall.ThemeRule.font_varient}&display=swap`} rel="stylesheet" /> : null : null
                }
                {
                    wall.Banner && Object.keys(wall.Banner).length > 0 && wall.Banner.subtitle_link_font !== "" && wall.Banner.subtitle_link_font ? !isBSubTitleInheritFont ? <link href={`https://fonts.googleapis.com/css?family=${wall.Banner.subtitle_link_font}:${wall.Banner.subtitle_font_varient}&display=swap`} rel="stylesheet" /> : null : null
                }
                {
                    wall.Banner && Object.keys(wall.Banner).length > 0 && wall.Banner.title_link_font !== "" && wall.Banner.title_link_font ? !isBTitleInheritFont ? <link href={`https://fonts.googleapis.com/css?family=${wall.Banner.title_link_font}:${wall.Banner.title_font_varient}&display=swap`} rel="stylesheet" /> : null : null
                }
                {
                    <script async>

                        {`window.twttr = (function (d, s, id) {
                            var js, fjs = d.getElementsByTagName(s)[0],
                                t = window.twttr || {};
                            if (d.getElementById(id)) return t;
                            js = d.createElement(s);
                            js.id = id;
                            js.src = "https://platform.twitter.com/widgets.js";
                            fjs.parentNode.insertBefore(js, fjs);

                            t._e = [];
                            t.ready = function (f) {
                                                    t._e.push(f);
                            };

                            return t;
                            }(document, "script", "twitter-wjs"));`
                        }
                    </script>
                }


                {
                    (wall.Wall && wall.Wall.google_tacking_status) ? <script async src="https://www.googletagmanager.com/gtag/js"></script> : null
                }
                {
                    (wall.Wall && wall.Wall.google_tacking_status) ? <script async>
                        {`window.dataLayer = window.dataLayer || [];
                    function gtag() {dataLayer.push(arguments); }
                    gtag("js", new Date());
                    window.gaTokenClient = '${wall.Wall.google_tacking_code}';
                    gtag("event", "page_view", {
                        "send_to": window.gaTokenClient,
                    "anonymize_ip": true,
                    });`}

                    </script> : null
                }
            </Helmet>
        );
    }
}
