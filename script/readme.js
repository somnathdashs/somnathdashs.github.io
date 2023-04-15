
function GetURL() {
    const mykey = window.location.search;
    const urlP = new URLSearchParams(mykey);
    const UR = urlP.get("url");
    Readme(UR);

}



async function Readme(url) {
    await $("#included_content").load(`${url}`, function (data) {
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            langPrefix: '',
            highlight: function (code, lang) {
                return code;
            }
        });
        var html_str = marked(data);
        $("#display_content").html(html_str);
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
    });
    // document.getElementById("display_content").id="lop"

    $(document).ready(function() {
        $('a').attr('target', '_blank');
    });

}


GetURL();
