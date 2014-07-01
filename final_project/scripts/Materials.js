/* MATERIALS */

function mkTextureMaterial(map, shininess, norm, norm_map, wrapping, wrapX, wrapY) {
	var texture = THREE.ImageUtils.loadTexture(textures_path + map);
	var material = new THREE.MeshPhongMaterial({
		map: texture,
		shininess: shininess
	})
	if (norm) {
		var normal = THREE.ImageUtils.loadTexture(textures_path + norm_map);
		material.normalMap = normal;
	}
	if (wrapping) {
		texture.repeat.set(wrapX, wrapY);
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		if (norm) {
			normal.repeat.set(wrapX, wrapY);
			normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
		}
	}
	return material;
}


// FLOOR

var floor_texture_material = mkTextureMaterial("floor_diff.jpg", 30, true, "floor_norm.jpg", true, 10, 10);
var mats = [];
mats.push(new THREE.MeshLambertMaterial({
	color: '#585858'
}));
mats.push(new THREE.MeshLambertMaterial({
	color: '#585858'
}));
mats.push(new THREE.MeshLambertMaterial({
	color: '#585858'
}));
mats.push(new THREE.MeshLambertMaterial({
	color: '#585858'
}));
mats.push(floor_texture_material);
mats.push(new THREE.MeshLambertMaterial({
	color: '#000000'
}));
var floor_material = new THREE.MeshFaceMaterial(mats);


// GRASS - LANDING

// var shader = THREE.ShaderLib["normalmap"];
// var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
// uniforms["enableDiffuse"].value = true;
// uniforms["enableSpecular"].value = false;
// uniforms["enableDisplacement"].value = true;
// uniforms["tNormal"].value = THREE.ImageUtils.loadTexture(textures_path + "landing_norm.jpg");
// uniforms["tDiffuse"].value = THREE.ImageUtils.loadTexture(textures_path + "landing_diff.jpg");
// uniforms["tDisplacement"].value = THREE.ImageUtils.loadTexture(textures_path + "landing_disp.jpg");
// uniforms["uDisplacementScale"].value = 0.1;
// uniforms["uNormalScale"].value.y = -1;
// uniforms["diffuse"].value.setHex(0xffffff);
// uniforms["ambient"].value.setHex(0xffffff);
// uniforms["shininess"].value = 50;
// uniforms["diffuse"].value.convertGammaToLinear();
// uniforms["ambient"].value.convertGammaToLinear();
// var parameters = {
// 	fragmentShader: shader.fragmentShader,
// 	vertexShader: shader.vertexShader,
// 	uniforms: uniforms,
// 	lights: true
// };
// var landing_material = new THREE.ShaderMaterial(parameters);
var grass_material = mkTextureMaterial("grass_diff.jpg", 5, true, "grass_norm.jpg", true, 20, 20);


// WALL

var wall_material = new THREE.MeshLambertMaterial({
	color: '#585858',
	side: THREE.DoubleSide,
	shading: THREE.FlatShading
});
var bathroom_wall_texture = mkTextureMaterial("wall4_diff.jpg", 200, true, "wall4_norm.jpg", true, 1, 1);
// int-ext wall
var int_wall_texture = mkTextureMaterial("wall5_diff.jpg", 10, true, "wall5_norm.jpg", true, 1, 1);
int_wall_texture.normalScale = new THREE.Vector2(-1.0, -1.0);
var ext_wall_texture = mkTextureMaterial("wall1_diff.jpg", 10, true, "wall1_norm.jpg", true, 1, 1);
ext_wall_texture.normalScale = new THREE.Vector2(-1.0, -1.0);
var int_wall_side_texture = int_wall_texture.clone();
int_wall_side_texture.normalScale.x *= -1;
int_wall_side_texture.normalScale.y *= -1;
var ext_wall_side_texture = ext_wall_texture.clone();
ext_wall_side_texture.normalScale.x *= -1;
ext_wall_side_texture.normalScale.y *= -1;


// ROOF

var shader = THREE.ShaderLib["normalmap"];
var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
uniforms["enableDiffuse"].value = true;
uniforms["enableSpecular"].value = false;
uniforms["enableDisplacement"].value = true;
uniforms["tNormal"].value = THREE.ImageUtils.loadTexture(textures_path + "roof_norm.jpg");
uniforms["tDiffuse"].value = THREE.ImageUtils.loadTexture(textures_path + "roof_diff.jpg");
uniforms["tDisplacement"].value = THREE.ImageUtils.loadTexture(textures_path + "roof_disp.jpg");
uniforms["uDisplacementScale"].value = 0.5;
uniforms["uNormalScale"].value.y = -1;
uniforms["diffuse"].value.setHex(0xffffff);
uniforms["ambient"].value.setHex(0xffffff);
uniforms["shininess"].value = 100;
uniforms["diffuse"].value.convertGammaToLinear();
uniforms["ambient"].value.convertGammaToLinear();
var parameters = {
	fragmentShader: shader.fragmentShader,
	vertexShader: shader.vertexShader,
	uniforms: uniforms,
	lights: true,
	side: THREE.DoubleSide
};
var roof_tiles_material = new THREE.ShaderMaterial(parameters);
var roof_material = mkTextureMaterial("wall5_diff.jpg", 10, true, "wall5_norm.jpg", true, 10, 10);

// DOOR

