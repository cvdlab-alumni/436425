/* APARTMENT */

var apartment = new THREE.Object3D();
apartment.rotation.x = -Math.PI / 2;
apartment.position.set(-9.5, 0, 11);


// FLOOR

var floor_G = new THREE.BoxGeometry(22, 19, 0.5);
var floor = mkMesh(floor_G, floor_material, false, true);
floor.position.set(11, 9.5, -0.25);
apartment.add(floor);


// ROOF

if (!disableRoof) {
	var roof_G = new THREE.BoxGeometry(22, 19, 0.05);
	var roof = mkMesh(roof_G, roof_material, false, true);
	roof.position.set(11, 9.5, 3.5);
	roof.visible = false;
	apartment.add(roof);

	roof_tiles_G = new THREE.PlaneGeometry(22, 19, 50, 50);
	roof_tiles_G.computeTangents();
	var roof_tiles = new THREE.Mesh(roof_tiles_G, roof_tiles_material);
	roof_tiles.position.set(11, 9.5, 3.45);
	roof_tiles.visible = false;
	apartment.add(roof_tiles);
}

var parabolicAntenna_container = new THREE.Object3D();
var loader = new THREE.OBJLoader();
loader.load(models_path + 'parabolic_antenna.obj', function(parabolicAntenna) {
	parabolicAntenna.traverse(function(child) {
		if (child instanceof THREE.Mesh) {
			child.material = parabolicAntenna_material;
		}
	});
	parabolicAntenna_container.add(parabolicAntenna);
});
parabolicAntenna_container.rotation.x = 1.2;
parabolicAntenna_container.rotation.y = 0.6;
parabolicAntenna_container.position.set(23.05, 3, 2.5);
parabolicAntenna_container.inPosition = true;
apartment.add(parabolicAntenna_container);

scene.add(apartment);