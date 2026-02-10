// Gond Particle Wave Animation
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if (!container) return; // Exit if container doesn't exist

    const scene = new THREE.Scene();

    // Fog for depth
    scene.fog = new THREE.FogExp2(0x1a1a1a, 0.002);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 4000;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        // Spread particles in a wide area
        posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material - Light Red/Amber characteristic of Gond art
    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xfca5a5,
        transparent: true,
        opacity: 0.8,
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Add stars/background noise
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        starPos[i] = (Math.random() - 0.5) * 40;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.015, color: 0xffffff, transparent: true, opacity: 0.4 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);


    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Gentle rotation
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = mouseY * 0.5;

        // Wave effect simulation
        particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.2;

        // Stars rotation
        stars.rotation.y = elapsedTime * 0.02;

        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Auto-initialize if DOM is ready, or wait for it
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
    initThreeJS();
}
