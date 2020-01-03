//chrome.webRequest.onHeadersReceived.addListener(details => {
//    const responseHeaders = details.responseHeaders.map(item => {
//        if (item.name.toLowerCase() === 'access-control-allow-origin') {
//            item.value = '*'
//        }
//    })
//    return { responseHeaders };
//}, { urls: ['<all_urls>'] }, ['blocking', 'responseHeaders', 'extraHeaders']);

var xmlhttp_FileContent = new XMLHttpRequest();
xmlhttp_FileContent.onreadystatechange = function () {
    if (xmlhttp_FileContent.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
        if (xmlhttp_FileContent.status == 200) {
            document.getElementById('div-content').innerHTML += "<br>" + xmlhttp_FileContent.responseText;
        }
    }
};

function GetTagsJson() {

    return [{ "G1": "intro|dsgn|dev|test|code" }, { "G2": "intro|dsgn|dev|test|code" }];
}

function GetContent(fileName) {

    var retVal = '';

    switch (fileName) {

        case 'G1-intro.html':
            retVal = 'G1 Intro';
            break;

        case 'G1-dsgn.html':
            retVal = 'G1 Design';
            break;

        case 'G1-dev.html':
            retVal = 'G1 Dev';
            break;

        case 'G1-test.html':
            retVal = 'G1 Test';
            break;

        case 'G1-code.html':
            retVal = 'G1 Code';
            break;

        case 'G2-intro.html':
            retVal = 'G2 Intro';
            break;

        case 'G2-dsgn.html':
            retVal = 'G2 Design';
            break;

        case 'G2-dev.html':
            retVal = 'G2 Dev';
            break;

        case 'G2-test.html':
            retVal = 'G2 Test';
            break;

        case 'G2-code.html':
            retVal = 'G2 Code';
            break;

        default:
            retVal = '';
    }   

    return retVal;
}

function LoadTagContent() {

    var selected_tag = document.getElementById('sel-tags').value;
    var index = document.getElementById('sel-tags').selectedIndex;
    var tags = GetTagsJson();

    try {
        var values = eval('tags[' + index + '].' + selected_tag);
    }
    catch (e){

        document.getElementById('div-content').innerHTML = ''; //clear contents
    }
    
    if (values) {
        var vals = values.split('|');
        if (vals) {
            document.getElementById('div-content').innerHTML = ''; //clear contents
            for (var i = 0; i < vals.length; i++) {
                var fileName = selected_tag + "-" + vals[i] + ".html";
                console.log(fileName);
                document.getElementById('div-content').innerHTML += "<br>" + GetContent(fileName);
                //xmlhttp_FileContent.open("GET", fileName, false);
                //xmlhttp_FileContent.send();
            }
        }
    }
    else {
        document.getElementById('div-content').innerHTML = ''; //clear contents
    }


    //var xmlhttp = new XMLHttpRequest();
    //xmlhttp.onreadystatechange = function () {
    //    if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
    //        if (xmlhttp.status == 200) {
    //            var tags = eval(xmlhttp.responseText);
    //            var values = eval('tags[0].' + selected_tag);
    //            if (values) {
    //                var vals = values.split('|');
    //                document.getElementById('div-content').innerHTML = ''; //clear contents
    //                for (var i = 0; i < vals.length; i++) {
    //                    var fileName = selected_tag + "-" + vals[i] + ".html";
    //                    xmlhttp_FileContent.open("GET", fileName, false);
    //                    xmlhttp_FileContent.send();
    //                }
    //            }
    //            else {
    //                document.getElementById('div-content').innerHTML = ''; //clear contents
    //            }
    //        }
    //    }
    //};
    //xmlhttp.open("GET", 'tags.json', true);
    //xmlhttp.send();

}

LoadTagContent();
document.getElementById('sel-tags').setAttribute('onchange', 'LoadTagContent();');

//function LoadTagContent() {
//    var selected_tag = document.getElementById("sel-tags").value;
//    //load the tags settings from tags.json
//    fetch("tags.json")
//        .then(function (response) {
//            return response.json();
//        })
//        .then(function (myJson) {
//            //clear the content section
//            document.getElementById("div-content").innerHTML = "";
//            var tags = myJson;
//            //once a tag is selected_tag, load the correponding
//            //data from individual html view
//            var values = eval("tags[0]." + selected_tag);
//            if (values) {
//                var vals = values.split("|");
//                for (var i = 0; i < vals.length; i++) {
//                    var fileName = selected_tag + "-" + vals[i] + ".html";
//                    //load resources according to filename
//                    fetch(fileName)
//                        .then(function (response) {
//                            if (response.ok) {
//                                return response.text();
//                            } else {
//                                document.getElementById("div-content").innerHTML += "<br>" + response.error;
//                            }
//                        })
//                        .then(function (myJson) {
//                            //display file contents in the content area
//                            document.getElementById("div-content").innerHTML += "<br>" + myJson;
//                        })
//                        .catch((error) => {
//                            //corresponsing file not found
//                            console.log(fileName + " not found")
//                        });
//                }
//            }
//            else {
//                //corresponsing file not found
//                document.getElementById("div-content").innerHTML = "File not found";
//            }
//        });
//}
////whenever the tag list entry changes,
////content gets refreshed
//document.getElementById("sel-tags").setAttribute("onchange", "LoadTagContent();");
////on page load
//LoadTagContent();