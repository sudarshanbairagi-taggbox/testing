var ApplicationEmbed = ApplicationEmbed || function (w, u) {
    var AppPath = "./embed.json";
    function randomID(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    return {
        init: function () {
            var socialwall = document.getElementsByClassName('taggbox-socialwall').length

            var container = socialwall && socialwall > 0 ? document.getElementsByClassName('taggbox-socialwall') : document.getElementsByClassName('taggbox');



            for (var i = 0; i < container.length; i++) {
                if (container[i].getAttribute("data-is-load") == undefined || container[i].getAttribute("data-is-load") == "0" || container[i].getAttribute("data-is-load") == null) {
                    const url = AppPath;
                    //window.wall_Id = container[i].getAttribute("data-wall-id");
                    const rootID = `root_${randomID(5)}`
                    container[i].setAttribute("data-render-id", rootID)
                    container[i].setAttribute("data-is-load", 0)
                    container[i].setAttribute("id", `co_${rootID}`)

                    fetch(url)
                        .then(response => response.json())
                        .then(json => {
                            const { css, id, script } = json;

                            let myScript = document.createElement("div");
                            myScript.setAttribute("id", rootID);

                            if (document.getElementById(`co_${rootID}`)) {
                                document.getElementById(`co_${rootID}`).appendChild(myScript);
                                //document.getElementsByClassName('taggbox-socialwall')[0].appendChild(myScript);


                                let myCss = document.createElement("link");
                                myCss.setAttribute("type", 'text/css');
                                myCss.setAttribute("rel", 'stylesheet');
                                myCss.setAttribute("href", css);
                                document.head.appendChild(myCss);


                                let myreact = document.createElement("script");
                                myreact.setAttribute("src", script);
                                document.body.appendChild(myreact);
                            }
                        })
                }
            }

        }
    };
}(window, undefined);
ApplicationEmbed.init();