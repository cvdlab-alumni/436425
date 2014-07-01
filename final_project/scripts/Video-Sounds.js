/* VIDEO */

function loadVideo(src, play) {
	video.src = "assets/videos/" + src;
	video.load();
	if (play) {
		video.play();
	}
}

video = document.createElement('video');
video.lastTime = 0;
video_image = document.createElement('canvas');
video_image.width = 400;
video_image.height = 226;
video_imageContext = video_image.getContext('2d');
video_imageContext.fillStyle = '#000000';
video_imageContext.fillRect(0, 0, video_image.width, video_image.height);
video_texture = new THREE.Texture(video_image);
video_texture.minFilter = THREE.LinearFilter;
video_texture.magFilter = THREE.LinearFilter;
video_texture.format = THREE.RGBFormat;
video_texture.generateMipmaps = false;
// volume fade
video.defaultRadius = 20;
video.defaultVolume = 1;
video.position = new THREE.Vector3(-0.14, 1.21, 10.27);
video.updateVolume = function() {
	var distance = this.position.distanceTo((!FPenabled) ? camera.position : controls.getObject().position);
	if (distance <= this.defaultRadius) {
		this.volume = this.defaultVolume * (1 - distance / this.defaultRadius);
	} else {
		this.volume = 0;
	}
}


/* SOUNDS */

var soundsToUpdate = []

var Sound = function(src, radius, volume, toUpdate, loop) {
	var audio = document.createElement('audio');
	var source = document.createElement('source');
	source.src = 'assets/sounds/' + src;
	audio.appendChild(source);
	this.position = new THREE.Vector3();
	audio.volume = volume;
	audio.loop = loop;
	this.play = function() {
		audio.play();
	}
	this.pause = function() {
		audio.pause();
	}
	this.stop = function() {
		audio.pause();
		audio.currentTime = 0;
	}
	this.updateVolume = function() {
		var distance = this.position.distanceTo((!FPenabled) ? camera.position : controls.getObject().position);
		if (distance <= radius) {
			audio.volume = volume * (1 - distance / radius);
		} else {
			audio.volume = 0;
		}
	}
	if (toUpdate) {
		soundsToUpdate.push(this);
	}
}

var radio_sound = new Sound(['sweet_home_alabama.mp3'], 15, 0.5, true);
var rain_sound = new Sound(['rain.mp3'], 0, 0.3, false, true);
var door_open_sound = new Sound(['door_open.mp3'], 0, 0.1, false);
var door_close_sound = new Sound(['door_close.mp3'], 0, 0.1, false);
var bathroom_faucet_sound = new Sound(['bathroom_faucet.mp3'], 5, 0.2, true, true);