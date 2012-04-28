var NovelView = Backbone.View.extend({

    el: '#novel',

    events: {
        'click #publish' : 'sendNovelFragment',
    },

    initialize: function() {  
		console.log(this);      
        var socket = io.connect('http://192.168.3.75:8081');
		socket.on('getRedisDataResponse', function (data) {
			for(var i=0;i<data.length;i++) {
				console.log(data);
				        var novel_fragment_template = _.template( $("#novel-fragment-template").html(), {novel_fragment_id: data[i].id, novel_fragment_text: data[i].text} );
        $('#novel-fragment-list').append(novel_fragment_template); 
			}
		});
		socket.on('publish', this.publishNovelFragment);
		
		socket.on('connect', function (data) {
			socket.emit('getRedisData', {});
		});
		this.socket = socket;
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
