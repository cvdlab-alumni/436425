/* 
NOTE: Textures not working locally on some browser, due to security warnings.
Firefox seems to load them correctly. 
*/

$(function() {

	/* CONSTANTS */

	var arm_length = 6;
	var node_dim = 1;
	var lamp_color_1 = "#46556F"
	var lamp_color_2 = "#E6E6E6"

	// materials

	THREE.ImageUtils.crossOrigin = "anonymous";

	var plane_mat = new THREE.MeshPhongMaterial({
		color: '#ffffff',
		metal: true,
		shininess: 200,
		map: THREE.ImageUtils.loadTexture('assets/textures/marble.jpg')
	});

	var lamp_mat_1 = new THREE.MeshPhongMaterial({
		color: lamp_color_1,
		shininess: 200,
		metal: true,
		map: THREE.ImageUtils.loadTexture('assets/textures/lamp.jpg')
	});

	var lamp_mat_2 = new THREE.MeshPhongMaterial({
		color: lamp_color_2,
		shininess: 200,
		metal: true
	});

	var screw_mat = new THREE.MeshPhongMaterial({
		color: lamp_color_2,
		shading: THREE.FlatShading,
		shininess: 200,
		metal: true
	});

	var lampshade_internal_mat = new THREE.MeshPhongMaterial({
		color: '#aaaaff',
		shading: THREE.FlatShading,
		side: THREE.BackSide,
		shininess: 300,
		specular: '#ffffff',
		metal: true
	});

	var bulb_mat = new THREE.MeshPhongMaterial({
		color: '#CEF6F5',
		opacity: 0.6,
		transparent: true,
		shininess: 300,
		specular: '#ffffff',
		metal: true
	});

	var glass_mat = new THREE.MeshPhongMaterial({
		color: '#ffffff',
		opacity: 0.5,
		shininess: 200,
		transparent: true,
	});

	var ball_mat = new THREE.MeshPhongMaterial({
		color: '#488E31',
		shininess: 200,
		metal: true,
		map: THREE.ImageUtils.loadTexture('assets/textures/ball.jpg')

	});

	var text_mat = new THREE.MeshPhongMaterial({
		color: '#81BEF7',
		shininess: 200,
		metal: true,
	});


	/* FUNCTIONS */

	function mkJoint(node, arm, node_height, arm_height) {
		var joint = new THREE.Object3D();
		node.position.set(0, 0, 0);
		joint.add(node);
		arm.position.set(0, arm_height / 2 + node_height / 2, 0);
		node.add(arm);
		var hook = new THREE.Object3D();
		hook.position.set(0, arm_height / 2 + node_height / 2, 0);
		arm.add(hook);
		joint.node = node;
		joint.arm = arm;
		joint.hook = hook;
		return joint;
	}

	function mkMesh(geom, mat, castShadow, receiveShadow) {
		var obj = new THREE.Mesh(geom, mat);
		obj.castShadow = castShadow;
		obj.receiveShadow = receiveShadow;
		return obj;
	}


	/* INITIALIZATIONS */

	var stats = initStats();
	var scene = new THREE.Scene();
	// camera
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(0, 90, 25);
	camera.up = new THREE.Vector3(0, 0, 1);
	camera.lookAt(scene.position);
	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color('#848484'));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	// renderer.shadowMapType = THREE.PCFSoftShadowMap;
	// trackball controls
	var trackballControls = new THREE.TrackballControls(camera);


	/* SCENE */

	// scene.fog = new THREE.FogExp2('#848484', 0.002);

	// PLANES

	var plane_G = new THREE.PlaneGeometry(200, 200, 100, 100);
	// plane_mat.side = THREE.DoubleSide;  ---> disabled due to rendering problems (???)
	var plane = mkMesh(plane_G, plane_mat, false, true);
	scene.add(plane);

	var plane2_G = new THREE.PlaneGeometry(200, 50, 50, 50);
	// plane2_mat.side = THREE.DoubleSide;  ---> disabled due to rendering problems (???)
	var plane2 = mkMesh(plane2_G, plane_mat, false, true);
	plane2.rotation.x = -Math.PI/2;
	plane2.position.set(0,-100,25);
	scene.add(plane2);

	// LAMP

	// node - side parts
	var node_p1G = new THREE.CylinderGeometry(node_dim / 2 * 0.8, node_dim / 2, node_dim / 4, 24, 24);
	var node_p1 = mkMesh(node_p1G, lamp_mat_1, true, true);
	node_p1.rotation.z = Math.PI / 2;
	node_p1.position.x = node_dim / 4;
	var node_p2 = node_p1.clone();
	node_p2.rotation.z = -Math.PI / 2;
	node_p2.position.x = -node_dim / 4;
	// node - central part
	var node_p3_G = new THREE.CylinderGeometry(node_dim / 4, node_dim / 4, node_dim / 2, 24, 24);
	var node_p3 = mkMesh(node_p3_G, lamp_mat_1, true, true);
	node_p3.rotation.z = Math.PI / 2;
	node_p3.position.x = node_dim / 8
	// node - screws
	var screw_G = new THREE.SphereGeometry(node_dim / 4, 24, 24);
	var screw1 = mkMesh(screw_G, screw_mat, true, true);
	screw1.position.x = -node_dim / 3;
	var screw2 = screw1.clone();
	screw1.position.x = node_dim / 3;
	// assembling node
	var node = new THREE.Object3D();
	node.add(node_p1);
	node.add(node_p2);
	node.add(node_p3);
	node.add(screw1);
	node.add(screw2);

	// arm
	var shape = new THREE.Shape();
	shape.moveTo(-node_dim / 8, 0);
	shape.lineTo(node_dim / 8, 0);
	shape.lineTo(node_dim / 4 + 0.3, 0.7);
	shape.lineTo(node_dim / 4 + 0.3, arm_length - 0.7);
	shape.lineTo(node_dim / 8, arm_length);
	shape.lineTo(-node_dim / 8, arm_length);
	shape.lineTo(0.3, arm_length - 0.7);
	shape.lineTo(0.3, 0.7);
	shape.lineTo(-node_dim / 8, 0);
	var shape_3D_G = new THREE.ExtrudeGeometry(shape, {
		amount: node_dim / 4,
		bevelEnabled: false
	});
	var shape_3D_1 = mkMesh(shape_3D_G, lamp_mat_1, true, true);
	shape_3D_1.rotation.y = Math.PI / 2;
	shape_3D_1.position.set(-node_dim / 8, -arm_length * 0.57, 0);
	shape_3D_1.scale.y = 1.15;
	var shape_3D_2 = shape_3D_1.clone();
	shape_3D_2.rotation.y = -Math.PI / 2;
	shape_3D_2.position.x = node_dim / 8;
	var arm = new THREE.Object3D();
	arm.add(shape_3D_1);
	arm.add(shape_3D_2);

	// top - lampshade
	var lampshade_G = new THREE.SphereGeometry(node_dim * 2, 32, 32, 0, 2 * Math.PI, 0, Math.PI / 2);
	var lampshade_ext = mkMesh(lampshade_G, lamp_mat_1, true, true);
	var lampshade_int = mkMesh(lampshade_G.clone(), lampshade_internal_mat, true, true);
	lampshade_int.scale.set(0.95, 0.95, 0.95);
	var lampshade = new THREE.Object3D();
	lampshade.add(lampshade_ext);
	lampshade.add(lampshade_int);
	lampshade.rotation.x = Math.PI;

	// top - lampshade closure
	var ls_closure_G = new THREE.TorusGeometry(node_dim * 2, 0.1, 32, 32);
	var ls_closure = mkMesh(ls_closure_G, lamp_mat_1, true, true);
	ls_closure.rotation.x = Math.PI / 2;

	// top - support
	var support_G = new THREE.CylinderGeometry(node_dim / 8, node_dim / 8, 0.8, 24, 24);
	var support = mkMesh(support_G, lamp_mat_1, true, true);
	support.rotation.x = Math.PI / 2;
	support.position.set(0, -2.1, -1);

	// top - button
	var button_p0_G = new THREE.CylinderGeometry(node_dim, node_dim / 2, 0.7, 32, 32, true);
	var button_p0 = mkMesh(button_p0_G, lamp_mat_1, true, true);
	button_p0.position.y = -2;
	var button_p1_G = new THREE.CylinderGeometry(node_dim / 2, node_dim / 8, 0.1, 32, 32);
	var button_p1 = mkMesh(button_p1_G, lamp_mat_1, true, true);
	button_p1.position.y = -2.4;
	var button_p2_G = new THREE.TorusGeometry(0.12, 0.03, 24, 24);
	var button_p2 = mkMesh(button_p2_G, lamp_mat_1, true, true);
	button_p2.position.y = -2.45;
	button_p2.rotation.x = Math.PI / 2;
	var button_p3_G = new THREE.CylinderGeometry(0.11, 0.11, 0.4, 24, 24);
	var button_p3 = mkMesh(button_p3_G, lamp_mat_2, true, true);
	button_p3.position.y = -2.4;
	button = new THREE.Object3D();
	button.add(button_p0);
	button.add(button_p1);
	button.add(button_p2);
	button.add(button_p3);

	// top - bulb
	var bulb_G = new THREE.SphereGeometry(node_dim * 0.7, 24, 24);
	var bulb = mkMesh(bulb_G, bulb_mat);
	bulb.position.y = -node_dim;

	// top - glass
	var glass_G = new THREE.CylinderGeometry(node_dim * 2, node_dim * 1.9, 0.2, 32, 32);
	var glass = mkMesh(glass_G, glass_mat);
	glass.position.y = -0.05;

	// assembling top
	var top = new THREE.Object3D();
	top.add(support);
	top.add(button);
	top.add(lampshade);
	top.add(ls_closure);
	top.add(bulb);
	top.add(glass);
	top.position.set(0, -0.4, 1.5);
	var top_node = new THREE.Object3D();
	top_node.add(top);

	// joints
	var joint1 = mkJoint(node.clone(), arm.clone(), node_dim, arm_length);
	joint1.rotation.x = Math.PI / 2;
	var joint2 = mkJoint(node.clone(), arm.clone(), node_dim, arm_length);
	joint1.hook.add(joint2);
	var joint3 = mkJoint(node.clone(), top_node, node_dim, node_dim * 4);
	joint2.hook.add(joint3);
	joint1.position.z = 0.6;

	// base
	var base_p1_G = new THREE.SphereGeometry(4.5, 32, 32, 0, 2 * Math.PI, 0, Math.PI / 4);
	var base_p1 = mkMesh(base_p1_G, lamp_mat_1, true, true);
	base_p1.rotation.x = Math.PI / 2;
	var base_p2_G = new THREE.CylinderGeometry(0.11, 0.11, 0.7, 24, 24);
	var base_p2 = mkMesh(base_p2_G, lamp_mat_2, true, true);
	base_p2.rotation.x = Math.PI / 2;
	base_p2.position.z = 4.7;
	var base_p3_G = new THREE.TorusGeometry(node_dim * 0.6, node_dim * 0.2, 32, 32);
	var base_p3 = mkMesh(base_p3_G, lamp_mat_1, true, true);
	base_p3.position.z = 4.4;
	// assembling base
	var base = new THREE.Object3D();
	base.add(base_p1);
	base.add(base_p2);
	base.add(base_p3);
	base.position.z = -4.65;

	// assembling lamp
	var lamp = new THREE.Object3D();
	lamp.add(base);
	lamp.add(joint1);
	lamp.position.z = node_dim / 2 + 1;
	scene.add(lamp);

	// positioning lamp
	x = lamp.position.x = 0.0;
	y = lamp.position.y = 0.0;
	alpha = joint1.rotation.y = 5.3;
	beta = joint1.node.rotation.x = 0.5;
	gamma = joint2.node.rotation.x = -1.4;
	delta = joint2.rotation.y = 0.0;
	epsilon = joint3.node.rotation.x = -1;


	/* AMBIENT */

	var ball_G = new THREE.SphereGeometry(2.8, 32, 32);
	var ball = mkMesh(ball_G, ball_mat, true, false);
	ball.position.set(20, 8, 2.7);
	ball.rotation.y = -Math.PI / 2;
	scene.add(ball);


	/* TEXT */

	var options = {
		size: 16,
		height: 1,
		weight: "normal",
		font: "helvetiker",
		bevelThickness: 1,
		bevelSize: 0.8,
		bevelSegments: 2,
		bevelEnabled: true,
		curveSegments: 2,
		steps: 1
	};

	var text_all_G = new THREE.TextGeometry("P   X A R", options);
	var text_i_G = new THREE.TextGeometry("   I", options);
	var text_all = mkMesh(text_all_G, text_mat, true, true);
	var text_i = mkMesh(text_i_G, text_mat, true, true);
	var text = new THREE.Object3D();
	text.add(text_all);
	text.add(text_i);
	text.position.set(30, -50, 0.5);
	text.rotation.x = Math.PI / 2;
	text.rotation.y = Math.PI;
	scene.add(text);


	/* LIGHTS */

	// main light
	var mainLight = new THREE.SpotLight("#ffffff");
	mainLight.position.set(-20, 60, 70);
	mainLight.target.position.set(-10, 0, 0);
	mainLight.exponent = 5;
	mainLight.intensity = 1;
	mainLight.castShadow = true;
	mainLight.shadowDarkness = 0.3;
	mainLight.shadowCameraFar = 200;
	mainLight.shadowCameraFov = 70;
	mainLight.shadowMapHeight = 1024;
	mainLight.shadowMapWidth = 1024;
	scene.add(mainLight);

	// lamp light 1
	var lampLight1 = new THREE.SpotLight('#CEF6F5');
	lampLight1.target = glass;
	lampLight1.distance = 200;
	lampLight1.castShadow = true;
	lampLight1.shadowDarkness = 0.7;
	lampLight1.shadowCameraNear = 1;
	lampLight1.shadowCameraFar = 200;
	lampLight1.shadowCameraFov = 80;
	lampLight1.shadowMapHeight = 512;
	lampLight1.shadowMapWidth = 512;
	lampshade.add(lampLight1);

	// lamp light 2
	var lampLight2 = new THREE.PointLight('#CEF6F5');
	lampLight2.position = bulb.position;
	lampLight2.distance = node_dim * 3;
	lampLight2.intensity = 10;
	lampshade.add(lampLight2);


	/* ANIMATIONS */

	// look camera

	var lampTween16a = new TWEEN.Tween(joint1.rotation)
		.to({
			y: 4.4
		}, 3000)
		.easing(TWEEN.Easing.Quintic.Out)
		.delay(500);

	var lampTween16b = new TWEEN.Tween(joint1.node.rotation)
		.to({
			x: 0.07
		}, 3000)
		.easing(TWEEN.Easing.Quintic.Out)
		.delay(500);

	var lampTween16c = new TWEEN.Tween(joint2.node.rotation)
		.to({
			x: -0.5
		}, 3000)
		.easing(TWEEN.Easing.Quintic.Out)
		.delay(500);

	var lampTween16d = new TWEEN.Tween(joint2.rotation)
		.to({
			y: 2
		}, 3000)
		.easing(TWEEN.Easing.Quintic.Out)
		.delay(500);

	var lampTween16e = new TWEEN.Tween(joint3.node.rotation)
		.to({
			x: -1
		}, 3000)
		.easing(TWEEN.Easing.Quintic.Out)
		.delay(1000)

	var lampTween16 = new TWEEN.Tween(joint3.node.rotation)
		.to({
			x: -1.8
		}, 1000)
		.easing(TWEEN.Easing.Quadratic.Out)
		.delay(1000)
		.chain(lampTween16a, lampTween16b, lampTween16c, lampTween16d, lampTween16e);

	// bounce 2

	var lampTween15a = new TWEEN.Tween(lamp.position)
		.to({
			z: 2
		}, 300)
		.easing(TWEEN.Easing.Bounce.Out)
		.chain(lampTween16);

	var lampTween15b = new TWEEN.Tween(joint1.node.rotation)
		.to({
			x: 0.5
		}, 300)
		.easing(TWEEN.Easing.Bounce.Out)
		.delay(100);

	var lampTween15c = new TWEEN.Tween(joint2.node.rotation)
		.to({
			x: -1.4
		}, 300)
		.easing(TWEEN.Easing.Bounce.Out)
		.delay(100);

	var lampTween15d = new TWEEN.Tween(text_i.scale)
		.to({
			y: 0.01,
		}, 300)
		.easing(TWEEN.Easing.Bounce.InOut)

	var lampTween14 = new TWEEN.Tween(lamp.position)
		.to({
			z: 20
		}, 300)
		.easing(TWEEN.Easing.Cubic.In)
		.chain(lampTween15a, lampTween15b, lampTween15c, lampTween15d);

	var lampTween13a = new TWEEN.Tween(joint1.node.rotation)
		.to({
			x: 0.24
		}, 300)
		.easing(TWEEN.Easing.Back.In)
		.delay(500)
		.chain(lampTween14);

	var lampTween13b = new TWEEN.Tween(joint2.node.rotation)
		.to({
			x: -0.8
		}, 300)
		.easing(TWEEN.Easing.Back.In)
		.delay(500);

	// bounce 1

	var lampTween12a = new TWEEN.Tween(lamp.position)
		.to({
			z: 10.2
		}, 300)
		.easing(TWEEN.Easing.Bounce.Out)
		.chain(lampTween13a, lampTween13b);

	var lampTween12b = new TWEEN.Tween(joint1.node.rotation)
		.to({
			x: 0.5
		}, 300)
		.easing(TWEEN.Easing.Bounce.Out)
		.delay(100);

	var lampTween12c = new TWEEN.Tween(joint2.node.rotation)
		.to({
			x: -1.4
		}, 300)
		.easing(TWEEN.Easing.Bounce.Out)
		.delay(100);

	var lampTween12d = new TWEEN.Tween(text_i.scale)
		.to({
			y: 0.5
		}, 300)
		.easing(TWEEN.Easing.Bounce.InOut)

	var lampTween11 = new TWEEN.Tween(lamp.position)
		.to({
			z: 30
		}, 300)
		.easing(TWEEN.Easing.Cubic.In)
		.chain(lampTween12a, lampTween12b, lampTween12c, lampTween12d);

	var lampTween10a = new TWEEN.Tween(joint1.node.rotation)
		.to({
			x: 0.24
		}, 300)
		.easing(TWEEN.Easing.Back.In)
		.delay(500)
		.chain(lampTween11);

	var lampTween10b = new TWEEN.Tween(joint2.node.rotation)
		.to({
			x: -0.8
		}, 300)
		.easing(TWEEN.Easing.Back.In)
		.delay(500);

	// jump

	var lampTween9 = new TWEEN.Tween(lamp.position)
		.to({
			x: [3.6, 9.6],
			y: [-27, -50.4],
			z: [50, 19]
		}, 500)
		.interpolation(TWEEN.Interpolation.Bezier)
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.chain(lampTween10a, lampTween10b);

	var lampTween8a = new TWEEN.Tween(joint1.node.rotation)
		.to({
			x: 0.5
		}, 200)
		.easing(TWEEN.Easing.Cubic.In)
		.chain(lampTween9);

	var lampTween8b = new TWEEN.Tween(joint2.node.rotation)
		.to({
			x: -1.4
		}, 200)
		.easing(TWEEN.Easing.Cubic.In);

	var lampTween8c = new TWEEN.Tween(joint3.node.rotation)
		.to({
			x: -1
		}, 200)
		.easing(TWEEN.Easing.Cubic.In);

	var lampTween7a = new TWEEN.Tween(joint1.node.rotation)
		.to({
			x: 1
		}, 500)
		.easing(TWEEN.Easing.Cubic.Out)
		.chain(lampTween8a, lampTween8b, lampTween8c);

	var lampTween7b = new TWEEN.Tween(joint2.node.rotation)
		.to({
			x: -2
		}, 500)
		.easing(TWEEN.Easing.Cubic.Out);

	var lampTween7c = new TWEEN.Tween(joint3.node.rotation)
		.to({
			x: -1.6
		}, 500)
		.easing(TWEEN.Easing.Cubic.Out);

	var lampTween6 = new TWEEN.Tween(joint2.node.rotation)
		.to({
			x: -0.9
		}, 500)
		.easing(TWEEN.Easing.Cubic.In)
		.delay(500)
		.chain(lampTween7a, lampTween7b, lampTween7c);

	// looking aroud

	var lampTween5 = new TWEEN.Tween(joint1.rotation)
		.to({
			y: 3.5
		}, 1000)
		.easing(TWEEN.Easing.Exponential.Out)
		.chain(lampTween6);

	var mainLightTween2 = new TWEEN.Tween(mainLight)
		.to({
			intensity: 1,
			shadowDarkness: 0.3
		}, 200)
		.easing(TWEEN.Easing.Cubic.Out)
		.delay(100);

	var lampTween4 = new TWEEN.Tween(joint1.rotation)
		.to({
			y: 1.8
		}, 4000)
		.easing(TWEEN.Easing.Quadratic.Out)
		.delay(500)
		.chain(lampTween5, mainLightTween2);

	var lampTween3 = new TWEEN.Tween(joint1.rotation)
		.to({
			y: 4.4
		}, 500)
		.easing(TWEEN.Easing.Exponential.Out)
		.delay(300)
		.chain(lampTween4);

	var lampTween2 = new TWEEN.Tween(joint1.rotation)
		.to({
			y: 5.3
		}, 500)
		.easing(TWEEN.Easing.Exponential.Out)
		.delay(300)
		.repeat(2)
		.yoyo(true)
		.chain(lampTween3);

	var lampTween1a = new TWEEN.Tween(joint1.rotation)
		.to({
			y: 6.1
		}, 1000)
		.easing(TWEEN.Easing.Cubic.Out)
		.delay(1000)
		.chain(lampTween2);

	var lampTween1b = new TWEEN.Tween(joint3.node.rotation)
		.to({
			x: -0.7
		}, 1000)
		.easing(TWEEN.Easing.Cubic.Out)
		.delay(1000);

	var lampLightTween1a = new TWEEN.Tween(lampLight1)
		.to({
			intensity: 1
		}, 1000)
		.easing(TWEEN.Easing.Bounce.In)
		.delay(1000)
		.chain(lampTween1a, lampTween1b);

	var lampLightTween1b = new TWEEN.Tween(lampLight2)
		.to({
			intensity: 10
		}, 1000)
		.easing(TWEEN.Easing.Bounce.In)
		.delay(1000);

	var resetAnimation = function() {
		TWEEN.removeAll();
		joint1.rotation.y = alpha;
		joint1.node.rotation.x = beta;
		joint2.node.rotation.x = gamma;
		joint2.rotation.y = delta;
		joint3.node.rotation.x = epsilon;
		lamp.position.set(x, y, node_dim / 2 + 1);
		mainLight.intensity = 1;
		mainLight.shadowDarkness = 0.3;
		lampLight1.intensity = 1;
		lampLight2.intensity = 10;
		text_i.scale.y = 1;
		if (!controls.switchOn) {
			lampLight1.shadowDarkness = 0;
			lampLight1.intensity = 0;
			lampLight2.intensity = 0;
		}
	};

	var stopAnimation = function() {
		TWEEN.removeAll();
	};

	var startAnimation = function() {
		resetAnimation();
		lampLight1.intensity = 0;
		lampLight2.intensity = 0;
		var mainLightTween1 = new TWEEN.Tween(mainLight)
			.to({
				intensity: 0,
				shadowDarkness: 0
			}, 500)
			.easing(TWEEN.Easing.Cubic.Out)
			.chain(lampLightTween1a, lampLightTween1b)
			.start();
	};


	/* HELPERS */

	// axis helper
	var axisHelper = new THREE.AxisHelper(3);
	axisHelper.visible = false;
	scene.add(axisHelper);


	/* GUI CONTROLS */	

	var controls = new function() {
		this.x = (x + 0.5);
		this.y = (y + 0.5);
		this.alpha = alpha;
		this.beta = beta;
		this.gamma = -gamma;
		this.delta = delta;
		this.epsilon = -epsilon;
		this.lightIntensity = 1;
		this.switchOn = true;
		this.mainLightIntensity = 1;
		this.startAnimation = startAnimation;
		this.stopAnimation = stopAnimation;
		this.resetAnimation = resetAnimation;
		this.axisHelper = false;
		this.lampLightHelper = false;
		this.mainLightHelper = false;
		this.enableTrackball = true;
	};

	var gui = new dat.GUI();

	var f_position = gui.addFolder('Lamp position');

	f_position.add(controls, 'x', 0.0, 1.0).onChange(function(value) {
		lamp.position.x = -(value - 0.5) * 120;
	});

	f_position.add(controls, 'y', 0.0, 1.0).onChange(function(value) {
		lamp.position.y = -(value - 0.5) * 180;
	});

	var f_angles = gui.addFolder('Lamp angles');

	f_angles.add(controls, 'alpha', 0.0, 2 * Math.PI).onChange(function(value) {
		joint1.rotation.y = value;
	});

	f_angles.add(controls, 'beta', 0.0, Math.PI / 2).onChange(function(value) {
		joint1.node.rotation.x = value;
	});

	f_angles.add(controls, 'gamma', 0.0, Math.PI / 2).onChange(function(value) {
		joint2.node.rotation.x = -value;
	});

	f_angles.add(controls, 'delta', 0.0, 2 * Math.PI).onChange(function(value) {
		joint2.rotation.y = value;
	});

	f_angles.add(controls, 'epsilon', 0.0, Math.PI / 2).onChange(function(value) {
		joint3.node.rotation.x = -value;
	});

	var f_light = gui.addFolder('Lamp light');

	f_light.add(controls, 'lightIntensity', 0.0, 2).onChange(function(value) {
		lampLight1.intensity = value;
		lampLight1.shadowDarkness = value / 1.42;
		lampLight2.intensity = value * 10;
	});

	f_light.add(controls, 'switchOn').onChange(function(e) {
		if (e) {
			var lampLightOnTween1 = new TWEEN.Tween(lampLight1)
				.to({
					intensity: controls.lightIntensity
				}, 500)
				.easing(TWEEN.Easing.Bounce.In)
				.start();
			var lampLightOnDarknessTween = new TWEEN.Tween(lampLight1)
				.to({
					shadowDarkness: controls.lightIntensity / 1.42
				}, 500)
				.easing(TWEEN.Easing.Bounce.In)
				.start();
			var lampLightOnTween2 = new TWEEN.Tween(lampLight2)
				.to({
					intensity: controls.lightIntensity * 10
				}, 500)
				.easing(TWEEN.Easing.Bounce.In)
				.start();
			button_p3.position.y = -2.4;
		} else {
			lampLight1.shadowDarkness = 0;
			lampLight1.intensity = 0;
			lampLight2.intensity = 0;
			button_p3.position.y = -2.6;
		}
	});

	gui.add(controls, 'mainLightIntensity', 0, 1.5).onChange(function(value) {
		mainLight.intensity = value;
		mainLight.shadowDarkness = value / 3;
	});

	var f_animation = gui.addFolder('Animation Controls');

	f_animation.add(controls, 'startAnimation');

	f_animation.add(controls, 'stopAnimation');

	f_animation.add(controls, 'resetAnimation');

	var f_debug = gui.addFolder('Debug');

	f_debug.add(controls, 'axisHelper').onChange(function(e) {
		axisHelper.visible = e;
	});

	f_debug.add(controls, 'lampLightHelper').onChange(function(e) {
		lampLight1.shadowCameraVisible = e;
	});

	f_debug.add(controls, 'mainLightHelper').onChange(function(e) {
		mainLight.shadowCameraVisible = e;
	});

	gui.add(controls, 'enableTrackball');


	/* RENDERING */

	$('body').append(renderer.domElement);


	function render() {
		stats.update();
		if (controls.enableTrackball) {
			trackballControls.update();
		}
		TWEEN.update();
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function initStats() {
		var stats = new Stats();
		stats.setMode(0); // 0: fps, 1: ms
		$('body').append(stats.domElement);
		return stats;
	}

	render();

});