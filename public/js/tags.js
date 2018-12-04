function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function init() {
    var tag = getParameterByName('tag');
    if(tag) {
        $('#post-by-tag').show();
        $.ajax({
            url: "/data/tags.json", 
            success: function(result){
                var listPost = '';
                result.forEach(post => {
                    if(post.tags.indexOf(tag) > -1) {
                        listPost += '<a href="' + post.url + '">- ' + post.title + '</a>';
                    }
                });
                setTimeout(function() {
                    $('#tag-post').append(listPost);
                    $('#tag-load').hide();
                    $('#post-by-tag').show();
                    $('#tag-post').show();
                }, 1000);
            }
        });
        $('#tag-search').text('#' + tag);
    }
}

init();