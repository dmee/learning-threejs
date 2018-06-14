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
        renderer.setClearColor(0x000000, 1);


        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        frameDom.appendChild(stats.domElement);
    }
    // 初始化相机
    var camera;

    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, frameWidth / frameHeight, 0.1, 2000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1000;
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
        var light = new THREE.AmbientLight(0xFF0000);
        light.position.set(100, 100, 200);
        // scene.add(light);

        light = new THREE.PointLight(0x00FF00, 1, 50, Math.PI / 3);
        light.position.set(0, 0, 300);
        // scene.add(light);

        light = new THREE.SpotLight(0xFFFFFF, 1);
        light.position.set(-3000, 3000, 0);
        scene.add(light);
    }

    // 初始化几何体
    var cube;

    function initGeometry() {
        var geometry = new THREE.CylinderGeometry(100, 150, 400);
        var material = new THREE.MeshLambertMaterial({
            color: 0x3089dc
        });
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        scene.add(cube);
    }

    function initTween() {
        new TWEEN.Tween(cube.position) // Create a new tween that modifies 'coords'.
            .to({
                x: 300,
                y: 200,
                z: -2000
            }, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .repeat(Infinity)
            .start(); // Start the tween immediately.
    }
    // 动画
    function animation() {
        renderer.render(scene, camera);
        stats.update();
        TWEEN.update();
        // requestAnimationFrame(animation);
    }

    // 绘制网格
    function renderGrid() {
        initRenderer();
        initCamera();
        initScene();
        initLight();
        initGeometry();
        initTween();
        animation();
    }

    renderGrid();
});