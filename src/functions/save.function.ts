import { Model } from "gojs";


export default function SaveChart(model: Model, filename: string) {

    if( filename == "") filename = "OrgChart.json";

    // Create link with json data
    var link = document.createElement("a");
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(model.toJson());
    link.setAttribute("href", dataStr )
    link.setAttribute('download', filename);
    link.style.display = 'none';

    // Click and remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}