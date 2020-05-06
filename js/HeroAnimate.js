  Hero.prototype.run = function(){
    var s = .03;
    var t = this.runningCycle;
    t*= 2;
    t%= (2*PI);
    var amp = 4;
    
    this.legR.rotation.z = 0;
    this.legR.position.y = 0;
    this.legR.position.x = 0;
    this.legL.rotation.z = 0;
    this.legL.position.y = 0;
    this.legL.position.x = 0;
    
    
    this.runningCycle += s;
    this.legR.position.x =  Math.cos(t) * amp;
    this.legR.position.y = - Math.sin(t) * amp; 
   
    this.legL.position.x =  Math.cos(t + PI) * amp;
    this.legL.position.y = - Math.sin(t + PI) * amp;
   
    this.legL.position.y = Math.max (0, this.legL.position.y);
    this.legR.position.y = Math.max (0, this.legR.position.y); 
  
    if (t>PI)
    {
      this.legR.rotation.z = Math.cos(t * 2 + PI/2) * PI/4; 
      this.legL.rotation.z = 0; 
    } else
    {
      this.legR.rotation.z = 0; 
      this.legL.rotation.z = Math.cos(t * 2 + PI/2) *  PI/4;  
    }
    
}

  Hero.prototype.idle = function(){
    var s = .03;
    var t = this.runningCycle;
    this.runningCycle += s;
    t*= 2;
    t%= (2*PI);
    var amp = 4;
    
    this.legR.rotation.z = 0;
    this.legR.position.y = 0;
    this.legR.position.x = 0;
    this.legL.rotation.z = 0;
    this.legL.position.y = 0;
    this.legL.position.x = 0;
    
    this.torso.position.y = 8 - Math.cos(  t * 2 ) * amp * .2;
    this.head.position.y = 25 - Math.cos(  t * 2 ) * amp * .3;

    this.torso.rotation.y = -Math.cos( t + PI ) * amp * .05;
  
    this.head.rotation.x = Math.cos( t ) * amp * .02;
    this.head.rotation.y =  Math.cos( t ) * amp * .01;
       
  }


  function HeroMov(dir, r)
  {
      let rotY=hero.mesh.rotation.y;
      switch(dir)
{
 case "up"  :       heroPHY.velocity=new CANNON.Vec3(
                    -r*10*Math.sin( rotY),
                    heroPHY.velocity.y-=0.01,
                    -r*10*Math.cos( rotY));
                    break;
case "down" :       heroPHY.velocity=new CANNON.Vec3(
                    r*10* Math.sin( rotY),
                    heroPHY.velocity.y-=0.01,
                    r*10* Math.cos( rotY));
                    break;
case "left" :       heroPHY.velocity=new CANNON.Vec3(
                    -r*10* Math.cos(rotY),
                    heroPHY.velocity.y-=0.01,
                    r*10* Math.sin(rotY));
                    break;
case "right" :      heroPHY.velocity=new CANNON.Vec3(
                    r*10* Math.cos(rotY),
                    heroPHY.velocity.y-=0.01,
                    -r*10* Math.sin(rotY));
                    break;
case "space" :       if (canJump === true) 
                    heroPHY.velocity.y = jumpVelocity;
                    canJump = false;
                    break;
case "Q"     :      hero.mesh.rotation.y+=r;
                    heroPHY.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), hero.mesh.rotation.y);
                    break;
case "E"     :      hero.mesh.rotation.y-=r;
                    heroPHY.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), hero.mesh.rotation.y);
                    break;

}
updatePhysics();
}

