THREE.Cache.enabled = true;

var BOOK_COUNT = BOOKS.length;
for (var i = 0; i < BOOK_COUNT; i++) {
	BOOKS[i].index = i;
}

console.log(BOOK_COUNT.toString() + ' books in this collection:', BOOKS);

var SPIN = false;
var clock = new THREE.Clock();
var container;
var camera, scene, controls, renderer, raycaster;
var group, entities;

var mouse = new THREE.Vector2();
var INTERSECTED = null;
var MOUSE_CLICKING = false;

//  START
init();
animate();

function addBooks() {
	for (var i = 0; i < BOOK_COUNT; i++) {
		var book = BOOKS[i];
		if (book['Image URL'] && book['Image URL'] !== '') {
			addImage(BOOKS[i]);
		} else {
			console.log('Missing cover image for book ' + i + ': ' + book['Title']);
		}
	}
};

function addImage( image ) {
	var title = image['Title'];
	var cover = image['Image URL'];
	new THREE.ImageLoader()
		.setCrossOrigin( '*' )
		.load( cover, function( imageFile ) {
			var texture = new THREE.CanvasTexture( imageFile );
			texture.name = title;
			addEntity( texture, title, image['URL'] );
	});
};

function scramble( entity ) {
	var denominator = 20; // read more books === increase this number
	var multiplier = 20; // read more books === increase this number
	var xPos = (BOOK_COUNT / denominator) - (Math.random() * multiplier - 1);
	var yPos = (BOOK_COUNT / denominator) - (Math.random() * multiplier - 1);
	var zPos = Math.random() * multiplier - 1;
	entity.position.set( xPos, yPos, zPos );
	entity.rotation.set( Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI );
}

function unscramble( entity ) {
	for (var i = 0; i < BOOK_COUNT; i++) {
		var book = BOOKS[i];
		if (book['Title'] == entity.name) {
			index = book.index + 1;
			break;
		}
	}
	
	// set up six rows 
	var A = BOOK_COUNT / 6;
	var B = A * 2;
	var C = A * 3;
	var D = A * 4;
	var E = A * 5;
	var F = A * 6;
	var xStart = index - (A / 2);
	var x;
	var y;

	if (index <= A) {
		y = 5;
		x = xStart;
	} else if (index <= B && index > A) {
		y = 3;
		x = xStart - A;
	} else if (index <= C && index > B) {
		y = 1;
		x = xStart - B;
	} else if (index <= D && index > C) {
		y = -1;
		x = xStart - C;
	} else if (index <= E && index > D) {
		y = -3;
		x = xStart - D;
	} else if (index <= F && index > E) {
		y = -5;
		x = xStart - E;
	}

	entity.position.set( x, y, -20 );
	entity.rotation.set( 0, 0, 0);

	return entity;
};

function addEntity( texture, name, link ) {
	// console.log("Entity Width:", texture.image.naturalWidth, "Entity Height:", texture.image.naturalHeight);
	var aspectRatio = texture.image.naturalWidth / texture.image.naturalHeight;
	// console.log("Aspect Ratio:", aspectRatio);
	var geometry = new THREE.PlaneGeometry( aspectRatio, 1);
	var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
	var entity = new THREE.Mesh( geometry, material );
	entity.name = name;
	entity.userData.url = link;
	entity = unscramble(entity);
	// entity.position.set( Math.random() * 12 - 1, Math.random() * 12 - 1, Math.random() * 12 - 1 );
	// entity.rotation.set( Math.random() * 12 * Math.PI, Math.random() * 12 * Math.PI, Math.random() * 12 * Math.PI );
	entities.add( entity );
};

