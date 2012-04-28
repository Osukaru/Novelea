$(document).ready(function(){
    var socket = io.connect('http://192.168.3.75:8081');
    
    socket.on('getRedisDataResponse', function (data) {
        for (var i = 0; i < data.length; i++) {
            publishNovelFragment(data[i]);
        };

    });

    socket.on('publish', publishNovelFragment);
    
    socket.on('connect', function (data) {
        socket.emit('getRedisData', {});
    });  

    $("#publish-form").submit(function(event){
        event.preventDefault();
        socket.emit('setRedisData', { text: $('#novel-fragment-input').val()});
        return false;
    });

    function publishNovelFragment(data){
        var novel_fragment_template = _.template( $("#novel-fragment-template").html(), {novel_fragment_id: data.id, novel_fragment_text: data.text} );
        $('#novel').append(novel_fragment_template); 
        return false;
    }
});