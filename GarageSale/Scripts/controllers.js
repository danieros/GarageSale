app.controller('landingController', function ($scope, $location, $http, $routeParams, userService) {

    var lat = -26.282623;
    var lng = 28.350689;
    var myLatLng = { lat: lat, lng: lng };

    $(function () {
        var mapOptions = {
            //center: new google.maps.LatLng(myLatLng),
            center: myLatLng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            draggable: false,
            panControl: true,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            overviewMapControl: true,
            rotateControl: true,
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        console.log("test");

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });

        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'Yellow',
            fillOpacity: 0.35,
            map: map,
            center: myLatLng,
            radius: 5000
        });

    });

    $scope.priceSlider = 100;

    $scope.$on("slideEnded", function () {
        alert($scope.priceSlider);
    });

    $http.get("/api/GarageSales/GetGarageSales")
  .success(function (response) { $scope.names = response; });

    $scope.selection = [];

    $scope.garagesaleclick = function (y) {
        console.log("memberid = " + y);
        userService.setmemberid(y);

        setCookie("memberid", y);

        $location.path('\Home');
    }

});

//function TestController() {
//    var vm = this;

//    vm.priceSlider = {
//        floor: 0,
//        ceil: 500,
//        value: 200
//    }
//}


app.controller('mainController', function ($scope, $location, $http, $routeParams, userService) {
   // var memberid = $location.search().garage;
    var memberid = userService.getmemberid();
    
    if (memberid == null)
    {
        memberid = getCookie("memberid");
    }

    console.log("memberid = " + memberid);

    var message1 = "If you interested in having your own virtual garage sale contact rossouw.daniel@gmail.com";
    message1 += "<ul class=\"ulspecial\">";
    message1 += "<li>You can list as many items as you want</li>";
    message1 += "<li>You have full admin interface and can do everything using your mobile.</li>";
    message1 += "<li>You don't have strangers all day at your house</li>";
    message1 += "<li>You can provide a direct link to your virtual garage via facebook etc</li>";
    message1 += "<li>You can be completely anonymous</li>";
    message1 += "<li>R50 for a month. Best R50 you will ever spend!</li>";
    message1 += "</ul>";


    $scope.showintro = function () {
        var howManyDialogs = 1;
        var titles = ["You can have your own virtual garage sale! <br />"];
        var messages = [message1];
        var buttonlabels = ["Next", "Next"];

        for (var i = 1; i <= howManyDialogs; i++) {
                var dialog = new BootstrapDialog({
                    title: titles[i - 1],
                    message: messages[i - 1],
                    cssClass: 'intro-dialog',
                    buttons: [ {
                        label: 'Close',
                        cssClass: 'btn btn-primary',
                        action: function () {
                            // You can also use BootstrapDialog.closeAll() to close all dialogs.
                            $.each(BootstrapDialog.dialogs, function (id, dialog) {
                                dialog.close();
                            });
                        }
                    }]
                });
            
            dialog.open();
        }
    }

    $scope.gotoPage = function (hash) {
        $location.path(hash);
    }

    if (getCookie("showintro") == 'undefined' || getCookie("showintro") == null || getCookie("showintro") == "") {
     $scope.showintro();
        setCookie("showintro", "true");
    }



    //myxmlhttp = new XMLHttpRequest();
    //myxmlhttp.open("POST", "https://mailforvirtualgarage.scm.azurewebsites.net/api/triggeredwebjobs/GarageSaleMails/run", false);
    //myxmlhttp.setRequestHeader("Authorization", "Basic JE1haWxGb3JWaXJ0dWFsR2FyYWdlOnJiTGNMenZmbHNxeW9kd1dOOUpHbjl5Q001dmxrdU53Uml0MlAzakNOeHpIREZxS1piUFljb2diUHdocw==");


    //myxmlhttp.send();


    $http.get("/api/MemberDetail/GetMemberDetails?memberid=" + memberid)
  .success(function (response) {
      console.log("avatar = " + response[0].Avatar);
      $scope.names = response;
      $scope.avatar = response[0].Avatar;
      $scope.mymessage = response[0].MyMessage;
      $scope.garagesalename = response[0].nameofsale;
      
  });
    $scope.selection = [];

    //Go back
    //    $http.get("http://virtualgaragesale.azurewebsites.net/api/MemberItems/GetMemberItems?memberid=1")
    //.success(function (response) { $scope.names = response; });
    $http.get("/api/MemberItems/GetMemberItems?memberid=" + memberid)
   .success(function (response) { $scope.names = response; });

    $scope.selection = [];


    $scope.Messages = function (y) {
        console.log("id = " + y);
        userService.setitemid(y);
        $location.path('\Discussion');
    }

});

