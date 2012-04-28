var NovelView = Backbone.View.extend({

    el: '#novel',

    events: {
        'click #publish' : 'publishNovelFragment',
    },

    initialize: function() {
        
    },

    publishNovelFragment: function(event) {
        var novel_fragment_text = $(this.el).find('#novel-fragment-input').val();
        var novel_fragment_template = _.template( $("#novel-fragment-template").html(), {novel_fragment_id: 1, novel_fragment_text: novel_fragment_text} );
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