import React, { PureComponent } from "react";
import Emojify from 'react-emojione';
import ReactHtmlParser from 'react-html-parser';
const reactStringReplace = require("react-string-replace");
//import { PostTrimContent } from "../../../../actions/themeActions";
const convertSlackEmoji = (data) => {
    return <Emojify>{ReactHtmlParser(data)}</Emojify>
}
const ContentWithOutSlack = ({ data, content, Personalization }) => {
    const customHasTagStyle = {
        color: Personalization.hashtag_color,
        fontWeight: "bold",
        backgroundColor: Personalization.hashtag_background_status == 1 ? Personalization.hashtag_background_color : 'transparent'
    }

    return data.network.id == 20 && window.slackdown ? <>
        {
            console.log("slack", window.slackdown.parse(content, data.slackMember))
        }
        {Personalization.hashtag_highlight === 1 &&
            Personalization.hashtag_feed === 0 &&
            Personalization.hashtag_all === 0
            ? ReactHtmlParser(content)
            : Personalization.hashtag_highlight === 1 &&
                Personalization.hashtag_feed === 0 &&
                Personalization.hashtag_all === 1
                ? convertSlackEmoji(window.slackdown.parse(reactStringReplace(
                    content,
                    /#(\w+)/g,
                    (match, i) => (
                        <div className="tb_text_hashtag" style={customHasTagStyle}>
                            #{match}
                        </div>
                    )
                ), data.slackMember))
                : Personalization.hashtag_highlight === 1 &&
                    Personalization.hashtag_feed === 1 &&
                    Personalization.hashtag_all === 0
                    ? convertSlackEmoji(window.slackdown.parse(reactStringReplace(
                        content,
                        data.hash.hashString,
                        (match, i) => (
                            <div className="tb_text_hashtag" style={customHasTagStyle}>
                                {match}
                            </div>
                        )
                    ), data.slackMember))
                    : Personalization.hashtag_highlight === 1 &&
                        Personalization.hashtag_feed === 1 &&
                        Personalization.hashtag_all === 1
                        ? convertSlackEmoji(window.slackdown.parse(reactStringReplace(
                            content,
                            /#(\w+)/g,
                            (match, i) => (
                                <div key={i} className="tb_text_hashtag" style={customHasTagStyle}>
                                    #{match}
                                </div>
                            )
                        ), data.slackMember))
                        : convertSlackEmoji(window.slackdown.parse(content, data.slackMember))}
    </> : <>

            {Personalization.hashtag_highlight === 1 &&
                Personalization.hashtag_feed === 0 &&
                Personalization.hashtag_all === 0
                ? ReactHtmlParser(content)
                : Personalization.hashtag_highlight === 1 &&
                    Personalization.hashtag_feed === 0 &&
                    Personalization.hashtag_all === 1
                    ? reactStringReplace(
                        ReactHtmlParser(content),
                        /#(\w+)/g,
                        (match, i) => (
                            <div className="tb_text_hashtag" style={customHasTagStyle}>
                                #{match}
                            </div>
                        )
                    )
                    : Personalization.hashtag_highlight === 1 &&
                        Personalization.hashtag_feed === 1 &&
                        Personalization.hashtag_all === 0
                        ? reactStringReplace(
                            ReactHtmlParser(content),
                            data.hash.hashString,
                            (match, i) => (
                                <div className="tb_text_hashtag" style={customHasTagStyle}>
                                    {match}
                                </div>
                            )
                        )
                        : Personalization.hashtag_highlight === 1 &&
                            Personalization.hashtag_feed === 1 &&
                            Personalization.hashtag_all === 1
                            ? reactStringReplace(
                                ReactHtmlParser(content),
                                /#(\w+)/g,
                                (match, i) => (
                                    <div key={i} className="tb_text_hashtag" style={customHasTagStyle}>
                                        #{match}
                                    </div>
                                )
                            )
                            : ReactHtmlParser(content)}
        </>
}

export default ContentWithOutSlack;