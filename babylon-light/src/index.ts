// import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, Mesh } from "babylonjs";
// import { Scene } from '@babylonjs/core/scene';
// import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
// import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
// import { GridMaterial } from "@babylonjs/materials/grid";

// // Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
// import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder"; // Unclear if this is supposed to be so

// Side-effects only imports allowing the standard material to be used as default.
import "@babylonjs/core/Materials/standardMaterial";
// Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
// import "@babylonjs/core/Meshes/Builders/sphereBuilder";
// import "@babylonjs/core/Meshes/Builders/boxBuilder";
// import "@babylonjs/core/Meshes/Builders/groundBuilder";



// import { GridMaterial } from "@babylonjs/materials/grid";

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);
function createScene(): Scene {
    var scene: Scene = new Scene(engine);
    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);


    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

     // This creates and positions a free camera (non-mesh)
    // var camera: FreeCamera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    // // This targets the camera to scene origin
    // camera.setTarget(Vector3.Zero());
    // // This attaches the camera to the canvas
    // camera.attachControl(canvas, true);


    var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    // var box: Mesh = MeshBuilder.CreateBox("box", { size: 1 }, scene);

    // Create a grid material
    // var material = new GridMaterial("grid", scene);
    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    // var sphere = Mesh.CreateSphere("sphere1", 16, 1, scene);
    var box = Mesh.CreateBox("box1", 1, scene);

    // Set a direction flag for the animation
    var direction = true;

    // Code in this function will run ~60 times per second
    scene.registerBeforeRender(function () {
        // Check if box is moving right
        if (box.position.x < 2 && direction) {
            // Increment box position to the right
            box.position.x += 0.05;
        }
        else {
            // Swap directions to move left
            direction = false;
        }

        // Check if box is moving left
        if (box.position.x > -2 && !direction) {
            // Decrement box position to the left
            box.position.x -= 0.05;
        }
        else {
            // Swap directions to move right
            direction = true;
        }
    });
    // Move the sphere upward 1/2 its height
    // sphere.position.y = 2;
    // Affect a material
    // sphere.material = material;
    return scene;
}
var scene: Scene = createScene();
engine.runRenderLoop(() => {
    scene.render();
});
