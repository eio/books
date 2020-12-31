function initControls() {
	var style = document.getElementById('controls').style;
	style.opacity = 0.5;
	style.fontSize = '50%';
	style.position = 'absolute';
	style.zIndex = 100;
	style.top = '10px';
	style.right = '10px';
	style.paddingTop = '0px';
	style.paddingRight = '0px';
	style.paddingLeft = '0px';
	style.paddingBottom = '0px';
	style.backgroundColor = 'rgba(0,0,0,0)';
}
function bigControls() {
	var style = document.getElementById('controls').style;
	style.opacity = 1.0;
	style.fontSize = '200%';
	style.position = 'absolute';
	style.zIndex = 100;
	style.paddingTop = '100px';
	style.paddingRight = '100px';
	style.paddingLeft = '10px';
	style.paddingBottom = '10%';
	style.backgroundColor = 'rgba(0,0,0,0.8)';
}

var controls = '\
<img id="gitcat" draggable="false" src="img/gitcat.svg"\
	 style="left:10px; top:10px; z-index:200; position:absolute; cursor:pointer;"\
	 onclick="window.open(\'https://github.com/eio/books\')"/>\
<div id="info">\
	<div class="actions">\
		<span id="reset_btn">Order</span>\
		<span id="scramble_btn">Chaos</span>\
	</div>\
</div>\
<br>\
<div id="controls"\
	 onmouseover="bigControls()"\
	 onmouseout="initControls()"\
	 onclick="initControls()"\
>\
	<p class="controlstext">\
		<b><u>Controls</u></b>\
	</p>\
	<b>W:</b> forwards, <b>S:</b> backwards, <b>A:</b> left, <b>D:</b> right,\
	<br>\
	<b>R/F:</b> up/down, <b>Q/E:</b> roll, <b>&uarr;/&darr;:</b> pitch, <b>&larr;/&rarr;:</b> yaw<br/>\
</div>\
<br>';

document.body.innerHTML = controls;