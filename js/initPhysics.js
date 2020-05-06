var world;

function initPhysics()
{
    world = new CANNON.World();
    world.quatNormalizeSkip = 0;
    world.quatNormalizeFast = false;

    world.gravity.set(0,-20,0);
    world.broadphase = new CANNON.NaiveBroadphase();
}

function updatePhysics()
{
    world.step(1 / 60);
    for(var i=0; i !== BricksPHY.length; i++){
        Bricks[i].position.copy(BricksPHY[i].position);
        Bricks[i].quaternion.copy(BricksPHY[i].quaternion);
    }
    hero.mesh.position.copy(heroPHY.position);
    
}