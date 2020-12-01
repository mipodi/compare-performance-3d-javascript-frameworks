import * as THREE from 'three'

let camera, scene, renderer;
let geometry, material, mesh, light;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf2f8fb );

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();
    light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
    scene.add( light );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}
