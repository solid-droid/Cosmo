function createGround()
{
    let _groundShape;
   
    geomety = new THREE.PlaneGeometry( 500, 500,32,32);
    material = new THREE.MeshPhongMaterial( {color: '#ff9000', side: THREE.DoubleSide} );
    Ground = new THREE.Mesh( geomety, material);
    Ground.position.set(0,-5,0);
    Ground.rotation.x=-PI/2;
    Ground.receiveShadow = true;
    scene.add( Ground );

   
    _groundShape = new CANNON.Plane();
    GroundPHY = new CANNON.Body({ mass: 0 });
    GroundPHY.addShape(_groundShape);
    GroundPHY.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-PI/2);
    GroundPHY.position.set(0,-5,0);
    world.addBody(GroundPHY);
}

function createBricks(x,y,z,edge=true)
{
    let _brick,_boxShape;
    material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
    
    geometry= new THREE.CubeGeometry(20,10,10,1);//
    _brick = new THREE.Mesh(geometry, blueMat);
    _brick.position.set(x,y,z);
    _brick.castShadow = true;
    _brick.receiveShadow = true;
    scene.add(_brick);
   if(edge==true)
   {  
        geometry=new THREE.EdgesGeometry(geometry);
        wireframe = new THREE.LineSegments( geometry, material  );
        wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
        _brick.add( wireframe );
    }
    Bricks.push(_brick);

    _boxShape = new CANNON.Box(new CANNON.Vec3(10,5,5));
    _brick = new CANNON.Body({ mass: 5 });
    _brick.addShape(_boxShape);
    _brick.position.set(x,y,z);
    world.addBody(_brick);
    BricksPHY.push(_brick);
 

}

function createHero(x,y,z)
{
    hero = new Hero();
    hero.body.rotation.y=1.5;  
    scene.add(hero.mesh);

    heroPHY = new CANNON.Body({ mass: 20,linearDamping:0.8  });
    heroPHY.addShape( new CANNON.Sphere(4));
    heroPHY.position.set(x,y,z);
    //heroPHY.initQuaternion.set(0,0,0,1);
    world.addBody(heroPHY);
      
  heroPHY.addEventListener("collide", function (e) {
    var contact = e.contact;

    if (contact.bi.id == heroPHY.id) {
      contact.ni.negate(contactNormal);
    } 
    else {
      contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is
    }

    if (contactNormal.dot(upAxis) > 0.5) 
    canJump = true;
    
  });

}

Hero = function() {
    this.runningCycle = 0;
    this.mesh = new THREE.Group();
    this.body = new THREE.Group();
    this.mesh.add(this.body);
    
    var torsoGeom = new THREE.CubeGeometry(8,8,8, 1);//
    this.torso = new THREE.Mesh(torsoGeom, blueMat);
    this.torso.position.y = 15;
    this.torso.castShadow = true;
    this.body.add(this.torso);
    
    var headGeom = new THREE.CubeGeometry(16,16,16, 1);//
    this.head = new THREE.Mesh(headGeom, blueMat);
    this.head.position.y = 28;
    this.head.castShadow = true;
    this.body.add(this.head);
    
    var legGeom = new THREE.CubeGeometry(8,3,5, 1);
    
    this.legR = new THREE.Mesh(legGeom, brownMat);
    this.legR.position.x = 0;
    this.legR.position.z = 7;
    this.legR.position.y = 0;
    this.legR.castShadow = true;
    this.body.add(this.legR);
    
    this.legL = this.legR.clone();
    this.legL.position.z = - this.legR.position.z;
    this.legL.castShadow = true;
    this.body.add(this.legL);
  }