// import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, Mesh } from "babylonjs";
// import { Scene } from '@babylonjs/core/scene';
// import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
// import { GridMaterial } from "@babylonjs/materials/grid";
// // Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
// import "@babylonjs/core/Meshes/meshBuilder";
// import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder"; // Unclear if this is supposed to be so



var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);
function createScene(): Scene {
    var scene: Scene = new Scene(engine);
    // var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    // camera.attachControl(canvas, true);
    // var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    // var box: Mesh = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    return scene;
}
var scene: Scene = createScene();
engine.runRenderLoop(() => {
    scene.render();
});
