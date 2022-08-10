//import "./blog.js";
import { markdown } from "./drawdown.js";
import { generatePostLinks } from "./blog.js";
//import { postObj, legacyPostObj, projectsObj } from "./postList.js";

const fetchHeader = async function(headerFile) {
    return fetch(headerFile)
        .then(res=>res.text())
        .then(text=>markdown(text));
}

const loadPage = async function(target, headerFile, postList) {
    var header = await fetchHeader(headerFile);
    target.innerHTML = header;
    generatePostLinks(target, postList, true);
}

export { loadPage };
