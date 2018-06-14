'use strict';

$(function () {
    var renderer,
        stats,
        frameDom = document.getElementById('canvas-frame'),
        frameWidth = frameDom.clientWidth,
        frameHeight = frameDom.clientHeight;

    // 初始化渲染器
    function initRenderer() {
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(frameWidth, frameHeight);
        frameDom.appendChild(renderer.domElement);
        renderer.setClearColor(0xffffff, 1);

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        frameDom.appendChild(stats.domElement);
    }
    // 初始化相机
    var camera;

    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, frameWidth / frameHeight, 1, 10000);
        camera.position.x = 2000;
        camera.position.y = 500;
        camera.position.z = 2000;
        camera.up.x = 0;
        camera.up.y = 1;
        camera.up.z = 0;
        camera.lookAt({
            x: 0,
            y: 0,
            z: 0
        });
    }

    // 初始化场景
    var scene;

    function initScene() {
        scene = new THREE.Scene();
    }
    // 初始化灯光
    function initLight() {
        /* var light = new THREE.AmbientLight(0x00ff00);
        light.position.set(100, 100, 50);
        scene.add(light); */

        var light = new THREE.DirectionalLight(0xff0000, 1);
        light.position.set(0, 0.5, 1);
        scene.add(light);
        var light = new THREE.PointLight(0x00ff00, 1, 50, 0);
        light.position.set(0, 0, 200);
        scene.add(light);
    }

    // 初始化几何体
    function initGeometry() {
        var geometry = new THREE.CubeGeometry(400, 200, 100, 10, 10, 10);
        var materia = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        var cube_1 = new THREE.Mesh(geometry, materia);
        cube_1.position.set(0, 0, 0);
        scene.add(cube_1);

        var cube_2 = new THREE.Mesh(geometry, materia);
        cube_2.position.set(-600, 0, 0);
        scene.add(cube_2);

        var cube_3 = new THREE.Mesh(geometry, materia);
        cube_3.position.set(600, 0, 0);
        scene.add(cube_3);

        var cube_4 = new THREE.Mesh(geometry, materia);
        cube_4.position.set(0, 0, -600);
        scene.add(cube_4);
        var cube_5 = new THREE.Mesh(geometry, materia);
        cube_5.position.set(0, -400, 0);
        scene.add(cube_5);
        var cube_5 = new THREE.Mesh(geometry, materia);
        cube_5.position.set(0, 400, 0);
        scene.add(cube_5);
    }
    // 动画
    function animation() {
        renderer.render(scene, camera);
        stats.update();
        requestAnimationFrame(animation);
    }

    // 绘制网格
    function renderGrid() {
        initRenderer();
        initCamera();
        initScene();
        initLight();
        initGeometry();
        animation();
    }

    renderGrid();
});