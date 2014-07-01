/* ANIMATIONS */

// DOORS

var doorHandleOpenTween;
var doorOpenTween;
var doorCloseTween;

function importDoorAnimations(door, opening) {
	doorHandleOpenTween = new TWEEN.Tween(door.children[2].rotation)
		.to({
			y: 0.5,
		}, 500)
		.easing(TWEEN.Easing.Cubic.Out)
		.repeat(1)
		.yoyo(true);
	doorOpenTween = new TWEEN.Tween(door.parent.rotation)
		.to({
			z: opening * Math.PI / 2,
		}, 1000)
		.easing(TWEEN.Easing.Cubic.Out)
		.delay(200);
	doorCloseTween = new TWEEN.Tween(door.parent.rotation)
		.to({
			z: 0,
		}, 1000)
		.easing(TWEEN.Easing.Cubic.Out);
}

// WINDOWS

var windowOpenTween;
var windowCloseTween;

function importWindowAnimations(wnd, opening) {
	windowOpenTween = new TWEEN.Tween(wnd.parent.rotation)
		.to({
			z: opening * Math.PI / 2,
		}, 1000)
		.easing(TWEEN.Easing.Cubic.Out);
	windowCloseTween = new TWEEN.Tween(wnd.parent.rotation)
		.to({
			z: 0,
		}, 1000)
		.easing(TWEEN.Easing.Cubic.Out);
}

// LIGHTS

var lampLight1OffTween;
var lampLight2OffTween;
var lampLight1OnTween;
var lampLight2OnTween;

function importLightAnimations(lamp) {
	lampLight1OffTween = new TWEEN.Tween(lamp.children[0].children[2])
		.to({
			intensity: 0
		}, 300);
	lampLight2OffTween = new TWEEN.Tween(lamp.children[0].children[3])
		.to({
			intensity: 0
		}, 300);
	lampLight1OnTween = new TWEEN.Tween(lamp.children[0].children[2])
		.to({
			intensity: 2
		}, 1000)
		.easing(TWEEN.Easing.Bounce.In);
	lampLight2OnTween = new TWEEN.Tween(lamp.children[0].children[3])
		.to({
			intensity: 5
		}, 1000)
		.easing(TWEEN.Easing.Bounce.In);
}

// TOILET

var toiletUpTween;
var toiletDownTween;

function importToiletAnimations(toilet) {
	toiletUpTween = new TWEEN.Tween(toilet.parent.rotation)
		.to({
			x: -1.6
		}, 700)
		.easing(TWEEN.Easing.Quadratic.Out);
	toiletDownTween = new TWEEN.Tween(toilet.parent.rotation)
		.to({
			x: 0
		}, 700)
		.easing(TWEEN.Easing.Bounce.Out);
}


// BATHTUB WATER-DUCKY

var rollDuckyTween;
var fillBathtubTween;
var moveUpDuckyTween;
var emptyBathtubTween;
var moveDownDuckyTween;

function importWaterDuckyAnimations() {
	rollDuckyTween = new TWEEN.Tween(ducky_bathroom.rotation)
		.to({
			x: 0.2
		}, 1000)
		.easing(TWEEN.Easing.Quadratic.Out)
		.repeat(Infinity)
		.yoyo(true);
	fillBathtubTween = new TWEEN.Tween(bathtub_water.position)
		.to({
			z: 0.7
		}, 6000);
	moveUpDuckyTween = new TWEEN.Tween(ducky_bathroom.position)
		.to({
			z: 0.75
		}, 4500)
		.delay(1500)
		.onStart(function() {
			rollDuckyTween.start();
		});
	emptyBathtubTween = new TWEEN.Tween(bathtub_water.position)
		.to({
			z: 0.1
		}, 6000)
		.delay(1000);
	moveDownDuckyTween = new TWEEN.Tween(ducky_bathroom.position)
		.to({
			z: 0.32
		}, 4500)
		.delay(1000)
		.onComplete(function() {
			rollDuckyTween.stop();
			ducky_bathroom.rotation.x = -0.2;
		});
}

