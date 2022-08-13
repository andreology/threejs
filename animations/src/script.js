import './style.css'
import * as THREE from 'three'
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';

//debug tool 
const gui = new dat.GUI();
const params = {
    color: 0xffff00,
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + 10})
    }
}
//Cursor 
const cursor = {
    x: 0, 
    y: 0
};
window.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = -(e.clientY / sizes.height - 0.5);
    //console.log("cursor x ", cursor.y)
});

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);

for(let i =0; i < count * 3 * 3; i++){
    positionsArray[i] = (Math.random() -.5) * 3;
};

const positions = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positions);
// const positionsArray = new Float32Array([
//     0, 0, 0, 
//     0, 1, 0,
//     1, 0, 0
// ]);
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', positionsAttribute);
//1st vertex
// positionsArray[0] = 0;
// positionsArray[1] = 0;
// positionsArray[2] = 0;
//2nd vertext
// positionsArray[3] = 0;
// positionsArray[4] = 1;
// positionsArray[5] = 0;
//3rd vertex
// positionsArray[6] = 1;
// positionsArray[7] = 0;
// positionsArray[8] = 0;

const material = new THREE.MeshBasicMaterial({ color: 0xff0000,
                wireframe: true
             })
const mesh = new THREE.Mesh(geometry, material)
gui.add(mesh.position, 'y', -3, 3, 0.01);
gui.add(mesh.position, 'x', -3, 3, 0.01);
gui.add(mesh.position, 'z', -3, 3, 0.01);
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
gui.addColor(params, 'color');
gui.add(params, 'spin');

console.log("color ", material.color)

scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener("resize", () => {
    console.log("window resized")
    //update window sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera 
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});
window.addEventListener("dblclick", () => {
    console.log("dbl click ")
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if(!fullScreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen();
        }else if(canvas.webkitFullscreenElement) {
            canvas.webkitRequestFullscreen();
        }
        
    }else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }else if(document.webkitExitFullscreen) {
            document.exitFullscreen();
        }
        
    }
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
//Controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update()
// const aspectRatio = sizes.width  / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1* aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3;
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);


//Clock 
//const clock = new THREE.Clock();
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2})
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0})
//animation 
const tick = () => {
    //Time 
    //using THREE Clock class
    //const elapsedTime = clock.getElapsedTime();
    //Update Objects 
    // camera.position.y = Math.sin(elapsedTime) ;
    // camera.position.x= Math.cos(elapsedTime) ;
    // camera.lookAt(mesh.position)

    //update camera 
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;

    // camera.lookAt(mesh.position)
    //Update controls
    controls.update();

    //rederer 
    renderer.render(scene, camera)


    window.requestAnimationFrame(tick);
}

tick();