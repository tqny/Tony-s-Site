// ============================================
// WAVE ANIMATION - Shared Three.js dotted surface
// Used on: index.html (hero), project-site.html (project header)
// Params must stay synced - see AGENTS.md
// ============================================

function initWaveAnimation(config) {
  var container = document.getElementById(config.containerId);
  if (!container || typeof THREE === 'undefined') return;

  var SEPARATION = 150;
  var AMOUNTX = 40;
  var AMOUNTY = 60;

  // Scene
  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0a, 2000, 10000);

  // Dimensions
  var w = config.useWindow ? window.innerWidth : container.offsetWidth;
  var h = config.useWindow ? window.innerHeight : container.offsetHeight;

  // Camera
  var camera = new THREE.PerspectiveCamera(60, w / h, 1, 10000);
  camera.position.set(config.cameraX, config.cameraY, config.cameraZ);
  if (config.cameraLookAt) {
    camera.lookAt(config.cameraLookAt.x, config.cameraLookAt.y, config.cameraLookAt.z);
  }

  // Renderer
  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h);
  renderer.setClearColor(0x000000, 0);

  if (!config.useWindow) {
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.zIndex = '0';
  }

  container.appendChild(renderer.domElement);

  // Particles
  var positions = [];
  var colors = [];
  var geometry = new THREE.BufferGeometry();

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      var x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
      var y = 0;
      var z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
      positions.push(x, y, z);
      colors.push(0.78, 0.78, 0.78);
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  var material = new THREE.PointsMaterial({
    size: 8,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  var points = new THREE.Points(geometry, material);
  scene.add(points);

  var count = 0;

  function animate() {
    requestAnimationFrame(animate);

    var posAttr = geometry.attributes.position;
    var arr = posAttr.array;
    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        var idx = i * 3;
        arr[idx + 1] =
          Math.sin((ix + count) * 0.3) * 50 +
          Math.sin((iy + count) * 0.5) * 50;
        i++;
      }
    }
    posAttr.needsUpdate = true;
    renderer.render(scene, camera);
    count += 0.03;
  }

  function handleResize() {
    var w2 = config.useWindow ? window.innerWidth : container.offsetWidth;
    var h2 = config.useWindow ? window.innerHeight : container.offsetHeight;
    camera.aspect = w2 / h2;
    camera.updateProjectionMatrix();
    renderer.setSize(w2, h2);
  }

  window.addEventListener('resize', handleResize);
  animate();
}
