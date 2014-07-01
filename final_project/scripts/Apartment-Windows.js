/* WINDOWS */

function mkWindow(width, height, thickness, vertical_num, horizontal_num, castShadow, receiveShadow, doubleSide, opening) {
	var wnd = new THREE.Object3D();
	if (doubleSide) {
		width = width / 2;
	}

	var left_side_G = new THREE.BoxGeometry(width - 0.02, thickness / 8, height - 0.02);
	var left_side = new mkMesh(left_side_G, window_glass_material, false, false);

	var wood_h_G = new THREE.BoxGeometry(width, thickness / 2, 0.05);
	var wood_h = mkMesh(wood_h_G, window_wood_material, castShadow, receiveShadow);
	for (var i = 0; i < horizontal_num; i++) {
		wood_h_single = wood_h.clone();
		wood_h_single.position.z = (height - 0.05) / (horizontal_num - 1) * i - (height - 0.05) / 2;
		left_side.add(wood_h_single)
	}

	var wood_v_G = new THREE.BoxGeometry(height, thickness / 2.2, 0.05);
	var wood_v = mkMesh(wood_v_G, window_wood_material, castShadow, receiveShadow);
	wood_v.rotation.y = Math.PI / 2;
	for (var i = 0; i < vertical_num; i++) {
		wood_v_single = wood_v.clone();
		wood_v_single.position.x = (width - 0.049) / (vertical_num - 1) * i - (width - 0.049) / 2;
		left_side.add(wood_v_single)
	}

	var interactf = function() {
		importWindowAnimations(this, opening);
		if (!this.isOpen) {
			windowOpenTween.start();
			this.isOpen = true;
		} else {
			windowCloseTween.start();
			this.isOpen = false;
		}
	}

	left_side.position.x = width / 2 - 0.05;
	left_side.position.z = height / 2;
	left_side.isOpen = false;
	left_side.interact = interactf;
	toIntersect.push(left_side);
	var left_hook = new THREE.Object3D();
	left_hook.position.x = 0.05;
	left_hook.add(left_side)
	wnd.add(left_hook);

	if (doubleSide) {
		var right_side = left_side.clone();
		right_side.rotation.y = Math.PI;
		right_side.position.x = -width / 2 + 0.05;
		right_side.position.z = height / 2;
		right_side.open = false;
		right_side.interact = interactf;
		toIntersect.push(right_side);
		var right_hook = new THREE.Object3D();
		right_hook.add(right_side)
		right_hook.position.set(2 * width - 0.05, 0, height);
		right_hook.rotation.x = Math.PI;
		wnd.add(right_hook);
	}

	var windowsill_G = new THREE.BoxGeometry((doubleSide) ? width * 2 : width, thickness * 2, 0.05);
	var windowsill = mkMesh(windowsill_G, windowsill_wood_material, castShadow, receiveShadow);
	windowsill.position.x = (doubleSide) ? width : width / 2;
	windowsill.position.y = - (thickness+0.05) * opening;
	windowsill.position.z = -0.02;
	wnd.add(windowsill);

	return wnd;
}

if (!disableWindows) {
	var window_bedroom1 = mkWindow(1.8, 1.5, 0.2, 3, 3, true, true, true, -1);
	window_bedroom1.position.set(2.9, 0.1, 1);
	apartment.add(window_bedroom1)

	var window_livingroom = mkWindow(2.8, 1.5, 0.2, 3, 3, true, true, true, -1);
	window_livingroom.position.set(12.1, 0.1, 1);
	apartment.add(window_livingroom)

	var window_entry = mkWindow(1.8, 1.5, 0.2, 3, 3, true, true, true, -1);
	window_entry.position.set(18.7, 0.1, 1);
	apartment.add(window_entry)

	var window_kitchen = mkWindow(2.01, 1.5, 0.2, 3, 4, true, true, true, 1);
	window_kitchen.position.set(12.05, 18.9, 1);
	apartment.add(window_kitchen)

	var window_bathroom = mkWindow(1.11, 1.5, 0.2, 3, 3, true, true, false, 1);
	window_bathroom.position.set(8.27, 18.9, 1);
	apartment.add(window_bathroom)

	var window_bedroom2 = mkWindow(1.8, 1.5, 0.2, 3, 3, true, true, true, 1);
	window_bedroom2.rotation.z = Math.PI / 2;
	window_bedroom2.position.set(0.1, 10.6, 1);
	apartment.add(window_bedroom2)
}