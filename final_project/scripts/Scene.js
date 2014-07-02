/* BASIC SCENE */

// FOG

scene.fog = new THREE.Fog('#c0c0c0', 500, 500);

// SKYBOX

var directions = ["xpos", "xneg", "zpos", "zneg", "ypos", "yneg"];
var materialArray = [];
for (var i = 0; i < 6; i++)
	materialArray.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture(textures_path + "skybox_" + directions[i] + ".jpg"),
		side: THREE.BackSide
	}));
var skybox_material = new THREE.MeshFaceMaterial(materialArray);
var skybox = new THREE.Mesh(new THREE.CubeGeometry(500, 500, 500), skybox_material);
skybox.color = new THREE.Color('#FFFFFF');
scene.add(skybox);

// AVATAR

var avatar_material = new THREE.MeshBasicMaterial({
	map: THREE.ImageUtils.loadTexture(textures_path + "trollface.png"),
	side: THREE.DoubleSide,
	transparent: true,
	opacity: 0.9
});
var avatar = mkMesh(new THREE.PlaneGeometry(0.6, 0.6), avatar_material, false, false);
avatar.position.y = -0.4;
camera.add(avatar);

// GRASS - LANDING

var grass = mkMesh(new THREE.PlaneGeometry(100, 100, 2, 2), grass_material, false, true);
grass.rotation.x = -Math.PI / 2;
grass.position.y = -0.1;
scene.add(grass);
objects.push(grass);