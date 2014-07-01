/* SETTINGS */

var textures_path = "assets/textures/";
var models_path = "assets/models/";

var disableRoof = false;
var disableDoors = false;
var disableWindows = false;
var disableWalls = false;
var disableForniture = false;
var disableLights = true;


/* INITIALIZATIONS */

var stats = initStats();
var scene = new THREE.Scene();

// camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.up = new THREE.Vector3(0, 1, 0);
camera.position.set(0, 7, 30);
camera.lookAt(scene.position);
scene.add(camera);
// mirror camera
var camera_mirror = new THREE.CubeCamera(0.1, 100, 512);
camera_mirror.position.set(10.147 - 9.5, 1.4, -14 + 11);
scene.add(camera_mirror);

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color('#000000'));
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMapEnabled = true;
// renderer.shadowMapCullFrontFaces = false;
// renderer.shadowMapType = THREE.PCFSoftShadowMap;
window.addEventListener('resize', onWindowResize, false);

// trackball controls
var trackballControls = new THREE.TrackballControls(camera);

// to show model when local load isn't allowed
THREE.ImageUtils.crossOrigin = "anonymous";

// mouse interaction
var projector = new THREE.Projector();
document.addEventListener('mousedown', onDocumentMouseDown, false);
var toIntersect = [];

// first person controls
var FPenabled = false;
var controls;
var objects = [];
var rayMove = new THREE.Raycaster();
rayMove.ray.direction.set(0, 0, -1);
var rayPointer = new THREE.Raycaster();