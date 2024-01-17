import { ClickCreatingTool, Diagram, Model, Part, Point, ToolManager, TreeLayout, TreeModel } from "gojs";
import LinkTemplate from "./templates/link.template";
import NodeTemplate from "./templates/node.template";
import SaveChart from "./functions/save.function";
import LoadModel from "./functions/load.function";

var filename = "";

// Create GoJS Diagram
const diagram = new Diagram("diagramContainer",
    {
        "toolManager.mouseWheelBehavior": ToolManager.WheelZoom,    // Mousewheel zoom
        "commandHandler.zoomFactor": 1.3,                           // Zoom speed
        "undoManager.isEnabled": true,                              // Allows undo/redo binds
        allowCopy: false,                                           // Allows nodes to be copied
        allowDelete: true,                                          // Allows nodes to be deleted
        maxSelectionCount: 1,                                       // Allows only one node to be selected at a time

        // Add new nodes on double click
        "clickCreatingTool.archetypeNodeData": {},
        "clickCreatingTool.insertPart": function ( loc: Point ) {
            const node = ClickCreatingTool.prototype.insertPart.call(this, loc);
            if (node == null) return null;

            
            /* @ts-ignore */
            this.diagram.select(node);
            /* @ts-ignore */
            this.diagram.commandHandler.scrollToPart(node);

            return node;
        },

        linkTemplate: LinkTemplate(),   // Define style for links
        nodeTemplate: NodeTemplate(),   // Define style for nodes

        layout: new TreeLayout({ angle: 90, layerSpacing: 35 })
    }
);

// Warn user before closing page
window.onbeforeunload = () => {return true;}

// Save model as json on click
document.getElementById("saveButton")?.addEventListener("click", () => { SaveChart(diagram.model, filename) });

// Load json model from file
document.getElementById("fileInput")?.addEventListener("change", (e) => { console.log(LoadModel(e, diagram.model)) });
export function UpdateModel(model: Model) { diagram.model = model }

diagram.model = new TreeModel(
    [{"key":1}]
);