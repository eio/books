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
	// Snug padding so the semitransparent background hugs the text instead of
	// ballooning far past it (was 100px top / 100px right / 10% bottom).
	style.paddingTop = '10px';
	style.paddingRight = '12px';
	style.paddingLeft = '12px';
	style.paddingBottom = '10px';
	style.borderRadius = '6px';
	style.backgroundColor = 'rgba(0,0,0,0.8)';
}

var controls = '\
<img id="globe" draggable="false" src="img/globe.svg"\
	 title="World map view"\
	 style="width:32px; height:32px; left:10px; top:10px; z-index:200; position:absolute; cursor:pointer;"\
	 onclick="window.location.href=\'map.html\'"/>\
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