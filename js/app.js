$('#user-form').submit(function(event)
{
	event.preventDefault();
	var userfrm = $('#user-form');
	var username = userfrm.find('input[name = "q"]');
	var error = false;
	console.log("Form submitted");

	if(username.val() =='')
	{
		username.css("border-color", "red");
		error = true;
	}

	if(!error)
	{
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
	}
});

$('#username').keyup(function(){
	$('#user-form').trigger('submit');
});


