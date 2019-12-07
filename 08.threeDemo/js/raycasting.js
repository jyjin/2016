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
    near = 50,
    far = 1000,
    cameraDep = 0,
    radius = 100,
    range = 400;

// cube
var cubeLength = 20,
    objectCounts = 300;

// sphere
var sphereRadius = 10,
    sphereWidthSegements = 40,
    sphereHeightSegments = 40;

var boxHelper = false;

var gridSize = 50,
    gridDivs = 100,
    gridColorCenterLine = 0x2d2d2d,
    gridColor = 0x444444;

init();
addStats();

addLight();
addBasicCube();
addLambertCube();
addLambertSphere();
addBoxHelper();

addRaycasterOptions();
addGrid();

animate();

// init scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    camera.lookAt(new THREE.Vector3());

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(new THREE.Color(backgroundColor));
    renderer.setSize(width, height);

    domElement = document.getElementById('test');
    domElement.appendChild(renderer.domElement);

}

function addGrid() {
    var gridHelper = new THREE.GridHelper(gridSize, gridDivs, gridColorCenterLine, gridColor);
    scene.add(gridHelper);
}

// add a directionalLight
function addLight() {
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);
}

// MeshBasicMaterial- a material doesn't have light
function addBasicCube() {
    var geometry = new THREE.BoxGeometry(20, 20, 20, 10, 10, 10);
    for (var i = 0; i < objectCounts; i++) {
        var cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            color: 0xffffff, //
            wireframe: true,
            wireframeLinejoin: 'bevel'
        }));
        cube.position.x = Math.random() * range * 2 - range; //-400~400
        cube.position.y = Math.random() * range * 2 - range;
        cube.position.z = Math.random() * range * 2 - range;

        cube.rotation.x = Math.random() * 2 * Math.PI; //0~2PI
        cube.rotation.y = Math.random() * 2 * Math.PI;
        cube.rotation.z = Math.random() * 2 * Math.PI;

        cube.scale.x = Math.random(); //0~1
        cube.scale.y = Math.random();
        cube.scale.z = Math.random();

        scene.add(cube);
    }
}

// MeshLambertMaterial - a material could have light
function addLambertCube() {
    var geometry = new THREE.BoxGeometry(cubeLength, cubeLength, cubeLength);
    for (var i = 0; i < objectCounts; i++) {
        var cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff
        }));

        cube.position.x = Math.random() * range * 2 - range; //-400~400
        cube.position.y = Math.random() * range * 2 - range;
        cube.position.z = Math.random() * range * 2 - range;

        cube.rotation.x = Math.random() * 2 * Math.PI; //0~2PI
        cube.rotation.y = Math.random() * 2 * Math.PI;
        cube.rotation.z = Math.random() * 2 * Math.PI;

        cube.scale.x = Math.random(); //0~1
        cube.scale.y = Math.random();
        cube.scale.z = Math.random();

        if (boxHelper) {
            var box = new THREE.BoxHelper(cube, 0xffff00);
            scene.add(box);
        }

        scene.add(cube);
    }
}

// add lambert sphere
function addLambertSphere() {
    var geometry = new THREE.SphereGeometry(sphereRadius, sphereWidthSegements, sphereHeightSegments);

    for (var i = 0; i < objectCounts; i++) {
        var sphere = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff
        }));

        sphere.position.x = Math.random() * range * 2 - range;
        sphere.position.y = Math.random() * range * 2 - range;
        sphere.position.z = Math.random() * range * 2 - range;

        scene.add(sphere);
    }
}

// required stats.min.js
function addStats() {
    stats = new Stats();
    domElement.appendChild(stats.dom);
}

function addBoxHelper() {
    var sphere = new THREE.SphereGeometry();
    var object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
    var box = new THREE.BoxHelper(object, 0xffff00);
    scene.add(box);
}

// add a raycaster
function addRaycasterOptions() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    domElement.addEventListener('mousemove', onMouseMove, false);
}

// update mouse object when mouseover
function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log('[' + mouse.x + ',' + mouse.y + ']')
    console.log('-------------------------------------')
}

// animate whole scene
function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

// update scene by render
function render() {
    // animate the scene
    theta += 0.1;
    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
    camera.updateMatrixWorld();

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // change target color if has intersects
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED)
                INTERSECTED.material.color.set(INTERSECTED.currentColor);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentColor = new THREE.Color(INTERSECTED.material.color);
            INTERSECTED.material.color.set(0xffffff);
            var box = new THREE.BoxHelper(INTERSECTED, 0xffff00);
            scene.add(box);
        }
    } else {
        // reset last intersects color if no intersects
        if (INTERSECTED)
            INTERSECTED.material.color.set(INTERSECTED.currentColor);
        INTERSECTED = null;
    }

    renderer.render(scene, camera);
}
