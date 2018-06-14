$(function () {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var render = new THREE.WebGLRenderer();
    render.setSize(window.innerWidth, window.innerHeight, false);
    $('body').append(render.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var materia = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    var cube = new THREE.Mesh(geometry, materia);
    scene.add(cube);

    var light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);

    camera.position.z = 5;


    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.y += 0.05;
        render.render(scene, camera);
    }
    requestAnimationFrame(animate);
});