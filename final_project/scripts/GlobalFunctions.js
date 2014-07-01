/* FUNCTIONS */

function mkMesh(geom, mat, castShadow, receiveShadow) {
	var obj = new THREE.Mesh(geom, mat);
	obj.castShadow = castShadow;
	obj.receiveShadow = receiveShadow;
	return obj;
}

function updateSkyboxColor() {
	for (var i = 0; i < 6; i++) {
		skybox.material.materials[i].color = skybox.color;
	}
}

function updateFogColor() {
	scene.fog.color.r = skybox.color.r/2;
	scene.fog.color.g = skybox.color.g/2;
	scene.fog.color.b = skybox.color.b/2;
}

function onDocumentMouseDown(event) {
	event.preventDefault();
	if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
		var vector = new THREE.Vector3(0, 0, 0.5);
		projector.unprojectVector(vector, camera);
		var raycaster = new THREE.Raycaster(vector,
			controls.getDirection(new THREE.Vector3(0, 0, 0)).clone());
	} else {
		var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
		projector.unprojectVector(vector, camera);
		var raycaster = new THREE.Raycaster(camera.position,
			vector.sub(camera.position).normalize());

	}
	var intersects = raycaster.intersectObjects(toIntersect);
	if (intersects.length > 0) {
		intersects[0].object.interact && intersects[0].object.interact();
	}
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function initStats() {
	var stats = new Stats();
	stats.setMode(0);
	$('#stats').append(stats.domElement);
	return stats;
}

function animate() {
	requestAnimationFrame(animate);
	render();
	update();
}

function update() {
	// stats
	stats.update();
	// animations
	TWEEN.update();
	// control gui
	if (guiControls.enableTrackball) {
		trackballControls.update();
	}
	// first person controls
	if (FPenabled === true) {
		computeFPControls();
	}
	// video
	if (video.readyState === video.HAVE_ENOUGH_DATA) {
		video_imageContext.drawImage(video, 0, 0);
		if (video_texture)
			video_texture.needsUpdate = true;
		video.updateVolume();
	}
	// sounds and videos volume
	for (var i = 0; i < soundsToUpdate.length; i++) {
		soundsToUpdate[i].updateVolume();
	}
	// particle systems
	for (var i = 0; i < particleSystemsToUpdate.length; i++) {
		particleSystemsToUpdate[i].updatePosition();
	}
	// mirror camera (HEAVY!!)
	if (guiControls.showMirror) {
		camera_mirror.visible = false;
		camera_mirror.updateCubeMap(renderer, scene);
		camera_mirror.visible = true;
	}
	// skybox color
	updateSkyboxColor();
	// fog color
	updateFogColor();
	
}

function render() {
	renderer.render(scene, camera);
}