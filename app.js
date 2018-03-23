var bv = '#button-view'; //jQuery ref to button container
var g = '#giphys';
var topics = ['rupauls drag race', 'oitnb', 'top model', 'queer eye', 'portlandia', 'snl',  'the orville'];
var imgData;

$(document).ready(function () {
	//Build initial button array
	for (var i=0; i< topics.length; i++) {
		$(bv).append($('<button>').text(topics[i]).attr('class','search'));
	}

	//Populate with gifs (with a g as in golf)
	drawGifs(topics[0]);

	//Create click events for buttons
	$(document).on('click','.search',function () {
		drawGifs($(this).text());
	});

	//Create click event for button creator
	$('#button-form').submit(function (evt) {
		evt.preventDefault();
		var search = $('#new-text').val().trim();
		$(bv).append($('<button>').text(search).attr('class','search'));
		drawGifs(search);
	});

	//Create click event for imgs: switch b/w still & animated
	$(document).on('click','img', function () {
		if ($(this).attr('data-state')=='still') {
			$(this).attr('src',$(this).attr('data-anim'));
			$(this).attr('data-state','anim');
		}
		else {
			$(this).attr('src',$(this).attr('data-still'));
			$(this).attr('data-state','still');
		}
	});
});

function drawGifs(topic) {
	$(g).empty();
	var url = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=UI353geiJj9Q4GEjZy7qgGT5vqoeJ4nj&limit=10";
	$.get(url, function (res) {
		for (var i=0;i<res.data.length;i++) {
			var newEl = $('<span>')
			var newImg = $('<img>').attr('src',res.data[i].images.fixed_width_small_still.url); //img src=still
			newImg.attr('data-still',res.data[i].images.fixed_width_small_still.url);
			newImg.attr('data-anim',res.data[i].images.fixed_width_small.url);
			newImg.attr('data-state','still');
			newEl.append(newImg);
			newEl.append($('<span>').text(res.data[i].rating));
			$(g).append(newEl);	
		}
	});
}