// int doors
var door_texture_material = mkTextureMaterial("door_diff.jpg", 5, true, "door_normal.jpg")
var mats = [];
mats.push(new THREE.MeshLambertMaterial({
	color: '#3A2310'
}));
mats.push(new THREE.MeshLambertMaterial({
	color: '#3A2310'
}));
mats.push(door_texture_material);
mats.push(door_texture_material);
mats.push(new THREE.MeshLambertMaterial({
	color: '#3A2310'
}));
mats.push(new THREE.MeshLambertMaterial({
	color: '#3A2310'
}));
var door_material = new THREE.MeshFaceMaterial(mats);
var door_handle_material = new THREE.MeshPhongMaterial({
	color: '#6E6E6E',
	shininess: 200,
	specular: '#ffffff',
	metal: true
});
// ext door
var ext_door_texture_material = mkTextureMaterial("ext_door_diff.jpg", 10, true, "ext_door_norm.jpg")
var mats = [];
mats.push(new THREE.MeshLambertMaterial({
	color: '#23150A'
}));
mats.push(new THREE.MeshLambertMaterial({
	color: '#23150A'
}));
mats.push(ext_door_texture_material);
mats.push(ext_door_texture_material);
mats.push(new THREE.MeshLambertMaterial({
	color: '#23150A'
}));
mats.push(new THREE.MeshLambertMaterial({
	color: '#23150A'
}));
var ext_door_material = new THREE.MeshFaceMaterial(mats);
var ext_door_handle_material = new THREE.MeshPhongMaterial({
	color: '#563B12',
	shininess: 200,
	specular: '#EAC54D',
	metal: true,
	shading: THREE.FlatShading
});
// support
var door_support_material = new THREE.MeshPhongMaterial({
	color: '#422208',
	shininess: 150,
	specular: '#662E00',
	metal: true
});


// WINDOW

var window_glass_material = new THREE.MeshPhongMaterial({
	map: THREE.ImageUtils.loadTexture(textures_path + "window_glass.jpg"),
	shininess: 50,
	specular: '#B5FFFA',
	transparent: true,
	opacity: 0.6,
	metal: true
});
var window_wood_material = mkTextureMaterial("window_wood_diff.jpg", 50, true, "window_wood_norm.jpg", true, 3, 1);
var windowsill_wood_material = mkTextureMaterial("windowsill_wood_diff.jpg", 50, true, "windowsill_wood_diff.jpg", true, 1, 1);


// LAMP

var lamp_material = new THREE.MeshPhongMaterial({
	color: '#4E4E4E',
	shininess: 200,
	metal: true
});
var lampshade_internal_material = new THREE.MeshPhongMaterial({
	color: '#aaaaff',
	shading: THREE.FlatShading,
	side: THREE.BackSide,
	shininess: 300,
	specular: '#ffffff',
	metal: true
});
var lamp_bulb_material = new THREE.MeshPhongMaterial({
	color: '#CEF6F5',
	opacity: 0.6,
	transparent: true,
	shininess: 300,
	specular: '#ffffff',
	metal: true
});
var lamp_glass_material = new THREE.MeshPhongMaterial({
	color: '#ffffff',
	opacity: 0.5,
	shininess: 200,
	transparent: true,
});

// lightswitch
var lightSwitch_material1 = new THREE.MeshPhongMaterial({
	color: '#949073',
	shininess: 200,
	metal: true,
	side: THREE.DoubleSide
});
var lightSwitch_material2 = new THREE.MeshPhongMaterial({
	color: '#D8D4BB',
	shininess: 50,
	side: THREE.DoubleSide
});

// VIDEO

loadVideo('rossi-lorenzo.ogv', false);
var video_material = new THREE.MeshBasicMaterial({
	map: video_texture,
	shininess: 100
});

// PARABOLIC ANTENNA

var parabolicAntenna_material = new THREE.MeshPhongMaterial({
	color: '#808080',
	shininess: 200,
	specular: '#FFFFFF',
	metal: true
});

// MIRROR

var mirror_material = new THREE.MeshPhongMaterial({
	envMap: camera_mirror.renderTarget,
	emissive: '#FFFFFF',
	shininess: 100
});
var mirror_fake_material = new THREE.MeshBasicMaterial({
	color: '#000000'
});

// WATER

var water_material = new THREE.MeshPhongMaterial({
	color: '#658C98',
	specular: '#FFFFFF',
	transparent: true,
	opacity: 0.8,
	normalMap: THREE.ImageUtils.loadTexture(textures_path + 'water_norm.jpg'),
	shininess: 200
})
water_material.normalMap.repeat.set(1, 2);
water_material.normalMap.wrapS = THREE.RepeatWrapping;
water_material.normalMap.wrapT = THREE.RepeatWrapping;

// PC SCREEN - PAPER

var pcScreen_material = new THREE.MeshPhongMaterial({
	map: THREE.ImageUtils.loadTexture(textures_path + 'pcScreen.jpg'),
	side: THREE.DoubleSide,
	shininess: 50
});

var pcScreen_noms_material = new THREE.MeshPhongMaterial({
	color: '#B8B8B8',
	side: THREE.DoubleSide,
	shininess: 50
});

var glasses_description_material = new THREE.MeshLambertMaterial({
	map:THREE.ImageUtils.loadTexture(textures_path + 'glasses_description.png')
});

// PICTURES

var picture_material = new THREE.MeshPhongMaterial({
	normalMap: THREE.ImageUtils.loadTexture(textures_path + 'picture_norm.jpg'),
	shininess: 100
});