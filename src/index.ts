import { ClickCreatingTool, Diagram, Model, Part, Point, ToolManager, TreeLayout, TreeModel } from "gojs";
import LinkTemplate from "./templates/link.template";
import NodeTemplate from "./templates/node.template";
import SaveJson, { SaveSVG } from "./functions/save.function";
import LoadModel from "./functions/load.function";
import Employee from "./employee";
import SelectProps, { ChangeProps, colorselector, textarea } from "./functions/properties.function";
import { addEmployee } from "./panels/button.panel";

export function UpdateModel(model: Model) { diagram.model = model }
var filename = "";

// Create GoJS Diagram
const diagram = new Diagram("diagramContainer",

    {
        model: new TreeModel(),
        "toolManager.mouseWheelBehavior": ToolManager.WheelZoom,    // Mousewheel zoom
        "commandHandler.zoomFactor": 1.3,                           // Zoom speed
        "undoManager.isEnabled": true,                              // Allows undo/redo binds
        allowCopy: false,                                           // Allows nodes to be copied
        allowDelete: true,                                          // Allows nodes to be deleted
        maxSelectionCount: 1,                                       // Allows only one node to be selected at a time
        validCycle: Diagram.CycleDestinationTree,

        // Enable double click tool
        "clickCreatingTool.archetypeNodeData": {},

        linkTemplate: LinkTemplate(),   // Define style for links
        nodeTemplate: NodeTemplate(),   // Define style for nodes

        layout: new TreeLayout({ angle: 90, layerSpacing: 35 }),
        scrollMode: Diagram.InfiniteScroll
    }
);

// Toggle properties panel on click
diagram.click = () => SelectProps(diagram.selection.first());

// Add new nodes on double click
diagram.toolManager.clickCreatingTool.insertPart = function (loc: Point) {
    return addEmployee(diagram)
}

/*    ~ Document and Window Listeners ~    */

// Warn user before closing page
window.onbeforeunload = () => {return true;}

// Listen for changes to props
textarea.addEventListener("input", () => ChangeProps(diagram.selection.first()))
colorselector.addEventListener("input", () => ChangeProps(diagram.selection.first()))

// Save model as json on click
document.getElementById("json")?.addEventListener("click", () => { SaveJson(diagram.model, filename) });

// Save diagram svg
document.getElementById("svg")?.addEventListener("click", () => { SaveSVG(diagram.makeSvg(), filename) });

// Load json model from file
document.getElementById("fileInput")?.addEventListener("change", (e) => { filename = LoadModel(e, diagram.model) });

// Override Ctrl+S Shortcut
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();     // Override default
        SaveJson(diagram.model, filename)
    }
});