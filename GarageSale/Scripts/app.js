var app = angular.module('myApp', ['ngRoute']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'Landing.html',
            controller: 'landingController'
        })


        // route for the home page
        .when('/Home', {
            templateUrl: 'Default.html',
            controller: 'mainController'
        })


        .when('/Discussion', {
            templateUrl: 'Discussion.html',
            controller: 'discussionController'
        })


    //route for location page
    .when('/location', {
        templateUrl: 'Location.html',
        controller: 'LocationController'
    });

});

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
}]);

app.filter("getAge", function () {
    return function (input) {

        var arrayvars = input.split("|");
        var d = new Date(arrayvars[0]);

        var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
        ];

        var hours
        if (d.getHours() < 10)
        {
            hours = "0" + d.getHours();
        }
        else
        {
            hours = d.getHours();
        }

        var minutes
        if (d.getMinutes() < 10) {
            minutes = "0" + d.getMinutes();
        }
        else {
            minutes = d.getMinutes();
        }

        console.log(d);
        var datestring = d.getDate() + " " + (monthNames[d.getMonth()]) + " " +
        hours + ":" + minutes;
        console.log(datestring);
        output = datestring;

        
        if (arrayvars[1] == "0" && arrayvars[2] == "B") {
            return output;
        }

        if (arrayvars[1] == "1" && arrayvars[2] == "S") {
            return output;
        }

    }
});

app.filter('searchForname', function () {

    // All filters must return a function. The first parameter
    // is the data that is to be filtered, and the second is an
    // argument that may be passed with a colon (searchFor:searchString)

    return function (arr, searchString) {

        if (!searchString) {
            return arr;
        }

        var result = [];

        searchString = searchString.toLowerCase();

        // Using the forEach helper method to loop through the array
        angular.forEach(arr, function (item) {

            if (item.ItemName.toLowerCase().indexOf(searchString) !== -1) {
                result.push(item);
            }

        });

        return result;
    };

});


app.factory('userService', function () {
    var userData = [
        { yearSetCount: 0 }
    ];

    return {
        user: function () {
            return userData;
        },
        setEmail: function (email) {
            userData.email = email;
        },
        getEmail: function () {
            return userData.email;
        },
        setitemid: function (itemid) {
            userData.itemid = itemid;
        },
        getsetitemid: function () {
            return userData.itemid;
        },
        setphoto: function (photo) {
            userData.spcaid = photo;
        },
        getphoto: function () {
            return userData.photo;
        },
        setmemberid: function (memberid) {
            userData.memberid = memberid;
        },
        getmemberid: function () {
            return userData.memberid;
        }
    };
});