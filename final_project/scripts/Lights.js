/* LIGHTS */

// hemisphere light
hemiLight = new THREE.HemisphereLight('#C6F1ED', '#ffffff', 0.5); //ECDDAE
hemiLight.position.set(0, 500, 0);
scene.add(hemiLight);

// directional light
dirLight = new THREE.DirectionalLight('#FFFFFF', 0.8);
dirLight.position.set(-20, 100, 30);
scene.add(dirLight);

// PHYSICAL TOP LIGHTS

var lights = [];

function mkLamp() {
	var lamp = new THREE.Object3D();
	lamp.scale.set(0.2, 0.1, 0.2);
	lamp.rotation.x = -Math.PI / 2;
	// lampshade
	var lampshade_G = new THREE.SphereGeometry(2, 16, 16, 0, 2 * Math.PI, 0, Math.PI / 2);
	var lampshade_ext = mkMesh(lampshade_G, lamp_material, true, true);
	var lampshade_int = mkMesh(lampshade_G.clone(), lampshade_internal_material, true, true);
	lampshade_int.scale.set(0.95, 0.95, 0.95);
	var lampshade = new THREE.Object3D();
	lampshade.add(lampshade_ext);
	lampshade.add(lampshade_int);
	lampshade.rotation.x = Math.PI;
	lamp.add(lampshade);
	// lampshade closure
	var ls_closure_G = new THREE.TorusGeometry(2, 0.1, 16, 16);
	var ls_closure = mkMesh(ls_closure_G, lamp_material, true, true);
	ls_closure.rotation.x = Math.PI / 2;
	lamp.add(ls_closure);
	// bulb
	var bulb_G = new THREE.SphereGeometry(0.7, 16, 16);
	var bulb = mkMesh(bulb_G, lamp_bulb_material);
	bulb.position.y = -1;
	lamp.add(bulb);
	// glass
	var glass_G = new THREE.CylinderGeometry(2, 1.9, 0.2, 10, 10);
	var glass = mkMesh(glass_G, lamp_glass_material);
	glass.position.y = -0.05;
	lamp.add(glass);
	if (!disableLights) {
		// lamp light 1
		var lampLight1 = new THREE.SpotLight('#E1F8F8');
		lampLight1.target = glass;
		lampLight1.angle = Math.PI / 2;
		lampLight1.exponent = 1;
		lampLight1.intensity = 0;
		lampLight1.distance = 10;
		// lampLight1.castShadow = true;
		// lampLight1.shadowDarkness = 0.7;
		// lampLight1.shadowCameraNear = 0.5;
		// lampLight1.shadowCameraFar = 5;
		// lampLight1.shadowCameraFov = 80;
		// lampLight1.shadowMapHeight = 256;
		// lampLight1.shadowMapWidth = 256;
		lampshade.add(lampLight1);
		// lamp light 2
		var lampLight2 = new THREE.PointLight('#E1F8F8');
		lampLight2.position = bulb.position;
		lampLight2.position.y += 0.1;
		lampLight2.distance = 0.4;
		lampLight2.intensity = 0;
		lampshade.add(lampLight2);
	}
	// interaction
	lamp.isOn = false;
	lamp.interact = function() {
		importLightAnimations(this);
		if (this.isOn) {
			lampLight1OffTween.start();
			lampLight2OffTween.start();
			this.isOn = false;
		} else {
			lampLight1OnTween.start();
			lampLight2OnTween.start();
			this.isOn = true;
		}
	}
	lights.push(lamp);
	return lamp;
}

if (!disableLights) {
	var lamp_livingroom = mkLamp();
	lamp_livingroom.position.set(12, 4.5, 3.2);
	apartment.add(lamp_livingroom);

	var lamp_bedroom1 = mkLamp();
	lamp_bedroom1.position.set(3.5, 5, 3.2);
	apartment.add(lamp_bedroom1);

	var lamp_bedroom2 = mkLamp();
	lamp_bedroom2.position.set(3.5, 14, 3.2);
	apartment.add(lamp_bedroom2);

	var lamp_bathroom = mkLamp();
	lamp_bathroom.position.set(8.5, 15, 3.2);
	apartment.add(lamp_bathroom);

	var lamp_kitchen = mkLamp();
	lamp_kitchen.position.set(14, 15, 3.2);
	apartment.add(lamp_kitchen);

	var lamp_hallway = mkLamp();
	lamp_hallway.position.set(12, 10, 3.2);
	apartment.add(lamp_hallway);

	var lamp1_entry = mkLamp();
	lamp1_entry.position.set(19.5, 15, 3.2);
	apartment.add(lamp1_entry);

	var lamp2_entry = mkLamp();
	lamp2_entry.position.set(19.5, 5.5, 3.2);
	apartment.add(lamp2_entry);
}


