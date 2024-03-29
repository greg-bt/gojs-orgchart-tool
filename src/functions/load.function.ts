import { Model } from "gojs";
import { UpdateModel } from "..";

export default function LoadModel(event: Event, model: Model): string {

    let files = (<HTMLInputElement>event.target).files;
    if (!files) return "";

    files[0].text().then((text) => {
        UpdateModel(Model.fromJson(text));
    });
    
    const filename = files[0].name;

    return filename.substr(0, filename.lastIndexOf("."));
}
