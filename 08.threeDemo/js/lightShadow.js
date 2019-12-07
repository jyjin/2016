// scene
var camera,
    scene,
    renderer,
    domElement,
    backgroundColor = 0x000000,
    stats;

// raycaster
var raycaster,
    mouse,
    theta = 0,
    INTERSECTED;

// camera
var width = window.innerWidth,
    height = window.innerHeight,
    fov = 45,
    near = 1,
    far = 1000,
    cameraDep = 0,
    radius = 100,
    range = 400;

var gridSize = 100,
    gridDivs = 100,
    gridColorCenterLine = 0x2d2d2d,
    gridColor = 0x444444;

var lightHelper,
    spotLight;

var gui,
    guiElements,
    param = {
        color: '0xffffff'
    };

init();
addEditorControl();
addAmbientLight();
// addDirectionalLight();
// addPointLight();
addSpotLight();
addCube();
addPlane();
addLine();
// addGrid();
render();
resize();
buildGui();

// init scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    camera.lookAt(new THREE.Vector3());
    camera.position.set(0, 10, 100);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(new THREE.Color(backgroundColor));
    renderer.setSize(width, height);
    renderer.shadowMapEnabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    domElement = document.getElementById('canvas');
    domElement.appendChild(renderer.domElement);
}

function addEditorControl() {
    var editorControl = new THREE.EditorControls(camera, renderer.domElement);
    scene.add(editorControl);
}

function addGrid() {
    var gridHelper = new THREE.GridHelper(gridSize, gridDivs, gridColorCenterLine, gridColor);
    scene.add(gridHelper);
}

function addLine() {
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(-50, 0, 0));
    geo.vertices.push(new THREE.Vector3(0, 50, 0));
    geo.vertices.push(new THREE.Vector3(50, 0, 0));
    var mat = new THREE.LineBasicMaterial({color: 0xffffff});
    var line = new THREE.Line(geo, mat);
    scene.add(line);
}

function addPlane() {
    var geo = new THREE.PlaneGeometry(100, 50, 32, 32);
    var mat = new THREE.MeshPhongMaterial({color: 0xeeeeee, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(geo, mat);
    // plane.rotation.rotation.y = THREE.Math.degToRad(90);
    plane.rotateX(THREE.Math.degToRad(90));
    // plane.position.z = 10;
    plane.receiveShadow = true;
    scene.add(plane);
}

function addCube() {
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshPhongMaterial({color: 0xffffff});
    var cube = new THREE.Mesh(geometry, material);
    cube.position.y = 5;
    // cube.position.x = -10;
    cube.castShadow = true;
    // cube.rotateY(THREE.Math.degToRad(45));
    scene.add(cube);
}

function addAmbientLight() {
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
}

// add a directionalLight
function addDirectionalLight() {
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(-200, 200, 200);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
}

function addPointLight() {
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(200, 200, 200);
    light.castShadow = true;
    scene.add(light);
}

function addSpotLight() {
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 20, 20);

    spotLight.castShadow = true;

    spotLight.penumbra = 0.05;
    spotLight.decay = 2;
    spotLight.distance = 200;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 20;
    spotLight.shadow.camera.far = 20;
    spotLight.shadow.camera.fov = 0;

    spotLight.angle = Math.PI / 4;

    scene.add(spotLight);

    lightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(lightHelper);
}

function addExtrudeGeometry() {
    var length = 12,
        width = 8;

    var shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    var extrudeSettings = {
        steps: 2,
        amount: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
    };

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var material = new THREE.MeshPhongMaterial({color: 0x00ff00});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

// update scene by render
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function resize() {
    window.onresize = function() {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
    }
}

// gui options

function clearGui() {

    if (gui)
        gui.destroy();

    gui = new dat.GUI();

    gui.open();

}

function buildGui() {

    clearGui();

    addGui('light color', spotLight.color.getHex(), function(val) {

        spotLight.color.setHex(val);
        render();

    }, true);

    addGui('intensity', spotLight.intensity, function(val) {

        spotLight.intensity = val;
        render();

    }, false, 0, 2);

    addGui('distance', spotLight.distance, function(val) {

        spotLight.distance = val;
        render();

    }, false, 0, 200);

    addGui('angle', spotLight.angle, function(val) {

        spotLight.angle = val;
        render();

    }, false, 0, Math.PI / 3);

    addGui('penumbra', spotLight.penumbra, function(val) {

        spotLight.penumbra = val;
        render();

    }, false, 0, 1);

    addGui('decay', spotLight.decay, function(val) {

        spotLight.decay = val;
        render();

    }, false, 1, 2);

}

function addGui(name, value, callback, isColor, min, max) {

    var node;
    param[name] = value;

    if (isColor) {

        node = gui.addColor(param, name).onChange(function() {

            callback(param[name]);

        });

    } else if (typeof value == 'object') {

        node = gui.add(param, name, value).onChange(function() {

            callback(param[name]);

        });

    } else {

        node = gui.add(param, name, min, max).onChange(function() {

            callback(param[name]);

        });

    }

    return node;

}
