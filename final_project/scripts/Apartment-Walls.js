/* WALLS */

function mkWallpaper(material, b, h, hx, offX, hz, offZ) {
	var shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(b, 0);
	shape.lineTo(b, h);
	shape.lineTo(0, h);
	if (hx !== undefined) {
		var hole = new THREE.Path();
		hole.moveTo(hx, hz);
		hole.lineTo(hx + offX, hz);
		hole.lineTo(hx + offX, hz + offZ);
		hole.lineTo(hx, hz + offZ);
		shape.holes.push(hole);
	}
	var wallpaper_G = new THREE.ExtrudeGeometry(shape, {
		amount: 0,
		bevelEnabled: false
	});
	var wallpaper = mkMesh(wallpaper_G, material, false, true);
	wallpaper.rotation.x = Math.PI / 2;
	return wallpaper;
}

function mkSideWallpaper(material, oldWallpaper, axis, wideWall) {
	var sideWallpaper = oldWallpaper.clone();
	sideWallpaper.material = material;
	var shift = (wideWall) ? 0.404 : 0.204;
	switch (axis) {
		case 'x':
			sideWallpaper.position.x += shift;
			break;
		case 'y':
			sideWallpaper.position.y += shift;
			break;
		case 'z':
			sideWallpaper.position.z += shift;
			break;
	}
	return sideWallpaper;
}

var tn = 1;
var changeWallTexture = function(wall) {
    tn = tn++ % 5;
    tn += 1;
    var intext_wall_texture = eval(wall + "_wall_texture");
    var intext_wall_side_texture = eval(wall + "_wall_side_texture");
    var texture = THREE.ImageUtils.loadTexture(textures_path + "wall" + tn + "_diff.jpg");
    var normal = THREE.ImageUtils.loadTexture(textures_path + "wall" + tn + "_norm.jpg");
    intext_wall_texture.map = texture;
    intext_wall_texture.map.wrapS = intext_wall_texture.map.wrapT = THREE.RepeatWrapping;
    intext_wall_side_texture.map = texture;
    intext_wall_side_texture.map.wrapS = intext_wall_side_texture.map.wrapT = THREE.RepeatWrapping;
    intext_wall_texture.normalMap = normal;
    intext_wall_texture.normalMap.wrapS = intext_wall_texture.normalMap.wrapT = THREE.RepeatWrapping;
    intext_wall_side_texture.normalMap = normal;
    intext_wall_side_texture.normalMap.wrapS = intext_wall_side_texture.normalMap.wrapT = THREE.RepeatWrapping;
}


