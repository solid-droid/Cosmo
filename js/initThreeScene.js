function initScreenAnd3D() {
    container = document.getElementById('world');
    HEIGHT = container.offsetHeight;
    WIDTH = container.width;
    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;
  
    scene = new THREE.Scene();
    
    scene.fog = new THREE.Fog(0xd6eae6, 300,600);
    
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 50;
    nearPlane = 1;
    farPlane = 2000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    camera.position.x = 0;
    camera.position.z = 300;
    camera.position.y = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
    renderer.shadowMap.enabled = true;
  
    container.appendChild(renderer.domElement);
  
    window.addEventListener('resize', handleWindowResize, false);
  
    handleWindowResize();
  }
  
  function handleWindowResize() {
    HEIGHT = container.offsetHeight;
    WIDTH = container.offsetWidth;
    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  }

  function createLights() {
    globalLight = new THREE.AmbientLight(0xffffff, 1);
    shadowLight = new THREE.DirectionalLight(0xffffff, 0.3);
    shadowLight.position.set(100, 100, -100);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;
    scene.add(globalLight);
    scene.add(shadowLight);
   // var helper = new THREE.CameraHelper( shadowLight.shadow.camera );
   // scene.add( helper );
  }


  window.countFPS = (function () {
    var lastLoop = (new Date()).getMilliseconds();
    var count = 1;
    var fps = 0;
  
    return function () {
      var currentLoop = (new Date()).getMilliseconds();
      if (lastLoop > currentLoop) {
        fps = count;
        count = 1;
      } else {
        count += 1;
      }
      lastLoop = currentLoop;
      return fps;
    };
  }());