var camera,
    renderer,
    scene,
    domElement;

var width = window.innerWidth;
var height = window.innerHeight;
var rendererColor = 0xffffff;
var sceneUI;

var CAMERA_SETTING = {
    fov: 70,
    rate: width / height,
    near: 1,
    far: 1000,
    lookAt: new THREE.Vector3(),
    position: new THREE.Vector3(0, 20, 50)
}

initScene();
initCamera();
initRenderer();
sceneUI.addEditorControl();
sceneUI.addDefaultLight();
sceneUI.addSpotLight();
sceneUI.addCube();
sceneUI.addImageCube();
sceneUI.addLine();
sceneUI.addDashLine();
sceneUI.addColorLine();
render();

function initCamera() {
    camera = new THREE.PerspectiveCamera(CAMERA_SETTING.fov, CAMERA_SETTING.rate, CAMERA_SETTING.near, CAMERA_SETTING.far);
    camera.lookAt(CAMERA_SETTING.lookAt);
    camera.position.copy(CAMERA_SETTING.position);
}

function initScene() {
    scene = new THREE.Scene();
    sceneUI = new SceneUI({scene: scene});
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(new THREE.Color(rendererColor));
    renderer.setSize(width, height);

    domElement = document.getElementById('canvas');
    domElement.appendChild(renderer.domElement);
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

window.onresize = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
}
