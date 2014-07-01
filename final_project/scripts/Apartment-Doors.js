/* DOORS */

function mkDoor(width, height, thickness, castShadow, receiveShadow, opening) {
	// door
	var door_G = new THREE.BoxGeometry(width, thickness, height);
	var door = mkMesh(door_G, door_material, castShadow, receiveShadow);
	// support
	var support1_G = new THREE.CylinderGeometry(0.04, 0.04, 0.3);
	var support1 = mkMesh(support1_G, door_support_material, castShadow, receiveShadow);
	support1.rotation.x = Math.PI / 2;
	support1.position.set(width / 2, 0, 0.7);
	door.add(support1);
	var support2 = support1.clone();
	support2.position.z = -0.7;
	door.add(support2);
	// handle
	var handle = mkMesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2), door_handle_material, castShadow, receiveShadow);
	handle.position.set(-width * 0.4, 0, -height * 0.05);
	var handle_p1 = mkMesh(new THREE.TorusGeometry(0.1, 0.02, 8, 6, Math.PI / 2), door_handle_material, castShadow, receiveShadow);
	handle_p1.rotation.y = Math.PI;
	handle_p1.position.set(0.1, 0.1, 0);
	handle.add(handle_p1);
	var handle_p2 = mkMesh(new THREE.CylinderGeometry(0.02, 0.02, 0.15), door_handle_material, castShadow, receiveShadow);
	handle_p2.rotation.z = Math.PI / 2;
	handle_p2.position.set(0.175, 0.2, 0);
	handle.add(handle_p2);
	var handle_p3 = mkMesh(new THREE.TorusGeometry(0.1, 0.02, 8, 6, Math.PI / 2), door_handle_material, castShadow, receiveShadow);
	handle_p3.rotation.z = Math.PI;
	handle_p3.position.set(0.1, -0.1, 0);
	handle.add(handle_p3);
	var handle_p4 = handle_p2.clone();
	handle_p4.position.y = -0.2;
	handle.add(handle_p4);
	var handle_p5 = mkMesh(new THREE.CylinderGeometry(0.06, 0.06, 0.13, 24, 24), door_handle_material, castShadow, receiveShadow);
	handle.position.set(-width * 0.4, 0, -height * 0.05);
	handle.add(handle_p5);
	door.add(handle);
	// hook
	var hook = new THREE.Object3D();
	door.position.x = -width / 2;
	door.position.z = height / 2;
	hook.add(door);
	// interaction
	toIntersect.push(door);
	door.isOpen = false;
	door.interact = function() {
		importDoorAnimations(this, opening);
		if (!this.isOpen) {
			doorHandleOpenTween.start();
			doorOpenTween.start();
			door_close_sound.stop();
			door_open_sound.play();
			this.isOpen = true;
		} else {
			doorCloseTween.start();
			door_open_sound.stop();
			door_close_sound.play();
			this.isOpen = false;
		}
	}

	var full_door = new THREE.Object3D();
	full_door.add(hook);

	return full_door;
}

if (!disableDoors) {

	var door1_livingroom = mkDoor(1.5, 2.5, 0.1, true, true, 1);
	door1_livingroom.position.set(8.4, 8.5, 0);
	apartment.add(door1_livingroom);

	var door2_livingroom = mkDoor(1.5, 2.5, 0.1, true, true, 1);
	door2_livingroom.position.set(16.3, 8.5, 0);
	apartment.add(door2_livingroom);

	var door_bedroom1 = mkDoor(1.5, 2.5, 0.1, true, true, -1);
	door_bedroom1.rotation.z = Math.PI / 2;
	door_bedroom1.position.set(6.49, 7.9, 0);
	apartment.add(door_bedroom1);

	var door_bedroom2 = mkDoor(1.4, 2.5, 0.1, true, true, 1);
	door_bedroom2.rotation.z = -Math.PI / 2;
	door_bedroom2.position.set(6.49, 9.3, 0);
	apartment.add(door_bedroom2);

	var door_hallway = mkDoor(1.4, 2.5, 0.1, true, true, 1);
	door_hallway.rotation.z = -Math.PI / 2;
	door_hallway.position.set(17.5, 9.3, 0);
	apartment.add(door_hallway);

	var door_bathroom = mkDoor(1.5, 2.5, 0.1, true, true, 1);
	door_bathroom.rotation.z = Math.PI;
	door_bathroom.position.set(6.9, 11.7, 0);
	apartment.add(door_bathroom);

	var door_kitchen = mkDoor(1.5, 2.5, 0.1, true, true, 1);
	door_kitchen.rotation.z = Math.PI;
	door_kitchen.position.set(10.9, 11.7, 0);
	apartment.add(door_kitchen);
}