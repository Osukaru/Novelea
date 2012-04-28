var NovelView = Backbone.View.extend({

    el: '#novel',

    events: {
        'click #publish' : 'sendNovelFragment',
    },

    initialize: function() {
        this.socket = io.connect('http://192.168.3.75:8081');
        
        this.socket.on('getRedisDataResponse', function (data) {
            console.log('data'+data);
            for (var i = 0; i < data.length; i++) {
                this.publishNovelFragment(data[i]);
            };

        });

        this.socket.on('publish', this.publishNovelFragment);
        
        this.socket.on('connect', function (data) {
            this.socket.emit('getRedisData', {});
        });        
    },

    sendNovelFragment: function(event) {
        var novel_fragment_text = $(this.el).find('#novel-fragment-input').val();
        this.socket.emit('setRedisData', { text: novel_fragment_text});
        return false;
    },

    publishNovelFragment: function(data) {
        var novel_fragment_template = _.template( $("#novel-fragment-template").html(), {novel_fragment_id: data.id, novel_fragment_text: data.text} );
        $('#novel-fragment-list').append(novel_fragment_template); 
        return false;
    },

    render: function(response){

    }   
});

/*
 * Inicializo todas las vistas y modelos de datos que necesito para la página
 **/
$(document).ready(function() {
    window.novelView = new NovelView();
});