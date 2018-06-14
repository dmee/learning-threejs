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
        camera.position.z = 400;
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

    }

    // 初始化几何体
    function initGeometry() {}
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