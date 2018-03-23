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
	$('#create-btn').click(function () {
		var search = $('#new-text').val().trim();
		$(bv).append($('<button>').text(search).attr('class','search'));
	});

	//Create click event for imgs: switch b/w still & animated
	$(document).on('click','img', function () {
		var currURL = $(this).attr('src');
		var stillURL = imgData[Number($(this).attr('index'))].images.fixed_width_small_still.url;
		if (currURL == stillURL) {
			$(this).attr('src',imgData[Number($(this).attr('index'))].images.fixed_width_small.url);
		}
		else {
			$(this).attr('src',imgData[Number($(this).attr('index'))].images.fixed_width_small_still.url);
		}
	});
});

function drawGifs(topic) {
	$(g).empty();
	var url = "http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=UI353geiJj9Q4GEjZy7qgGT5vqoeJ4nj&limit=10";
	$.get(url, function (res) {
		imgData = res.data;
		for (var i=0;i<res.data.length;i++) {
			$(g).append($('<img>').attr('src',res.data[i].images.fixed_width_small_still.url).attr('index',i));
		}
	});
}
