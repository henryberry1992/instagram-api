$('#user-form').submit(function(event)
{
	event.preventDefault();
	var userfrm = $('#user-form');
	var username = userfrm.find('input[name = "q"]');
	console.log("Form submitted");
	
	$.ajax({
		url:userfrm.attr('action'),
		type:userfrm.attr('method'),
		data:userfrm.serialize(),
		dataType:'jsonp',
		success:function(data)
		{	
			console.log(data);
			$('#insta-user').html('');
			for(var i=0; i<10; i++)
			{
				var i_username = data.data[i].username;
				var i_profile_picture = data.data[i].profile_picture;
				var i_fullname = data.data[i].full_name;
				$('#insta-user').append('<li><a href="https://instagram.com/'+i_username+'"><img class="profile-photo" src="'+i_profile_picture+'">'+i_fullname+'</a></li>');	
			}
		},
		error: function(data)
		{
			console.log(data);
		}
	});
});

$('#username').keyup(function(){
	$('#user-form').trigger('submit');
});


$('#tag-form').submit(function(){instagram_api($(this));return false;})

function instagram_api(frm)
{
	var search = frm.find('input[name="q"]').val();
	console.log(search);
	ajax_call(search);
}

function images_response(data)
{
	console.log(data);
	images = data.data;
	$('#tag-user').html('');
	
	for(image in images)
	{
	    var image_url = images[image].images.standard_resolution.url;
	    var tag_link = images[image].link;
		$('#tag-user').append('<li><a href = "'+tag_link+'"><img src = "'+image_url+'"></a></li>');
	}
}
function ajax_call(tag)
{
	$.ajax({
		url:'https://api.instagram.com/v1/tags/'+encodeURIComponent(tag)+'/media/recent?client_id=61f8b631abd34732a3bcd8c73d0d73a9',
		type:'GET',
		dataType:'jsonp',
		success:function(data){
			images_response(data);
		},
		error:function(data){
			console.log(data);
		}
	});
}
