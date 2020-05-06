let scene, camera, fieldOfView, aspectRatio, 
    nearPlane, farPlane, gobalLight, shadowLight,
    renderer, container, controls,cameraOffset;

var canJump = false;
var velocity = new THREE.Vector3(), jumpVelocity = 60;
var contactNormal = new CANNON.Vec3(); 
var upAxis = new CANNON.Vec3(0, 1, 0);

let geometry,material,wireframe;

let Trees=[],    Animals=[],    Bricks=[],    hero,    Ground;
let TreesPHY=[], AnimalsPHY=[], BricksPHY=[], heroPHY, GroundPHY;

let keyboard = new THREEx.KeyboardState();
let clock = new THREE.Clock();


let PI = Math.PI;

window.addEventListener('load', init, false);
function init(event){
  initScreenAnd3D();
  createLights();
  initPhysics();
    
    createGround();

    for(var i=1; i<6; i++)
    createBricks(i*23,0,5);

    for(var i=6; i<10; i++)
    createBricks((i-4)*24+5,10,5);

    createHero(-5,15,0);
    loop();
}


function loop(){
    let mov=1;
    let ang=0.01;
    updatePhysics();
    hero.idle();
    
    if ( keyboard.pressed("space"))
    { HeroMov("space", mov);}

    if ( keyboard.pressed("up"))
    {hero.run();hero.run(); HeroMov("up", mov);}

    if ( keyboard.pressed("down"))
    {hero.run();hero.run(); HeroMov("down", mov);}

    if ( keyboard.pressed("left"))
    {hero.run(); HeroMov("left", mov);}

    if ( keyboard.pressed("right"))
    {hero.run(); HeroMov("right", mov);}

    if ( keyboard.pressed("Q"))
    {hero.run(); HeroMov("Q", ang);}

    if ( keyboard.pressed("E"))
    {hero.run(); HeroMov("E", ang);}

    let relativeCameraOffset = new THREE.Vector3(0,200,250);
    cameraOffset = relativeCameraOffset.applyMatrix4( hero.mesh.matrixWorld );
    camera.position.x=cameraOffset.x;
    camera.position.y=cameraOffset.y;
    camera.position.z=cameraOffset.z;
	camera.lookAt( hero.mesh.position );
    
  document.getElementById("text").innerHTML = String(countFPS())+" FPS";
  render();  
  requestAnimationFrame(loop);


}

function render(){
    renderer.render(scene, camera);
  }



  





