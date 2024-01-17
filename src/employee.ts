
export default class Employee {

    key?:       number | string;    // Key of node

    email:      string;
    name:       string;

    title:      string;   
    tag:        string;
    location:   string;

    comments:   string;
    bgcolor:    string;

    parent?:    number | string;    // Key of parent node


    constructor() {

        // Prompt user for employee email
        let email = prompt("Enter New Employee Email Address", "");
        email = (!email ? "" : email);

        this.email = email;

        // Construct name from email address
        this.name = email
            .replace(/\@.*/, "")    // Remove domain name
            .replace(/\./, " ")     // Replace "." with spaces
            .replace(/(^\w|\s\w|-\w)/g, c => c.toUpperCase());

        this.title = "Title";
        this.tag = "Tag";
        this.location = "Location";

        this.comments = ""
        this.bgcolor = "#ffffff"

    }
}