function initCamera( zoom ) {
	zoom = zoom ? zoom : 25;
	camera.position.set( 0, 0, zoom );
	camera.lookAt( new THREE.Vector3() );
	if ( group ) {
		group.rotation.y = 0;
		group.rotation.x = 0;
	}
};

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
	initCamera();

	// SCENE
	scene = new THREE.Scene();

	// GROUP
	group = new THREE.Group();
	scene.add( group );

	// GRID
	// group.add( new THREE.GridHelper( 10, 20, 'turquoise' ) );

	// BOOKS
	entities = new THREE.Group();
	group.add( entities );

	addBooks();

	function stopSpin() {
		// var btn = document.querySelector('#spin_btn');
		// btn.className = '';
		SPIN = false;
	}

	var resetBtn = document.getElementById( 'reset_btn' );
	resetBtn.addEventListener( 'click', function( e ) {
		initCamera();
		stopSpin();
		var eggs = entities.children;
		for(var i = 0; i < eggs.length; i++) {
			unscramble(eggs[i]);
		}
		// // CLEAR
		// while( entities.children.length ) {
		// 	var entity = entities.children[ 0 ]
		// 	entities.remove( entity );
		// 	entity.geometry.dispose();
		// 	entity.material.map.dispose();
		// }
	});

	// var spinBtn = document.getElementById( 'spin_btn' );
	// spinBtn.addEventListener( 'click', function( e ) {
	// 	if ( SPIN ) {
	// 		stopSpin();
	// 	} else {
	// 		e.target.className = 'on';
	// 		SPIN = true;
	// 	}
	// });

	var scrambleBtn = document.getElementById( 'scramble_btn' );
	scrambleBtn.addEventListener( 'click', function( e ) {
		initCamera(50);
		var eggs = entities.children;
		for(var i = 0; i < eggs.length; i++) {
			scramble(eggs[i]);
		}
		SPIN = true;
	});

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	// RAYCASTER
	raycaster = new THREE.Raycaster();

	if (window.mobilecheck() == true) {
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.rotateSpeed = 1;
		controls.minDistance = 0;
	}
	else {
		// CONTROLS
		controls = new THREE.FlyControls( camera, renderer.domElement );
		controls.movementSpeed = 10;
		controls.domElement = container;
		// controls.rollSpeed = Math.PI / 24;
		controls.rollSpeed = 0.2;
		controls.autoForward = false;
		controls.dragToLook = true;
		// controls.dragToLook = false;
	}

	// EVENTS
	document.addEventListener('mousemove', mouseMoveHandler, false);
	document.addEventListener('mousedown', mouseDownHandler, false);
	document.addEventListener('mouseup', mouseUpHandler, false);

	window.addEventListener( 'resize', windowResizeHandler, false );
};

// EVENT HANDLERS

function mouseMoveHandler(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	MOUSE_CLICKING = false;
};
function mouseDownHandler(event) {
	event.preventDefault();
	MOUSE_CLICKING = true;
};
function mouseUpHandler(event) {
	event.preventDefault();
	MOUSE_CLICKING = false;
};
function windowResizeHandler() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

//  MAIN LOOP

function animate() {
	if ( SPIN ) {
		// ROTATE
		group.rotation.y = performance.now() / 6000;
		group.rotation.x = performance.now() / 9000;
	}

	renderer.render( scene, camera );
	requestAnimationFrame( animate );

	var delta = clock.getDelta();
	controls.update( delta );

	// find intersections
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children, true );
	if ( intersects.length > 0 ) {
		document.body.style.cursor = 'pointer';
		if ( MOUSE_CLICKING ) {
			if ( INTERSECTED != intersects[ 0 ].object ) {
				// if ( INTERSECTED ) {
				// 	for (var i = 0; i < entities.children.length; i++) {
				// 		var mesh = entities.children[i];
				// 		mesh.material.color.setRGB(1,1,1);
				// 	}
				// }
				INTERSECTED = intersects[0].object;
				// INTERSECTED.material.color.setRGB(0.6,1.0,1.0);
				console.log('Clicked on:', INTERSECTED);
				window.open(INTERSECTED.userData.url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=1200,height=700');
			}
		}
	} else {
		document.body.style.cursor = 'default';
		INTERSECTED = null;
		// for (var i = 0; i < entities.children.length; i++) {
		// 	var mesh = entities.children[i];
		// 	mesh.material.color.setRGB(1,1,1);
		// }
	}
};
