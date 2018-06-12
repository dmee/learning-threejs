'use strict';

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
    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        render.render(scene, camera);
    }
    requestAnimationFrame(animate);
});