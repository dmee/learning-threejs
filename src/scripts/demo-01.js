function render() {
    var frameWrap = document.getElementById('canvas-frame'),
        frameWidth = frameWrap.clientWidth,
        frameHeight = frameWrap.clientHeight,
        renderer = new THREE.WebGLRenderer({
            antialias: true
        }),
        camera = new THREE.PerspectiveCamera(45, frameWidth / frameHeight, 1, 10000);

    renderer.setSize(frameWidth, frameHeight);
    frameWrap.appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);

    // init camera
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

    // init scene
    var scene = new THREE.Scene();


    // init light
    var light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);

    // init geometry
    var geometry = new THREE.Geometry(),
        material = new THREE.LineBasicMaterial({
            vertexColors: true
        }),
        p1 = new THREE.Vector3(-100, 0, 100),
        p2 = new THREE.Vector3(100, 0, -100),
        color_start = new THREE.Color(0x444444),
        color_end = new THREE.Color(0xFF0000);
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push(color_start, color_end);
    var line = new THREE.Line(geometry, material, THREE.LineSegments);
    scene.add(line);

    renderer.clear();
    renderer.render(scene, camera);
}
document.body.onload = function () {
    render();
};