// PC - GLASSES

var openPCTween;
var closePCTween;

function importPCAnimations(pc) {
	openPCTween = new TWEEN.Tween(pc.parent.rotation)
		.to({
			x: -2
		}, 1000)
		.easing(TWEEN.Easing.Cubic.Out);
	closePCTween = new TWEEN.Tween(pc.parent.rotation)
		.to({
			x: 0
		}, 1000)
		.easing(TWEEN.Easing.Cubic.Out);
}

var glassesOnTween;
var glassesOffTween;

function importGlassesAnimations(position) {
	glassesOnTween = new TWEEN.Tween(glasses.position)
		.to({
			x: position.x,
			y: position.y,
			z: position.z
		}, 500)
		.easing(TWEEN.Easing.Quintic.In)
		.onComplete(function() {
			scene.remove(glasses);
			glasses.rotation.y = Math.PI;
			glasses.position.set(0.36, -0.045, 0.17);
			glasses.scale.set(0.031,0.031,0.02);
			camera.add(glasses);
			pc_bedroom.children[0].children[1].add(masterchief);
			pcScreen.material = pcScreen_noms_material;
			glasses.areOn = true;
		});

	glassesOffTween = new TWEEN.Tween(glasses.position)
		.to({
			x: 5.6 - 9.5,
			y: 1.04,
			z: -12.6 + 11
		}, 500)
		.easing(TWEEN.Easing.Quintic.Out)
		.onStart(function() {
			camera.remove(glasses);
			glasses.rotation.y = 0;
			glasses.scale.set(0.02, 0.02, 0.02);
			scene.add(glasses);
			pc_bedroom.children[0].children[1].remove(masterchief);
			pcScreen.material = pcScreen_material;
			glasses.areOn = false;
		});
}

// PICTURES

var pictureTween;