if (!disableWalls) {
	// base
	var wallpaper_base_south = mkWallpaper(ext_wall_texture, 22, 0.5);
	wallpaper_base_south.position.set(0, -0.002, -0.5);
	apartment.add(wallpaper_base_south);
	var wallpaper_base_north = mkWallpaper(ext_wall_texture, 22, 0.5);
	wallpaper_base_north.rotation.y = Math.PI;
	wallpaper_base_north.position.set(22, 19.002, -0.5);
	apartment.add(wallpaper_base_north);
	var wallpaper_base_west = mkWallpaper(ext_wall_texture, 19, 0.5);
	wallpaper_base_west.rotation.y = -Math.PI / 2;
	wallpaper_base_west.position.set(-0.002, 19, -0.5);
	apartment.add(wallpaper_base_west);
	var wallpaper_base_east = mkWallpaper(ext_wall_texture, 19, 0.5);
	wallpaper_base_east.rotation.y = Math.PI / 2;
	wallpaper_base_east.position.set(22.002, 0, -0.5);
	apartment.add(wallpaper_base_east);
	// livingroom
	var wallpaper_livingroom_south = mkWallpaper(ext_wall_texture, 10.9, 3.5, 5.6, 2.8, 1, 1.5);
	wallpaper_livingroom_south.position.set(6.5, -0.002, 0);
	apartment.add(wallpaper_livingroom_south);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_livingroom_south, 'y', true));
	var wallpaper_livingroom_west = mkWallpaper(int_wall_texture, 8, 3.5, 0.5, 1.5, 0, 2.5);
	wallpaper_livingroom_west.rotation.y = -Math.PI / 2;
	wallpaper_livingroom_west.position.set(6.4 - 0.002, 8.4, 0);
	apartment.add(wallpaper_livingroom_west);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_livingroom_west, 'x', false));
	// bedroom1
	var wallpaper_bedroom1_south = mkWallpaper(ext_wall_texture, 6.5, 3.5, 2.9, 1.8, 1, 1.5);
	wallpaper_bedroom1_south.position.set(0, -0.002, 0);
	apartment.add(wallpaper_bedroom1_south);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_bedroom1_south, 'y', true));
	var wallpaper_bedroom1_west = mkWallpaper(ext_wall_texture, 19, 3.5, 6.6, 1.8, 1, 1.5);
	wallpaper_bedroom1_west.rotation.y = -Math.PI / 2;
	wallpaper_bedroom1_west.position.set(-0.002, 19, 0);
	apartment.add(wallpaper_bedroom1_west);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_bedroom1_west, 'x', true));
	// bedroom2
	var wallpaper_bedroom2_south = mkWallpaper(int_wall_texture, 6.4, 3.5);
	wallpaper_bedroom2_south.position.set(0, 8.4 - 0.002, 0);
	apartment.add(wallpaper_bedroom2_south);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_bedroom2_south, 'y', false));
	var wallpaper_bedroom2_north = mkWallpaper(int_wall_texture, 6.4, 3.5);
	wallpaper_bedroom2_north.position.set(0, 18.6 - 0.002, 0);
	apartment.add(wallpaper_bedroom2_north);
	apartment.add(mkSideWallpaper(ext_wall_side_texture, wallpaper_bedroom2_north, 'y', true));
	// bathroom
	var wallpaper_bathroom_south = mkWallpaper(int_wall_texture, 3.8, 3.5, 0.5, 1.5, 0, 2.5);
	wallpaper_bathroom_south.position.set(6.4, 11.6 - 0.002, 0);
	apartment.add(wallpaper_bathroom_south);
	apartment.add(mkSideWallpaper(bathroom_wall_texture, wallpaper_bathroom_south, 'y', false));
	var wallpaper_bathroom_west = mkWallpaper(int_wall_texture, 6.8, 3.5);
	wallpaper_bathroom_west.rotation.y = -Math.PI / 2;
	wallpaper_bathroom_west.position.set(6.4 - 0.002, 18.6, 0);
	apartment.add(wallpaper_bathroom_west);
	apartment.add(mkSideWallpaper(bathroom_wall_texture, wallpaper_bathroom_west, 'x', false));
	var wallpaper_bathroom_north = mkWallpaper(bathroom_wall_texture, 3.8, 3.5, 1.87, 1.11, 1, 1.5);
	wallpaper_bathroom_north.position.set(6.4, 18.6 - 0.002, 0);
	apartment.add(wallpaper_bathroom_north);
	apartment.add(mkSideWallpaper(ext_wall_side_texture, wallpaper_bathroom_north, 'y', true));
	// kitchen
	var wallpaper_kitchen_south = mkWallpaper(int_wall_texture, 7.2, 3.5, 0.7, 1.5, 0, 2.5);
	wallpaper_kitchen_south.position.set(10.2, 11.6 - 0.002, 0);
	apartment.add(wallpaper_kitchen_south);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_kitchen_south, 'y', false));
	var wallpaper_kitchen_west = mkWallpaper(bathroom_wall_texture, 6.8, 3.5);
	wallpaper_kitchen_west.rotation.y = -Math.PI / 2;
	wallpaper_kitchen_west.position.set(10.2 - 0.002, 18.6, 0);
	apartment.add(wallpaper_kitchen_west);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_kitchen_west, 'x', false));
	var wallpaper_kitchen_north = mkWallpaper(int_wall_texture, 7.2, 3.5, 1.85, 2.01, 1, 1.5);
	wallpaper_kitchen_north.position.set(10.2, 18.6 - 0.002, 0);
	apartment.add(wallpaper_kitchen_north);
	apartment.add(mkSideWallpaper(ext_wall_side_texture, wallpaper_kitchen_north, 'y', true));
	// hallway
	var wallpaper_hallway_south = mkWallpaper(int_wall_texture, 3.8, 3.5, 0.5, 1.5, 0, 2.5);
	wallpaper_hallway_south.position.set(6.4, 8.4 - 0.002, 0);
	apartment.add(wallpaper_hallway_south);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_hallway_south, 'y', false));
	var wallpaper_hallway_south2 = mkWallpaper(int_wall_texture, 7.2, 3.5, 4.6, 1.5, 0, 2.5);
	wallpaper_hallway_south2.position.set(10.2, 8.4 - 0.002, 0);
	apartment.add(wallpaper_hallway_south2);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_hallway_south2, 'y', false));
	var wallpaper_hallway_west = mkWallpaper(int_wall_texture, 3.2, 3.5, 1.1, 1.4, 0, 2.5);
	wallpaper_hallway_west.rotation.y = -Math.PI / 2;
	wallpaper_hallway_west.position.set(6.4 - 0.002, 11.8, 0);
	apartment.add(wallpaper_hallway_west);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_hallway_west, 'x', false));
	// entry
	var wallpaper_entry_south = mkWallpaper(ext_wall_texture, 4.6, 3.5, 1.3, 1.8, 1, 1.5);
	wallpaper_entry_south.position.set(17.4, -0.002, 0);
	apartment.add(wallpaper_entry_south);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_entry_south, 'y', true));
	var wallpaper_entry_west = mkWallpaper(int_wall_texture, 18.6, 3.5, 8.1, 1.4, 0, 2.5);
	wallpaper_entry_west.rotation.y = -Math.PI / 2;
	wallpaper_entry_west.position.set(17.4 - 0.002, 18.8, 0);
	apartment.add(wallpaper_entry_west);
	apartment.add(mkSideWallpaper(int_wall_side_texture, wallpaper_entry_west, 'x', false));
	var wallpaper_entry_east = mkWallpaper(int_wall_texture, 19, 3.5);
	wallpaper_entry_east.rotation.y = -Math.PI / 2;
	wallpaper_entry_east.position.set(21.6 - 0.002, 19, 0);
	apartment.add(wallpaper_entry_east);
	apartment.add(mkSideWallpaper(ext_wall_side_texture, wallpaper_entry_east, 'x', true));
	var wallpaper_entry_north = mkWallpaper(int_wall_texture, 4.6, 3.5, 1.2, 1.8, 0, 2.5);
	wallpaper_entry_north.position.set(17.4, 18.6 - 0.002, 0);
	apartment.add(wallpaper_entry_north);
	apartment.add(mkSideWallpaper(ext_wall_side_texture, wallpaper_entry_north, 'y', true));

	var loader = new THREE.OBJLoader();
	loader.load('assets/models/walls.obj', function(obj) {
		obj.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
				child.receiveShadow = true;
				child.material = wall_material;
				objects.push(child);
			}
		});
		obj.position.z = -0.3;
		apartment.add(obj);
	});
}