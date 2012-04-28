$(document).ready(function(){
    var socket = io.connect('http://192.168.3.75:8081');
    
    socket.on('getRedisDataResponse', function (data) {
		publishNovelFragment(data[0], data);
    });

    socket.on('publish', publishNovelFragment);
    
    socket.on('connect', function (data) {
        socket.emit('getRedisData', {});
    });  

    $("#publish-form").submit(function(event){
        event.preventDefault();
        
        var pid = $('#publish').attr('data-pid');
        socket.emit('setRedisData', { pid: pid, text: $('#novel-fragment-input').val(), user: $('#user-input').val()});
        return false;
    });

    function publishNovelFragment(data,brothers){
		var last = $('#novel').find('.novel-fragment').last();
		if ( last.length != 0 ) {
			console.log( data.pid , last.attr('data-id') );
			if ( data.pid != last.attr('data-id') ) return false;
		}
		
		
		
		if ( !brothers ) var brothers = {}
		socket.emit('getRedisData', {pid: data.id});
        var novel_fragment_template = _.template( $("#novel-fragment-template").html(), {novel_fragment_id: data.id, novel_fragment_text: data.text, novel_fragment_bothers:brothers, user: data.user} );
        var nf = $(novel_fragment_template).appendTo($('#novel'));
        $('#publish').attr('data-pid' , data.id);
        
		$(nf).find('.view-branch').click(function(e) {
			var id = $(e.currentTarget).parents('.novel-fragment').attr('data-id');
			var del = false;
			$('#publish').attr('data-pid' ,  $(e.currentTarget).parents('.novel-fragment').prev('.novel-fragment').attr('data-id'));
			$('#novel').find('.novel-fragment').each(function(index, ele) {
				if ( $(ele).attr('data-id') == id ) { del = true; }
				if ( del ) { $(ele).remove(); }
			});
			socket.emit('getRedisData', {id:  $(e.currentTarget).attr('data-id')});
		});
		
		$(nf).find('.make-branch').click(function(e) {
			var pid = $(e.currentTarget).parents('.novel-fragment').attr('data-id');
			var del = false;
			$('#publish').attr('data-pid' , pid);
			$('#novel').find('.novel-fragment').each(function(index, ele) {
				if ( del ) { $(ele).remove(); }
				if ( $(ele).attr('data-id') == pid ) { del = true; }
			});
		});
        return false;
    }
});
