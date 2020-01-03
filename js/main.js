var xmlhttp_FileContent = new XMLHttpRequest();
xmlhttp_FileContent.onreadystatechange = function () {
    if (xmlhttp_FileContent.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
        if (xmlhttp_FileContent.status == 200) {
            document.getElementById('div-content').innerHTML += "<br>" + xmlhttp_FileContent.responseText;
        }
    }
};

function LoadTagContent() {

    var selected_tag = document.getElementById('sel-tags').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var tags = eval(xmlhttp.responseText);
                var values = eval('tags[0].' + selected_tag);
                if (values) {
                    var vals = values.split('|');
                    document.getElementById('div-content').innerHTML = ''; //clear contents
                    for (var i = 0; i < vals.length; i++) {
                        var fileName = selected_tag + "-" + vals[i] + ".html";
                        xmlhttp_FileContent.open("GET", fileName, false);
                        xmlhttp_FileContent.send();
                    }
                }
                else {
                    document.getElementById('div-content').innerHTML = ''; //clear contents
                }
            }
        }
    };

    xmlhttp.open("GET", 'tags.json', true);
    xmlhttp.send();
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