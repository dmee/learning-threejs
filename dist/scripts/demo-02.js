'use strict';

$(function () {
    var renderer,
        frameDom = document.getElementById('canvas-frame'),
        frameWidth = frameDom.clientWidth,
        frameHeight = frameDom.clientHeight;

    // 初始化渲染器
    function initRenderer() {
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(frameWidth, frameHeight);
        frameDom.appendChild(renderer.domElement);
        renderer.setClearColor(0xFFFFFF, 1);
    }
    // 初始化相机
    var camera;

    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, frameWidth / frameHeight, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 1000;
        camera.position.z = 0;
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
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
        var light = new THREE.DirectionalLight(0xFF0000, 1.0);
        light.position.set(100, 100, 100);
        scene.add(light);
    }

    // 初始化几何体
    function initGeometry() {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
        geometry.vertices.push(new THREE.Vector3(500, 0, 0));

        for (var i = 0; i <= 40; i++) {
            var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x000000,
                opacity: 0.2
            }));
            line.position.z = i * 25 - 500;
            scene.add(line);

            line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x000000,
                opacity: 0.2
            }));
            line.position.x = i * 25 - 500;
            line.rotation.y = 90 * Math.PI / 180;
            scene.add(line);
        }
    }

    // 绘制网格
    function renderGrid() {
        initRenderer();
        initCamera();
        initScene();
        initLight();
        initGeometry();
        renderer.clear();
        renderer.render(scene, camera);
    }
    renderGrid();
});