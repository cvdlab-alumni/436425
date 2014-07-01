/* GUI */

importRainFogAnimations();


// GUI CONTROLS

var guiControls = new function() {
    this.showRoof = false;
    this.showMirror = false;
    this.showLights = true;
    this.toggleAllLights = toggleAllLights;
    this.antennaRotation = parabolicAntenna_container.rotation.x;
    this.changeExtWall = function() {
        changeWallTexture('ext');
    };
    this.changeIntWall = function() {
        changeWallTexture('int');
    };
    this.day = function() {
        dayNightAnimations('day', guiControls.animationSpeed);
    };
    this.sunset = function() {
        dayNightAnimations('sunset', guiControls.animationSpeed);
    };
    this.night = function() {
        dayNightAnimations('night', guiControls.animationSpeed);
    };
    this.sunrise = function() {
        dayNightAnimations('sunrise', guiControls.animationSpeed);
    };
    this.dayNightAnimation = false;
    this.animationSpeed = 1;
    this.rain = false;
    this.enableTrackball = true;
    this.startFP = startFP;
    // this.skyboxColor = skybox.color.getHex();
    // this.hemiLightColor = hemiLight.color.getHex();
    // this.dirLightColor = dirLight.color.getHex();
}

var gui = new dat.GUI();

if (!disableRoof) {
    gui.add(guiControls, "showRoof").onChange(function(e) {
        roof.visible = e;
        roof_tiles.visible = e;
    });
}

gui.add(guiControls, "showMirror").onChange(function(e) {
    if (e) {
        mirror_bathroom.material = mirror_material;
    } else {
        mirror_bathroom.material = mirror_fake_material;
    }
});

if (!disableLights) {
    gui.add(guiControls, "showLights").onChange(function(e) {
        if (e) {
            for (var i = 0; i < lights.length; i++) {
                apartment.add(lights[i]);
            }
        } else {
            for (var i = 0; i < lights.length; i++) {
                apartment.remove(lights[i]);
            }
        }
    });
    gui.add(guiControls, "toggleAllLights");
}

if (!disableForniture) {
    gui.add(guiControls, 'antennaRotation', 0.5, 2).onChange(function(e) {
        parabolicAntenna_container.rotation.x = e;
        if (Math.abs(1.2 - e) >= 0.2) {
            if (parabolicAntenna_container.inPosition) {
                loadVideo('tv_noise.ogv', tvScreen.isOn);
                parabolicAntenna_container.inPosition = false;
            }
        } else {
            if (!parabolicAntenna_container.inPosition) {
                loadVideo('rossi-lorenzo.ogv', tvScreen.isOn);
                parabolicAntenna_container.inPosition = true;
            }
        }
    });
}

if (!disableWalls) {
    gui.add(guiControls, "changeExtWall");
    gui.add(guiControls, "changeIntWall");
}

// gui.addColor(guiControls, 'skyboxColor').onChange(function(e) {
//     skybox.color = new THREE.Color(e);
// });
// gui.addColor(guiControls, 'hemiLightColor').onChange(function(e) {
//     hemiLight.color = new THREE.Color(e);
// });
// gui.addColor(guiControls, 'dirLightColor').onChange(function(e) {
//     dirLight.color = new THREE.Color(e);
// });

var f_timeOfDay = gui.addFolder('Time of day');

f_timeOfDay.add(guiControls, "day");
f_timeOfDay.add(guiControls, "sunset");
f_timeOfDay.add(guiControls, "night");
f_timeOfDay.add(guiControls, "sunrise");

f_timeOfDay.add(guiControls, 'dayNightAnimation').onChange(function(e) {
    if (e) {
        dayNightAnimations('animate', guiControls.animationSpeed);
    } else {
        TWEEN.removeAll();
    }
});

f_timeOfDay.add(guiControls, 'animationSpeed', 0.1, 2);

gui.add(guiControls, "rain").onChange(function(e) {
    if (e) {
        enableRainTween1.start();
    } else {
        disableRainTween1.start();
    }
});

gui.add(guiControls, "enableTrackball");

gui.add(guiControls, "startFP");