function importPictureAnimations(picture) {
	pictureTween = new TWEEN.Tween(picture.rotation)
		.to({
			z: (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
		}, 500)
		.easing(TWEEN.Easing.Bounce.Out);
}


// RAIN-FOG

var enableRainTween1;
var enableRainTween2;
var enableRainTween3;
var disableRainTween1;
var disableRainTween2;
var disableRainTween3;


function importRainFogAnimations() {
	enableRainTween3 = new TWEEN.Tween(grass.material.color)
		.to({
			r: 0.5,
			g: 0.5,
			b: 0.5
		}, 1000);
	enableRainTween2 = new TWEEN.Tween(scene.fog)
		.to({
			far: 60
		}, 1000)
		.onComplete(function() {
			rain_sound.play();
			fantozziCloudRain.toUpdate = true;
			apartment.add(fantozziCloudRain);
		});
	enableRainTween1 = new TWEEN.Tween(scene.fog)
		.to({
			near: 20
		}, 1000)
		.chain(enableRainTween2, enableRainTween3);
	disableRainTween3 = new TWEEN.Tween(grass.material.color)
		.to({
			r: 1.0,
			g: 1.0,
			b: 1.0
		}, 1000);
	disableRainTween2 = new TWEEN.Tween(scene.fog)
		.to({
			near: 500
		}, 1000);
	disableRainTween1 = new TWEEN.Tween(scene.fog)
		.to({
			far: 500
		}, 1000)
		.chain(disableRainTween2, disableRainTween3)
		.onStart(function() {
			rain_sound.pause();
			apartment.remove(fantozziCloudRain);
			fantozziCloudRain.toUpdate = false;
		});
}

// TIME OF DAY

function dayNightAnimations(action, animationSpeed) {

	// to day
	var toDaySpeed = 2000 / animationSpeed;
	var hemiToDayTween1 = new TWEEN.Tween(hemiLight)
		.to({
			intensity: 0.5
		}, toDaySpeed * 3 / 4);
	var hemiToDayTween2 = new TWEEN.Tween(hemiLight.color)
		.to({
			r: 0.78,
			g: 0.95,
			b: 0.93
		}, toDaySpeed * 3 / 4);
	var dirToDayTween1 = new TWEEN.Tween(dirLight)
		.to({
			intensity: 0.8
		}, toDaySpeed * 3 / 4);
	var dirToDayTween2 = new TWEEN.Tween(dirLight.position)
		.to({
			x: -20,
			y: 100,
			z: 30
			// x: [-100, -20],
			// y: [90, 100],
			// z: [30, 30]
		}, toDaySpeed);
	// .interpolation(TWEEN.Interpolation.Bezier)
	var skyboxToDayTween = new TWEEN.Tween(skybox.color)
		.to({
			r: 1.0,
			g: 1.0,
			b: 1.0
		}, toDaySpeed * 3 / 4);
	var starsToDayTween = new TWEEN.Tween(stars.material)
		.to({
			opacity: 0
		}, toDaySpeed / 4)
		.onComplete(function() {
			scene.remove(stars);
		});

	// to sunset
	var toSunsetSpeed = 2000 / animationSpeed;
	var hemiToSunsetTween1 = new TWEEN.Tween(hemiLight)
		.to({
			intensity: 0.5
		}, toSunsetSpeed / 4)
		.delay(toSunsetSpeed * 3 / 4);
	var hemiToSunsetTween2 = new TWEEN.Tween(hemiLight.color)
		.to({
			r: 0.9,
			g: 0.43,
			b: 0.18
		}, toSunsetSpeed / 4)
		.delay(toSunsetSpeed * 3 / 4);
	var dirToSunsetTween1 = new TWEEN.Tween(dirLight)
		.to({
			intensity: 0.8
		}, toSunsetSpeed / 4)
		.delay(toSunsetSpeed * 3 / 4);
	var dirToSunsetTween2 = new TWEEN.Tween(dirLight.position)
		.to({
			x: 100,
			y: 10,
			z: 30
			// x: [100, 100],
			// y: [100, 10],
			// z: [30, 30]
		}, toSunsetSpeed);
	// .interpolation(TWEEN.Interpolation.Bezier)
	var skyboxToSunsetTween = new TWEEN.Tween(skybox.color)
		.to({
			r: 0.9,
			g: 0.59,
			b: 0.43
		}, toSunsetSpeed / 4)
		.delay(toSunsetSpeed * 3 / 4);
	var starsToSunsetTween = new TWEEN.Tween(stars.material)
		.to({
			opacity: 0
		}, toSunsetSpeed / 4)
		.onComplete(function() {
			scene.remove(stars);
		});

	// to night
	var toNightSpeed = 2000 / animationSpeed;
	var hemiToNightTween1 = new TWEEN.Tween(hemiLight)
		.to({
			intensity: 0.1
		}, toNightSpeed / 2);
	var hemiToNightTween2 = new TWEEN.Tween(hemiLight.color)
		.to({
			r: 0.09,
			g: 0.1,
			b: 0.16
		}, toNightSpeed / 2);
	var dirToNightTween1 = new TWEEN.Tween(dirLight)
		.to({
			intensity: 0.0
		}, toNightSpeed / 2);
	var dirToNightTween2 = new TWEEN.Tween(dirLight.position)
		.to({
			x: -20,
			y: -100,
			z: 30
			// x: [100, -20],
			// y: [-100, -100],
			// z: [30, 30]
		}, toNightSpeed);
	// .interpolation(TWEEN.Interpolation.Bezier)
	var skyboxToNightTween = new TWEEN.Tween(skybox.color)
		.to({
			r: 0.06,
			g: 0.06,
			b: 0.12
		}, toNightSpeed / 2);
	var starsToNightTween = new TWEEN.Tween(stars.material)
		.to({
			opacity: 0.9
		}, toNightSpeed / 4)
		.delay(toNightSpeed / 4)
		.onStart(function() {
			scene.add(stars);
		});

	// to sunrise
	var toSunriseSpeed = 2000 / animationSpeed;
	var hemiToSunriseTween1 = new TWEEN.Tween(hemiLight)
		.to({
			intensity: 0.5
		}, toSunriseSpeed / 2)
		.delay(toSunriseSpeed / 2);
	var hemiToSunriseTween2 = new TWEEN.Tween(hemiLight.color)
		.to({
			r: 0.79,
			g: 0.38,
			b: 0.09
		}, toSunriseSpeed)
		.delay(toSunriseSpeed / 2);
	var dirToSunriseTween1 = new TWEEN.Tween(dirLight)
		.to({
			intensity: 0.8
		}, toSunriseSpeed / 2)
		.delay(toSunriseSpeed / 2);
	var dirToSunriseTween2 = new TWEEN.Tween(dirLight.position)
		.to({
			x: -100,
			y: 10,
			z: 30
			// x: [-100, -100],
			// y: [-90, 10],
			// z: [30, 30]
		}, toSunriseSpeed)
		// .interpolation(TWEEN.Interpolation.Bezier)
	var skyboxToSunriseTween = new TWEEN.Tween(skybox.color)
		.to({
			r: 0.63,
			g: 0.35,
			b: 0.25
		}, toSunriseSpeed / 2)
		.delay(toSunriseSpeed / 2);
	var starsToSunriseTween = new TWEEN.Tween(stars.material)
		.to({
			opacity: 0
		}, toSunriseSpeed / 4)
		.delay(toSunriseSpeed / 2)
		.onComplete(function() {
			scene.remove(stars);
		});

	// tween chain

	dirToDayTween2.chain(hemiToSunsetTween1, hemiToSunsetTween2, dirToSunsetTween1, dirToSunsetTween2, skyboxToSunsetTween, starsToSunsetTween);
	dirToSunsetTween2.chain(hemiToNightTween1, hemiToNightTween2, dirToNightTween1, dirToNightTween2, skyboxToNightTween, starsToNightTween);
	dirToNightTween2.chain(hemiToSunriseTween1, hemiToSunriseTween2, dirToSunriseTween1, dirToSunriseTween2, skyboxToSunriseTween, starsToSunriseTween);
	dirToSunriseTween2.chain(hemiToDayTween1, hemiToDayTween2, dirToDayTween1, dirToDayTween2, skyboxToDayTween, starsToDayTween);

	// actions

	switch (action) {
		case 'day':
			hemiToDayTween1.start();
			hemiToDayTween2.start();
			dirToDayTween1.start();
			dirToDayTween2.chain().start();
			skyboxToDayTween.start();
			starsToDayTween.start();
			break;
		case 'sunset':
			hemiToSunsetTween1.start();
			hemiToSunsetTween2.start();
			dirToSunsetTween1.start();
			dirToSunsetTween2.chain().start();
			skyboxToSunsetTween.start();
			starsToSunsetTween.start();
			break;
		case 'night':
			hemiToNightTween1.start();
			hemiToNightTween2.start();
			dirToNightTween1.start();
			dirToNightTween2.chain().start();
			skyboxToNightTween.start();
			starsToNightTween.start();
			break;
		case 'sunrise':
			hemiToSunriseTween1.start();
			hemiToSunriseTween2.start();
			dirToSunriseTween1.start();
			dirToSunriseTween2.chain().start();
			skyboxToSunriseTween.start();
			starsToSunriseTween.start();
			break;
		case 'animate':
			hemiToSunsetTween1.start();
			hemiToSunsetTween2.start();
			dirToSunsetTween1.start();
			dirToSunsetTween2.start();
			skyboxToSunsetTween.start();
			starsToSunsetTween.start();
			break;
	}

}