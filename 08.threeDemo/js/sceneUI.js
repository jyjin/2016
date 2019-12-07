function SceneUI(options) {

    var GRID_SETTINGS = {
        gridSize: 100,
        gridDivs: 100,
        gridColorCenterLine: 0x2d2d2d,
        gridColor: 0x444444
    }

    if (options == undefined) {
        console.warn('Required pass a parameter');
        return;
    }

    if (options.scene == undefined) {
        console.warn('Scene parameter is not defined');
        return;
    }

    var scene = options.scene || {};

    var method = {}

    // 摄像头控制工具
    method.addEditorControl = function() {
        var editorControl = new THREE.EditorControls(camera, renderer.domElement);
    }

    method.addCube = function() {
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        var material = new THREE.MeshPhongMaterial({color: 0xffffff});
        var cube = new THREE.Mesh(geometry, material);
        // cube.position.y = 5;
        // cube.position.x = -10;
        // cube.castShadow = true; // 是否生成阴影
        // cube.rotateY(THREE.Math.degToRad(45));
        scene.add(cube);
    }

    method.addDefaultLight = function() {
        var light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);
    }

    // 环境光
    method.addDirectionalLight = function() {
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(-200, 200, 200);
        // directionalLight.castShadow = true; // 是否生成阴影
        scene.add(directionalLight);
    }

    // 点光源 照明弹
    method.addPointLight = function() {
        var light = new THREE.PointLight(0xffffff, 1, 1000);
        light.position.set(200, 200, 200);
        // light.castShadow = true; // 是否生成阴影
        scene.add(light);
    }

    // 聚光灯光源
    method.addSpotLight = function() {
        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-20, 20, 20);

        // spotLight.castShadow = true;

        // spotLight.penumbra = 0.05;
        // spotLight.decay = 2;
        // spotLight.distance = 200;

        // spotLight.shadow.mapSize.width = 1024;
        // spotLight.shadow.mapSize.height = 1024;
        //
        // spotLight.shadow.camera.near = 20;
        // spotLight.shadow.camera.far = 20;
        // spotLight.shadow.camera.fov = 0;

        // spotLight.angle = Math.PI / 4;

        scene.add(spotLight);
    }

    // 聚光灯光源 含辅助线条
    method.addSpotLightWithHelper = function() {
        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-20, 20, 20);

        // spotLight.castShadow = true;

        // spotLight.penumbra = 0.05;
        // spotLight.decay = 2;
        // spotLight.distance = 200;

        // spotLight.shadow.mapSize.width = 1024;
        // spotLight.shadow.mapSize.height = 1024;
        //
        // spotLight.shadow.camera.near = 20;
        // spotLight.shadow.camera.far = 20;
        // spotLight.shadow.camera.fov = 0;

        // spotLight.angle = Math.PI / 4;

        scene.add(spotLight);

        lightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(lightHelper);
    }

    // 添加平面
    method.addPlane = function() {
        var geo = new THREE.PlaneGeometry(100, 50, 32, 32);
        var mat = new THREE.MeshPhongMaterial({color: 0xeeeeee, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(geo, mat);
        // plane.rotation.rotation.y = THREE.Math.degToRad(90);
        plane.rotateX(THREE.Math.degToRad(90));
        // plane.position.z = 10;
        plane.receiveShadow = true;
        scene.add(plane);
    }

    // 实线
    method.addLine = function() {
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(-50, 0, 0));
        geo.vertices.push(new THREE.Vector3(0, 50, 0));
        geo.vertices.push(new THREE.Vector3(50, 0, 0));
        var mat = new THREE.LineBasicMaterial({color: 0xff0000}); // 实线材质
        var line = new THREE.Line(geo, mat);
        scene.add(line);
    }

    // 虚线
    method.addDashLine = function() {
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(0, 0, 0));
        geo.vertices.push(new THREE.Vector3(0, 50, 0));
        geo.computeLineDistances(); // 必须重新计算 否则还为实线
        var mat = new THREE.LineDashedMaterial({ // 虚线材质
            color: 0x20ead4, //
            dashSize: 1, // 单位实线长度
            gapSize: 1 // 单位实线间隔长度
        });
        var line = new THREE.Line(geo, mat);
        scene.add(line);

        // another line
        var geo1 = new THREE.Geometry();
        geo1.vertices.push(new THREE.Vector3(-50, 0, 0));
        geo1.vertices.push(new THREE.Vector3(50, 0, 0));
        geo1.computeLineDistances(); // 必须重新计算 否则还为实线
        var line1 = new THREE.Line(geo1, mat);
        scene.add(line1);
    }

    method.addColorLine = function() {
        var geo = new THREE.Geometry();

        geo.vertices.push(new THREE.Vector3(50, 0, 0));
        geo.vertices.push(new THREE.Vector3(0, 0, 50));

        geo.colors.push(new THREE.Color(0x00a0e9));
        geo.colors.push(new THREE.Color(0x00ffff));

        var mat = new THREE.LineBasicMaterial({
            vertexColors: true // 必须设置 端点颜色 否则不渐变
        });
        var line = new THREE.Line(geo, mat);
        scene.add(line);

        // another
        var geo1 = new THREE.Geometry();
        geo1.vertices.push(new THREE.Vector3(-50, 0, 0));
        geo1.vertices.push(new THREE.Vector3(0, 0, 50));
        geo1.colors.push(new THREE.Color(0x00a0e9));
        geo1.colors.push(new THREE.Color(0xffff00));
        var line1 = new THREE.Line(geo1, mat);
        scene.add(line1);
    }

    // 网格帮助
    method.addGrid = function(param) {
        var param = Object.assign({}, GRID_SETTINGS, param);
        var gridHelper = new THREE.GridHelper(param.gridSize, param.gridDivs, param.gridColorCenterLine, param.gridColor);
        scene.add(gridHelper);
    }

    method.addImageCube = function() {
        var loader = new THREE.ImageLoader();
        var url0 = 'http://staticfile-cdn.sightp.com/sightp/page5-bg1.jpg';
        var url1 = 'http://staticfile-cdn.sightp.com/sightp/page5-bg2.jpg';
        var url2 = 'http://staticfile-cdn.sightp.com/sightp/page5-bg3.jpg';
        var map = [];
        loader.load(url0, function(texture) {
            map.push(texture);
            loader.load(url1, function(texture) {
                map.push(texture);
                var mat = new THREE.MeshFaceMaterial(map);
                var geo = new THREE.BoxGeometry(10, 10, 10);
                var cube = new THREE.Mesh(geo, mat);
                cube.position.set(0, 20, 0);
                scene.add(cube);
            })

        })
    }

    for (var i in method) {
        this[i] = method[i];
    }
}
