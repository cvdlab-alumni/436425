/* FORNITURE */

function importObjMtl(obj, mtl, doubleSide, transformObject) {
	var container = new THREE.Object3D();
	var loader = new THREE.OBJMTLLoader();
	loader.addEventListener('load', function(event) {
		var object = event.content;
		if (doubleSide) {
			object.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					child.material.side = THREE.DoubleSide;
				}
			});
		}
		if (transformObject) {
			transformObject(object);
		}
		container.add(object);
	});
	loader.load(models_path + obj, models_path + mtl);
	return container;
}

function mkPicture(width, height, image) {
	var container = new THREE.Object3D();
	var texture = THREE.ImageUtils.loadTexture(textures_path + image);
	var picture = mkMesh(new THREE.PlaneGeometry(width, height, 1, 1), picture_material.clone(), true, true);
	picture.rotation.x = Math.PI / 2;
	picture.material.map = texture;
	// interaction
	toIntersect.push(picture);
	picture.interact = function() {
		importPictureAnimations(this);
		pictureTween.start();
	}
	container.add(picture);
	return container;
}


if (!disableForniture) {

	// PICTURES

	var picture1 = mkPicture(0.8, 0.8, 'picture1_diff.jpg');
	picture1.position.set(5, 18.58, 1.7);
	apartment.add(picture1);

	var picture2 = mkPicture(0.8, 0.8, 'picture2_diff.jpg');
	picture2.position.set(3, 18.58, 1.7);
	apartment.add(picture2);

	var picture3 = mkPicture(0.8, 0.8, 'picture3_diff.jpg');
	picture3.position.set(6.38, 16.5, 1.7);
	picture3.rotation.z = -Math.PI / 2;
	apartment.add(picture3);

	var picture4 = mkPicture(0.8, 0.8, 'picture4_diff.jpg');
	picture4.position.set(17.38, 6, 1.7);
	picture4.rotation.z = -Math.PI / 2;
	apartment.add(picture4);

	var picture5 = mkPicture(0.8, 0.8, 'picture5_diff.jpg');
	picture5.position.set(6.62, 3, 1.7);
	picture5.rotation.z = Math.PI / 2;
	apartment.add(picture5);


	// ENTRY

	var ext_door = mkDoor(1.8, 2.5, 0.15, true, true, 1);
	ext_door.children[0].children[0].material = ext_door_material;
	ext_door.position.set(20.4, 18.8, 0);
	ext_door.children[0].children[0].children[2] = new THREE.Object3D();
	var ext_door_handle = new THREE.Object3D();
	ext_door_handle.position.set(-1.6, 0, 1.1);
	ext_door.children[0].add(ext_door_handle);
	var ext_door_handle_p1 = mkMesh(new THREE.SphereGeometry(0.08, 12, 12), ext_door_handle_material, true, true);
	ext_door_handle_p1.position.y = 0.17;
	ext_door_handle.add(ext_door_handle_p1);
	var ext_door_handle_p2 = ext_door_handle_p1.clone();
	ext_door_handle_p2.position.y = -0.17;
	ext_door_handle.add(ext_door_handle_p2);
	var ext_door_handle_p3 = mkMesh(new THREE.CylinderGeometry(0.03, 0.03, 0.2), ext_door_handle_material, true, true);
	ext_door_handle.add(ext_door_handle_p3);
	apartment.add(ext_door);


	// LIVINGROOM

	// sofa
	var sofa_livingroom = importObjMtl('livingroom_sofa.obj', 'livingroom_sofa.mtl');
	sofa_livingroom.scale.set(0.016, 0.016, 0.016);
	sofa_livingroom.rotation.x = Math.PI / 2;
	sofa_livingroom.position.set(9.6, 5, 0.55);
	apartment.add(sofa_livingroom);

	// tv shelf

	var tvShelf_livingroom = importObjMtl('livingroom_tv_shelf.obj', 'livingroom_tv_shelf.mtl');
	tvShelf_livingroom.scale.set(0.02, 0.02, 0.02);
	tvShelf_livingroom.rotation.x = Math.PI / 2;
	tvShelf_livingroom.position.set(9.5, 0.9, 0.65);
	apartment.add(tvShelf_livingroom);

	// speakers

	var speaker1_livingroom = importObjMtl('livingroom_speaker.obj', 'livingroom_speaker.mtl');
	speaker1_livingroom.scale.set(0.02, 0.02, 0.02);
	speaker1_livingroom.rotation.x = Math.PI / 2;
	speaker1_livingroom.rotation.y = Math.PI;
	speaker1_livingroom.position.set(8, 0.9, 0.0);
	apartment.add(speaker1_livingroom);
	var speaker2_livingroom = importObjMtl('livingroom_speaker.obj', 'livingroom_speaker.mtl');
	speaker2_livingroom.scale.set(0.02, 0.02, 0.02);
	speaker2_livingroom.rotation.x = Math.PI / 2;
	speaker2_livingroom.rotation.y = Math.PI;
	speaker2_livingroom.position.set(11, 0.9, 0.0);
	apartment.add(speaker2_livingroom);

	// tv 

	var tv_livingroom = importObjMtl('livingroom_tv.obj', 'livingroom_tv.mtl', true);
	tv_livingroom.scale.set(0.22, 0.2, 0.22);
	tv_livingroom.rotation.set(Math.PI / 2, Math.PI, 0);
	tv_livingroom.position.set(9.5, 0.9, 0.7);
	apartment.add(tv_livingroom);

	var tvScreen_G = new THREE.PlaneGeometry(1.5, 0.9);
	var tvScreen = new THREE.Mesh(tvScreen_G, video_material);
	tvScreen.position.set(9.5, 1, 1.48);
	tvScreen.rotation.set(Math.PI / 2, Math.PI, 0);
	tvScreen.visible = false;
	tvScreen.isOn = false;
	tvScreen.interact = function() {
		if (this.isOn) {
			video.pause();
			tvScreen.visible = false;
			tvScreen.children[0].intensity = 0;
			this.isOn = false;
		} else {
			tvScreen.visible = true;
			video.play();
			tvScreen.children[0].intensity = 4;
			this.isOn = true;
		}
	}
	toIntersect.push(tvScreen);
	apartment.add(tvScreen);

	// table

	var table_livingroom = importObjMtl('livingroom_table.obj', 'livingroom_table.mtl');
	table_livingroom.scale.set(0.02, 0.02, 0.02);
	table_livingroom.rotation.x = Math.PI / 2;
	table_livingroom.rotation.y = Math.PI / 2;
	table_livingroom.position.set(15.5, 3, 0)
	apartment.add(table_livingroom);

	// radio

	var radio_livingroom = importObjMtl('livingroom_radio.obj', 'livingroom_radio.mtl', true, function(object) {
		object.children[2].remove(object.children[2].children[0]);
		var control = object.children[10].children[1];
		control.isOn = false;
		toIntersect.push(control);
		control.interact = function() {
			if (this.isOn) {
				radio_sound.pause();
				this.isOn = false;
			} else {
				radio_sound.play();
				this.isOn = true;
			}
		}

	});
	radio_livingroom.scale.set(0.02, 0.02, 0.02);
	radio_livingroom.rotation.x = Math.PI / 2;
	radio_livingroom.rotation.y = -2.3;
	radio_livingroom.position.set(15.5, 2.6, 1)
	radio_sound.position.set(5.78, 1.04, 8.61);
	apartment.add(radio_livingroom);


	// BATHROOM

	// sink and cabinet

	var sink_mirror_cabinet_bathroom = new THREE.Object3D();
	var sink_bathroom = importObjMtl('bathroom_sink.obj', 'bathroom_sink.mtl');
	sink_mirror_cabinet_bathroom.add(sink_bathroom);
	var mirror_cabinet_bathroom = importObjMtl('bathroom_mirror_cabinet.obj', 'bathroom_mirror_cabinet.mtl');
	mirror_cabinet_bathroom.position.y = -24;
	sink_mirror_cabinet_bathroom.add(mirror_cabinet_bathroom);
	sink_mirror_cabinet_bathroom.scale.set(0.015, 0.015, 0.015);
	sink_mirror_cabinet_bathroom.rotation.set(Math.PI / 2, -Math.PI / 2, 0);
	sink_mirror_cabinet_bathroom.position.set(9.55, 17, -0.1);
	apartment.add(sink_mirror_cabinet_bathroom);
	// mirror
	var mirror_bathroom = mkMesh(new THREE.PlaneGeometry(1.05, 0.9, 10, 10), mirror_material, true, false);
	mirror_bathroom.rotation.y = -Math.PI / 2;
	mirror_bathroom.position.set(10.147, 14, 1.75);
	apartment.add(mirror_bathroom);

	// shower

	var shower_bathroom = importObjMtl('bathroom_shower.obj', 'bathroom_shower.mtl');
	shower_bathroom.scale.set(0.015, 0.015, 0.015);
	shower_bathroom.rotation.x = Math.PI / 2;
	shower_bathroom.rotation.y = Math.PI;
	shower_bathroom.position.set(12.6, 18.6, 0);
	apartment.add(shower_bathroom);
	var shower_head_bathroom = importObjMtl('bathroom_shower_head.obj', 'bathroom_shower_head.mtl', true);
	shower_head_bathroom.scale.set(0.015, 0.015, 0.015);
	shower_head_bathroom.rotation.x = Math.PI / 2;
	shower_head_bathroom.rotation.y = Math.PI / 2;
	shower_head_bathroom.position.set(6.6, 18, 0);
	apartment.add(shower_head_bathroom);

	// toilet

	var toilet_bathroom = importObjMtl('bathroom_toilet.obj', 'bathroom_toilet.mtl', false, function(object) {
		var hook = new THREE.Object3D();
		var cover = object.children[0];
		hook.position.set(0,38,-19);
		cover.position.set(0,-38,19);
		object.remove(cover);
		object.add(hook);
		hook.add(cover);
		toIntersect.push(cover);
		cover.isUp = false;
		cover.interact = function() {
			importToiletAnimations(this);
			if (this.isUp) {
				toiletDownTween.start();
				this.isUp = false;
			} else {
				toiletUpTween.start();
				this.isUp = true;
			}
		}
	});
	toilet_bathroom.scale.set(0.015, 0.015, 0.015);
	toilet_bathroom.rotation.x = Math.PI / 2;
	toilet_bathroom.rotation.y = -Math.PI / 2;
	toilet_bathroom.position.set(9.75, 18, 0);
	apartment.add(toilet_bathroom);

	// bidet

	var bidet_bathroom = importObjMtl('bathroom_bidet.obj', 'bathroom_bidet.mtl');
	bidet_bathroom.scale.set(0.015, 0.015, 0.015);
	bidet_bathroom.rotation.x = Math.PI / 2;
	bidet_bathroom.rotation.y = -Math.PI / 2;
	bidet_bathroom.position.set(9.75, 16, 0);
	apartment.add(bidet_bathroom);

	// bathtub

	// ducky
	var ducky_bathroom = importObjMtl('ducky.obj', 'ducky.mtl');
	ducky_bathroom.scale.set(0.06, 0.06, 0.06);
	ducky_bathroom.position.set(7, 15.5, 0.32);
	ducky_bathroom.rotation.x = -0.2
	apartment.add(ducky_bathroom);
	// water
	var bathtub_water = mkMesh(new THREE.PlaneGeometry(1, 2.45), water_material, false, false);
	bathtub_water.position.set(7.1, 16.1, 0.1);
	apartment.add(bathtub_water);
	// bathtub
	importWaterDuckyAnimations();
	var bathtub_bathroom = importObjMtl('bathroom_bathtub.obj', 'bathroom_bathtub.mtl', false, function(object) {
		var faucet = object.children[12].children[0];
		faucet.isOpen = false;
		toIntersect.push(faucet);
		faucet.interact = function() {
			if (this.isOpen) {
				apartment.remove(tapWater);
				tapWater.toUpdate = false;
				bathroom_faucet_sound.pause();
				emptyBathtubTween.start();
				moveDownDuckyTween.start();
				this.isOpen = false;
			} else {
				tapWater.toUpdate = true;
				apartment.add(tapWater);
				bathroom_faucet_sound.play();
				fillBathtubTween.start();
				moveUpDuckyTween.start();
				this.isOpen = true;
			}
		}
	});
	bathroom_faucet_sound.position.set(-2.6, 1.8, -2.89);
	bathtub_bathroom.scale.set(0.015, 0.015, 0.015);
	bathtub_bathroom.rotation.x = Math.PI / 2;
	bathtub_bathroom.rotation.y = -Math.PI / 2;
	bathtub_bathroom.position.set(7.65, 16.2, 0);
	apartment.add(bathtub_bathroom);

	// radiator

	var radiator_bathroom = importObjMtl('bathroom_radiator.obj', 'bathroom_radiator.mtl');
	radiator_bathroom.scale.set(0.02, 0.025, 0.02);
	radiator_bathroom.rotation.x = Math.PI / 2;
	radiator_bathroom.rotation.y = -Math.PI / 2;
	radiator_bathroom.position.set(9.7, 14, -3);
	apartment.add(radiator_bathroom);


	// BEDROOM

	// BED

	var bed_bedroom = importObjMtl('bedroom_bed.obj', 'bedroom_bed.mtl');
	bed_bedroom.scale.set(0.01, 0.01, 0.01);
	bed_bedroom.rotation.x = Math.PI / 2;
	bed_bedroom.position.set(4, 17.1, 0);
	apartment.add(bed_bedroom);

	// PC - TABLE - MASTERCHIEF - GLASSES

	// pc desk
	var pcDesk_bedroom = importObjMtl('bedroom_pcdesk.obj', 'bedroom_pcdesk.mtl');
	pcDesk_bedroom.scale.set(0.015, 0.015, 0.015);
	pcDesk_bedroom.rotation.x = Math.PI / 2;
	pcDesk_bedroom.rotation.y = -Math.PI / 2;
	pcDesk_bedroom.position.set(5.8, 13, 0.5);
	apartment.add(pcDesk_bedroom);
	// pc screen interaction
	var pcScreen = mkMesh(new THREE.PlaneGeometry(6.5, 4, 1, 1), pcScreen_material, false, false);
	pcScreen.rotation.x = Math.PI / 2;
	pcScreen.position.set(2.6, -0.001, 2.5);
	pcScreen.isOpen = false;
	toIntersect.push(pcScreen);
	pcScreen.interact = function() {
		importPCAnimations(this);
		if (this.isOpen) {
			closePCTween.start();
			this.isOpen = false;
		} else {
			openPCTween.start();
			this.isOpen = true;
		}
	}
	// masterchief
	var masterchief = importObjMtl('masterchief.obj', 'masterchief.mtl', false, function(object) {
		object.remove(object.children[185]);
	});
	masterchief.scale.set(4.55, 4.55, 4.55);
	masterchief.position.set(2.45, -0.45, 0.9);
	// pc
	var pc_bedroom = importObjMtl('bedroom_laptop.obj', 'bedroom_laptop.mtl', true, function(object) {
		object.remove(object.children[4]);
		object.remove(object.children[3]);
		object.remove(object.children[2]);
		var hook = new THREE.Object3D();
		object.children[1].position.set(0, -0.32, 1.2);
		hook.position.set(0, 0.32, -1.2);
		hook.add(object.children[1]);
		object.remove(object.children[1]);
		hook.add(pcScreen);
		object.add(hook);
	});
	pc_bedroom.scale.set(0.1, 0.1, 0.1);
	pc_bedroom.rotation.x = Math.PI / 2;
	pc_bedroom.rotation.y = -Math.PI / 2;
	pc_bedroom.position.set(5.8, 13.6, 1.04);
	apartment.add(pc_bedroom);
	// glasses
	var glasses = importObjMtl('glasses.obj', 'glasses.mtl');
	glasses.areOn = false;
	glasses.scale.set(0.02, 0.02, 0.02);
	glasses.position.set(5.6 - 9.5, 1.04, -12.6 + 11);
	scene.add(glasses);
	// glasses-description
	var glasses_description = mkMesh(new THREE.PlaneGeometry(0.4, 0.2, 1, 1), glasses_description_material, false, false);
	glasses_description.rotation.z = -1;
	glasses_description.position.set(5.7, 12.5, 1.04);
	toIntersect.push(glasses_description);
	glasses_description.interact = function() {
		var currentPosition = (!FPenabled) ? camera.position : controls.getObject().position;
		importGlassesAnimations(currentPosition);
		if (glasses.areOn) {
			glasses.position.copy(currentPosition);
			glassesOffTween.start();
		} else {
			glassesOnTween.start();
		}
	}
	apartment.add(glasses_description);

}