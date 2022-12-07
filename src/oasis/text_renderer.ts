import { OrbitControl } from "@oasis-engine/controls";
import {
  Camera,
  Color,
  Font,
  FontStyle,
  TextRenderer,
  Vector3,
  WebGLEngine,
} from "oasis-engine";

export function createTextRenderer() {
  // Create engine object2
  const engine = new WebGLEngine("canvas");
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();

  // Create camera
  const cameraEntity = rootEntity.createChild("camera_entity");
  cameraEntity.transform.setPosition(0, 0, 10);
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(OrbitControl);

  const text = "Oasis 文字系统来啦～";

  createText();
  engine.run();

  function createText(
    fontFamily: string = "Arial",
    fontSize: number = 40,
    bold: boolean = false,
    italic: boolean = false
  ): void {
    const entity = rootEntity.createChild("text");
    const renderer = entity.addComponent(TextRenderer);

    renderer.text = text;
    renderer.font = Font.createFromOS(entity.engine, fontFamily);

    renderer.enableWrapping = true;
    renderer.width = 100;
    renderer.height = 100;

    renderer.fontSize = fontSize;
    bold && (renderer.fontStyle |= FontStyle.Bold);
    italic && (renderer.fontStyle |= FontStyle.Italic);
  }
}
