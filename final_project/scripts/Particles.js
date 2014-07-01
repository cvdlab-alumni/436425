/* PARTICLES */

var particleSystemsToUpdate = [];

function mkWaterParticleSystem(num, size, speed, cubeArea, groundH, color, textureSrc, cubeCollision) {

	var geometry = new THREE.Geometry();
	var texture = THREE.ImageUtils.loadTexture('assets/textures/' + textureSrc);

	for (i = 0; i < num; i++) {
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * cubeArea[0];
		vertex.y = Math.random() * cubeArea[1];
		vertex.z = Math.random() * cubeArea[2];
		geometry.vertices.push(vertex);
	}

	material = new THREE.ParticleSystemMaterial({
		size: size,
		map: texture,
		// blending: THREE.AdditiveBlending,
		transparent: true,
		opacity: 0.8
	});
	material.color = new THREE.Color(color);

	particles = new THREE.ParticleSystem(geometry, material);
	particles.speed = speed;
	particleSystemsToUpdate.push(particles);
	particles.toUpdate = false;

	particles.updatePosition = function() {
		function checkCollision(vertex) {
			return (
				vertex.x > cubeCollision[0][0] && vertex.x < cubeCollision[1][0] &&
				vertex.y > cubeCollision[0][1] && vertex.y < cubeCollision[1][1] &&
				vertex.z > cubeCollision[0][2] && vertex.z < cubeCollision[1][2])
		}
		if (this.toUpdate) {
			for (var i = 0; i < geometry.vertices.length; i++) {
				if (geometry.vertices[i].z < groundH || (cubeCollision && checkCollision(geometry.vertices[i]))) {
					// geometry.vertices[i].x = Math.random() * cubeArea[0];
					// geometry.vertices[i].y = Math.random() * cubeArea[1];
					// geometry.vertices[i].z = Math.random() * cubeArea[2];
					geometry.vertices[i].z += cubeArea[2];
				}
				geometry.vertices[i].z -= this.speed;
			}
			geometry.verticesNeedUpdate = true;
		}
	}

	return particles;
}

function mkStarsParticleSystem(num, size, cubeArea, textureSrc) {

	var geometry = new THREE.Geometry();
	var texture = THREE.ImageUtils.loadTexture('assets/textures/' + textureSrc);

	for (i = 0; i < num; i++) {
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * cubeArea[0];
		vertex.y = Math.random() * cubeArea[1];
		vertex.z = Math.random() * cubeArea[2];
		geometry.vertices.push(vertex);
	}

	material = new THREE.ParticleSystemMaterial({
		size: size,
		map: texture,
		blending: THREE.AdditiveBlending,
		transparent: true,
		opacity: 0
	});

	particles = new THREE.ParticleSystem(geometry, material);

	return particles;
}

var fantozziCloudRain = mkWaterParticleSystem(5000, 0.3, 0.3, [60, 60, 20], 0, '#3B6EA9', 'raindrop.png', [[20, 20, 0], [42, 39, 4]]);
fantozziCloudRain.position.set(-20, -20, 0);

var tapWater = mkWaterParticleSystem(500, 0.03, 0.03, [0.05, 0.03, 0.5], 0, '#9DD8E4', 'raindrop.png');
tapWater.position.set(7.25, 15.15, 0.35);

var stars = mkStarsParticleSystem(5000, 3, [600, 40, 600], 'star.png');
stars.position.set(-300,50,-300)