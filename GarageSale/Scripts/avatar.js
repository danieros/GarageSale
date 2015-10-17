// Required for drag and drop file access
jQuery.event.props.push('dataTransfer');

// IIFE to prevent globals
(function () {

    var s;
    var Avatar = {

        settings: {
            bod: $("body"),
            img: $("#profile-avatar"),
            fileInput: $("#uploader")
        },

        init: function () {
            s = Avatar.settings;
            Avatar.bindUIActions();
        },

        bindUIActions: function () {

            var timer;

            s.bod.on("dragover", function (event) {
                clearTimeout(timer);
                if (event.currentTarget == s.bod[0]) {
                    Avatar.showDroppableArea();
                }

                // Required for drop to work
                return false;
            });

            s.bod.on('dragleave', function (event) {
                if (event.currentTarget == s.bod[0]) {
                    // Flicker protection
                    timer = setTimeout(function () {
                        Avatar.hideDroppableArea();
                    }, 200);
                }
            });

            s.bod.on('drop', function (event) {
                // Or else the browser will open the file
                event.preventDefault();

                Avatar.handleDrop(event.dataTransfer.files);
            });

            s.fileInput.on('change', function (event) {
                Avatar.handleDrop(event.target.files);
            });
        },

        showDroppableArea: function () {
            s.bod.addClass("droppable");
        },

        hideDroppableArea: function () {
            s.bod.removeClass("droppable");
        },

        handleDrop: function (files) {

            Avatar.hideDroppableArea();

            // Multiple files can be dropped. Lets only deal with the "first" one.
            var file = files[0];

            if (file.type.match('image.*')) {

                Avatar.resizeImage(file, 300, function (data) {

                    var arraybuffer = dataURItoBlob(data);
                    handlefile(file, arraybuffer);

                 //   handlefile(file, data);
                    Avatar.placeImage(data);
                });

            } else {

                alert("That file wasn't an image.");

            }

        },

        resizeImage: function (file, size, callback) {

            

            var fileTracker = new FileReader;
            fileTracker.onload = function () {

                console.log("file loaded");

                Resample(
                 this.result,
                 null,
                 size,
                 callback
               );
            }

            console.log("file = " + file);

            fileTracker.readAsDataURL(file);

            fileTracker.onabort = function () {
                alert("The upload was aborted.");
            }
            fileTracker.onerror = function () {
                alert("An error occured while reading the file.");
            }

        },

        placeImage: function (data) {
            s.img.attr("src", data);
        }

    }

    Avatar.init();

})();

//Not used
function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}


function handlefile(file, data)
{

    file.azureUri = "../ReturnSAS.ashx" + "?blobName=" + file.name;
    console.log(file.azureUri);

    $.ajax({
        type: 'GET',
        url: file.azureUri,
        success: function (res, status, xhr) {
            // Called into GetBlobSasUrl to generate the SAS for the required blob
            blobSasUrl = xhr.responseText;

            // Now we have the right SAS url that we will use to upload the image
            // Pass in the SAS URL and the ArrayBuffer to be uploaded

            console.log("data = " + data);
            uploadImage(file.name, blobSasUrl, data);
        },
        error: function (res, status, xhr) {
            alert("can't get sas from the server");
        }
    });
}

function uploadImage(filename, blobSasUrl, fileDataAsArrayBuffer) {
    console.log("uploadimage")
    var ajaxRequest = new XMLHttpRequest();
    // Once the image is successfully upload, we will call render Image that would show the uploade image
    //ajaxRequest.onreadystatechange = function () { return renderImage(filename, ajaxRequest, blobSasUrl) };

    try {
        // Performing an PutBlob (BlockBlob) against storage
        ajaxRequest.open('PUT', blobSasUrl, true);
        ajaxRequest.setRequestHeader('Content-Type', 'image/jpeg');
        ajaxRequest.setRequestHeader('x-ms-blob-type', 'BlockBlob');
        ajaxRequest.send(fileDataAsArrayBuffer);
    }
    catch (e) {
        alert("can't upload the image to server.\n" + e.toString());
    }
}

// not used in this solution
//But if you're using some kind of asset host, they will probably want a real file, 
//not a data URI. And they'll want you to POST them multipart/form-data not just a string. 
//So you'll need to change that data URI into a file (or "Blob").
function dataURItoBlob(dataURI) {
    console.log("dataURI = " + dataURI);
    var temp = dataURI.split(',');
    console.log("temp = " + temp[1]);
    var binary = atob(temp[1]);
    console.log("binary = " + binary);
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}