// LIGHT SWITCH

var lightSwitches = []

var loader = new THREE.OBJLoader();
loader.load(models_path + 'lightSwitch.obj', function(lightSwitch) {
	lightSwitch.traverse(function(child) {
		if (child instanceof THREE.Mesh) {
			child.material = lightSwitch_material1;
		}
	});
	lightSwitch.children[2].material = lightSwitch_material2;
	lightSwitch.children[2].scale.y = 1.6;
	lightSwitch.children[2].position.z = -0.1;
	lightSwitch.scale.set(0.05, 0.05, 0.05);
	lightSwitch.rotation.x = Math.PI / 2;
	lightSwitch.isUp = false;
	positionLightSwitch(lightSwitch);
});

function mkLightSwitch(lightSwitch) {
	var ls = lightSwitch.clone();
	ls.toggle = ls.children[2];
	ls.toggle.isUp = false;
	ls.toggle.interact = function() {
		if (this.isUp) {
			this.position.y = 0;
			if (!disableLights) {
				this.correspLight.interact();
			}
			this.isUp = false;
		} else {
			this.position.y = 0.5;
			if (!disableLights) {
				this.correspLight.interact();
			}
			this.isUp = true;
		}
	}
	toIntersect.push(ls.toggle);
	lightSwitches.push(ls.toggle);
	return ls;
}

function positionLightSwitch(lightSwitch) {
	// livingroom
	lightSwitch_livingroom = mkLightSwitch(lightSwitch);
	lightSwitch_livingroom.toggle.correspLight = lamp_livingroom;
	lightSwitch_livingroom.position.set(14, 8.4, 1.1);
	apartment.add(lightSwitch_livingroom);
	// bedroom1
	lightSwitch_bedroom1 = mkLightSwitch(lightSwitch);
	lightSwitch_bedroom1.toggle.correspLight = lamp_bedroom1;
	lightSwitch_bedroom1.rotation.y = -Math.PI / 2;
	lightSwitch_bedroom1.position.set(6.4, 6, 1.1);
	apartment.add(lightSwitch_bedroom1);
	// bedroom2
	lightSwitch_bedroom2 = mkLightSwitch(lightSwitch);
	lightSwitch_bedroom2.toggle.correspLight = lamp_bedroom2;
	lightSwitch_bedroom2.rotation.y = -Math.PI / 2;
	lightSwitch_bedroom2.position.set(6.4, 11, 1.1);
	apartment.add(lightSwitch_bedroom2);
	// bathroom
	lightSwitch_bathroom = mkLightSwitch(lightSwitch);
	lightSwitch_bathroom.toggle.correspLight = lamp_bathroom;
	lightSwitch_bathroom.rotation.y = Math.PI;
	lightSwitch_bathroom.position.set(8.7, 11.8, 1.1);
	apartment.add(lightSwitch_bathroom);
	// kitchen
	lightSwitch_kitchen = mkLightSwitch(lightSwitch);
	lightSwitch_kitchen.toggle.correspLight = lamp_kitchen;
	lightSwitch_kitchen.rotation.y = Math.PI;
	lightSwitch_kitchen.position.set(12.7, 11.8, 1.1);
	apartment.add(lightSwitch_kitchen);
	// hallway
	lightSwitch_hallway = mkLightSwitch(lightSwitch);
	lightSwitch_hallway.toggle.correspLight = lamp_hallway;
	lightSwitch_hallway.position.set(16, 11.6, 1.1);
	apartment.add(lightSwitch_hallway);
	// entry
	lightSwitch1_entry = mkLightSwitch(lightSwitch);
	lightSwitch1_entry.toggle.correspLight = lamp1_entry;
	lightSwitch1_entry.rotation.y = -Math.PI / 2;
	lightSwitch1_entry.position.set(21.6, 16, 1.1);
	apartment.add(lightSwitch1_entry);
	lightSwitch2_entry = mkLightSwitch(lightSwitch);
	lightSwitch2_entry.toggle.correspLight = lamp2_entry;
	lightSwitch2_entry.rotation.y = -Math.PI / 2;
	lightSwitch2_entry.position.set(21.6, 7, 1.1);
	apartment.add(lightSwitch2_entry);
}

var toggleAllLights = function() {
    for (var i = 0; i < lightSwitches.length; i++) {
        lightSwitches[i].interact();
    }
}

// PHYSICAL TV LIGHT

if (!disableForniture) {
	var tvLight = new THREE.SpotLight('#7CC1B5');
	tvLight.angle = Math.PI / 2.1;
	tvLight.exponent = 3;
	tvLight.intensity = 0;
	tvLight.distance = 6;
	tvScreen.add(tvLight);
}