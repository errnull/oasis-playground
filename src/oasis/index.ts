import { BlinnPhongMaterial, Camera, Color, DirectLight, MeshRenderer, PrimitiveMesh, Script, Vector3, WebGLEngine, TrailRenderer } from "oasis-engine";

class Moving extends Script {
	private _total = 0;
	pause = false;

	entity: any;
	private _totalTime: number = 0;

	onUpdate(deltaTime: number) {
		if (!this.pause) {
			this._total += deltaTime / 10;
			this.entity.transform.setRotation(
				this._total,
				this._total / 4,
				-this._total / 2
			);

			this._totalTime += deltaTime;
			const sinFactor = Math.sin(this._totalTime / 500);
			const positionFactor = Math.max(sinFactor, 0) * 3;
			this.entity.transform.setPosition(0, positionFactor, 0);
		}
	}
}

export function createOasis() {

	const engine = new WebGLEngine("canvas");
	engine.canvas.resizeByClientSize();

	const scene = engine.sceneManager.activeScene;
	const rootEntity = scene.createRootEntity("root");

	let cameraEntity = rootEntity.createChild("camera_entity");
	cameraEntity.transform.position = new Vector3(0, 5, 10);
	cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
	cameraEntity.addComponent(Camera);
	// scene.background.solidColor.setValue(0, 0, 0, 1);

	let lightEntity = rootEntity.createChild("light");

	let directLight = lightEntity.addComponent(DirectLight);
	directLight.color = new Color(1.0, 1.0, 1.0);
	directLight.intensity = 0.5;

	lightEntity.transform.rotation = new Vector3(45, 45, 45);

	let cubeEntity = rootEntity.createChild("cube");
	let cube = cubeEntity.addComponent(MeshRenderer);
	cube.mesh = PrimitiveMesh.createCuboid(engine, 0.6, 0.6, 0.6);
	cube.setMaterial(new BlinnPhongMaterial(engine));

	cubeEntity.addComponent(Moving);
	// cubeEntity.addComponent(TrailRenderer);

	engine.run();

}