app.controller('LocationController', function ($scope, $location, $http) {

    $scope.goBack = function (hash) {
        console.log(hash);
        $location.path(hash);
    }






    //var lat = -26.282623;
    //var lng = 28.350689;
    //var myLatLng = { lat: lat, lng: lng };

    //$(function () {
    //    var mapOptions = {
    //        //center: new google.maps.LatLng(myLatLng),
    //        center: myLatLng,
    //        zoom: 12,
    //        mapTypeId: google.maps.MapTypeId.ROADMAP,
    //        scrollwheel: false,
    //        draggable: false,
    //        panControl: true,
    //        zoomControl: true,
    //        mapTypeControl: true,
    //        scaleControl: true,
    //        streetViewControl: true,
    //        overviewMapControl: true,
    //        rotateControl: true,
    //    };
    //    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    //    var marker = new google.maps.Marker({
    //        position: myLatLng,
    //        map: map,
    //        title: 'Hello World!'
    //    });
    //});
    //google.maps.event.addDomListener(window, 'load', initialize);
});

app.controller('discussionController', function ($scope, $location, $http, $window, $route, userService) {

    var memberid = 1;

    var itemid = userService.getsetitemid();
    console.log("itemid = " + itemid);

    if (itemid == null) {
        $location.path('/')
    }
    else {

        $http.get("/api/SingleItem/GetItem?memberid=" + memberid + "&itemid=" + itemid)
  .success(function (response) {
      $scope.items = response;
      $scope.PhotoName = response[0].PhotoName;
      $scope.Price = response[0].Price;
      $scope.ItemName = response[0].ItemName;
      $scope.DateInserted = response[0].DateInserted;
      $scope.Description = response[0].Description;

  });

        $scope.selection = [];

        $http.get("/api/Messages/GetMessages?itemid=" + itemid)
      .success(function (response) {
          for (var feauture in response) {
              $scope.names = response;
          }
      });
    }

    $scope.selection = [];

    $scope.formData = {};
    $scope.formData.memberid = 1;
    $scope.formData.itemid = itemid;
    $scope.formData.seller = 0;



    //// process the form
    $scope.processMessages = function () {
        $http({
            method: 'POST',
            url: 'InsertMessages.ashx',
            data: $.param($scope.formData),  // pass in data as strings
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function (data) {

            console.log(data);
            $route.reload();
            //$window.location.reload();
        })
    };




    //Go back
    $scope.goBack = function (hash) {
        console.log(hash);
        $location.path(hash);
    }
});

app.controller('imageUploadController', function ($scope, $location, userService) {

    //Go back
    $scope.goBack = function (hash) {
        console.log(hash);
        $location.path(hash);
    }
});

app.controller('NavController', function ($scope, $location) {
    console.log("username = " + getCookie("yourname"));
    if (getCookie("yourname") == 'undefined' || getCookie("yourname") == null || getCookie("yourname") == "") {
        console.log("NavController = 1");
        $scope.showlogin = true;
        $scope.showlogout = false;
    }
    else {
        console.log("NavController = 2");
        $scope.showlogin = false;
        $scope.showlogout = true;
    }
});


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    console.log(expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
}

function getlocation() {

    if (!!navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition);

        //var map;

        //var mapOptions = {
        //    zoom: 15,
        //    mapTypeId: google.maps.MapTypeId.ROADMAP
        //};

        //map = new google.maps.Map(document.getElementById('google_canvas'), mapOptions);

        //navigator.geolocation.getCurrentPosition(function(position) {

        //    var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        //    var infowindow = new google.maps.InfoWindow({
        //        map: map,
        //        position: geolocate,
        //        content:
        //            '<h1>Location pinned from HTML5 Geolocation!</h1>' +
        //            '<h2>Latitude: ' + position.coords.latitude + '</h2>' +
        //            '<h2>Longitude: ' + position.coords.longitude + '</h2>'
        //    });

        //    map.setCenter(geolocate);

        //});

    } else {
        document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
    }

};