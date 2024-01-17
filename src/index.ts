import { ClickCreatingTool, Diagram, Model, Part, Point, ToolManager, TreeLayout, TreeModel } from "gojs";
import LinkTemplate from "./templates/link.template";
import NodeTemplate from "./templates/node.template";
import SaveChart from "./functions/save.function";
import LoadModel from "./functions/load.function";
import Employee from "./employee";
import OpenComments, { CommentChange, textarea } from "./functions/comments.function";

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

        // Enable double click tool
        "clickCreatingTool.archetypeNodeData": {},

        linkTemplate: LinkTemplate(),   // Define style for links
        nodeTemplate: NodeTemplate(),   // Define style for nodes

        layout: new TreeLayout({ angle: 90, layerSpacing: 35 }),
    }
);

diagram.click = () => OpenComments(diagram.selection.first());

// Add new nodes on double click
diagram.toolManager.clickCreatingTool.insertPart = function (loc: Point) {
    
    // Add blank node to diagram
    var node = ClickCreatingTool.prototype.insertPart.call(this, loc);
    if (node == null) return null;

    // Create new employee and merge with node data
    node.data = {
        ...new Employee(),
        ...node.data
    }

    // Scroll to and select new node
    diagram.select(node);
    OpenComments(node.part);
    diagram.commandHandler.scrollToPart(node);
    return node;
}

/*    ~ Document and Window Listeners ~    */

// Warn user before closing page
window.onbeforeunload = () => {return true;}

textarea.addEventListener("input", () => CommentChange(diagram.selection.first()))

// Save model as json on click
document.getElementById("saveButton")?.addEventListener("click", () => { SaveChart(diagram.model, filename) });

// Load json model from file
document.getElementById("fileInput")?.addEventListener("change", (e) => { console.log(LoadModel(e, diagram.model)) });

// Override Ctrl+S Shortcut
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();     // Override default
        SaveChart(diagram.model, filename)
    }
});


/*

TODO:
    Change picture.panel to take pfp BASE64 image instead
    Create node script to scrape details
    Remove email prompt 



*/