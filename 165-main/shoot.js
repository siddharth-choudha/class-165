AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });
        
        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera-rig");
        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y + 1,
          z: pos.z - 0.5,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        var scene = document.querySelector("#scene");

        //set the bullet as the dynamic entity
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "50",
        });

        //add the collide event listener to the bullet
        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        //shooting sound
        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    var  scene=document.querySelector("#scene")
    var element=e.detail.target.e1
    var element1=e.detail.body.e1
    if(element1.id.includes("#enemy")){
      var counttank=document.querySelector("#countTank")
      var tanksfired=parseInt(counttank.getAttribute("text").value)
      tanksfired-=1
      counttank.setAttribute("text",{value:tanksfired})

    if(tamksfired===0){
      var tst=document.querySelector("#completed")
      tst.setAttribute("visible",true)
    }
      scene.removeChild(elementHit);
    }
    //remove event listener
    element.removeEventListener("collide", this.removeBullet);

    //remove the bullets from the scene   
    scene.removeChild(element);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});

