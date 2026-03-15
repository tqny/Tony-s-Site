// GLOBE ANIMATION - Spinning dot-matrix globe for Strange Atlas hero
// Uses Three.js r128 (same CDN as wave.js)

function initGlobeAnimation(config) {
  var container = document.getElementById(config.containerId);
  if (!container || typeof THREE === 'undefined') return;

  var scene = new THREE.Scene();

  var w = container.offsetWidth;
  var h = container.offsetHeight;

  var camera = new THREE.PerspectiveCamera(45, w / h, 1, 5000);
  camera.position.set(0, 0, config.cameraZ || 600);

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.inset = '0';
  renderer.domElement.style.zIndex = '0';
  container.appendChild(renderer.domElement);

  // Generate points on a sphere using fibonacci distribution
  var POINT_COUNT = config.pointCount || 4000;
  var RADIUS = config.radius || 180;
  var positions = [];
  var colors = [];
  var sizes = [];

  var goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (var i = 0; i < POINT_COUNT; i++) {
    var theta = 2 * Math.PI * i / goldenRatio;
    var phi = Math.acos(1 - 2 * (i + 0.5) / POINT_COUNT);

    var x = RADIUS * Math.cos(theta) * Math.sin(phi);
    var y = RADIUS * Math.sin(theta) * Math.sin(phi);
    var z = RADIUS * Math.cos(phi);

    positions.push(x, y, z);

    // Bright white-ish dots with slight variation
    var brightness = 0.7 + Math.random() * 0.3;
    colors.push(brightness, brightness, brightness);

    sizes.push(1.5 + Math.random() * 1.5);
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  var material = new THREE.PointsMaterial({
    size: config.dotSize || 2.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  });

  var globe = new THREE.Points(geometry, material);

  // Tilt the globe slightly for visual interest
  globe.rotation.x = 0.3;
  globe.rotation.z = 0.1;

  scene.add(globe);

  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += config.rotationSpeed || 0.002;
    renderer.render(scene, camera);
  }

  function handleResize() {
    var w2 = container.offsetWidth;
    var h2 = container.offsetHeight;
    camera.aspect = w2 / h2;
    camera.updateProjectionMatrix();
    renderer.setSize(w2, h2);
  }

  window.addEventListener('resize', handleResize);
  animate();
}
