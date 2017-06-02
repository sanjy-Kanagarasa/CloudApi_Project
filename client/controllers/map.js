app.controller('map', function ($scope, $http, $location, UserService) {
    //    $scope.user = UserService.getUser();
    $scope.user = sessionStorage.getItem("username");
    if ($scope.user == "null" || $scope.user == "") {
        $location.path('/');
    } else {
        var infoWindow;
        var map;
        var url_data = "http://datasets.antwerpen.be/v4/gis/speelterreinenvlak.json";
        $scope.currentLocation = {
            'lat': '',
            'lng': ''
        };
        $scope.dataArray = {};
        var testArray = {
            'objectid': "",
            'dataArray1': []
        };

        $scope.drawArray = [];
        //console.log($scope.drawArray);
        var options = {
            enableHighAccuracy: true
        };

        $scope.showInfo = function (speelterreinenvlak, index) {
            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' + $scope.dataArray[index].naam + '</h1>' +
                '<div id="bodyContent">' + '<table><tr><td>District: </td><td>' +
                $scope.dataArray[index].district + '</td><td rowspan="5"><img src="' + $scope.dataArray[index].foto1 +
                '" alt="HTML5 Icon" style="width:200px;height:150px;"></td></tr><tr><td>Postcode:</td><td>' +
                $scope.dataArray[index].postcode + '</td></tr><tr><td>Straat:</td><td>' +
                $scope.dataArray[index].straat + ' &ensp;</td></tr><tr><td>Huisnummer: &ensp;</td><td>' +
                $scope.dataArray[index].huisnummer + '</td></tr><tr><td>Toestellen:</td><td>' +
                $scope.dataArray[index].toestellen + '</td></tr></table>' +
                '</div>' +
                '</div>';
            infoWindow = new google.maps.InfoWindow;
            google.maps.event.addListener(speelterreinenvlak, 'click', function (event) {
                infoWindow.setContent(contentString);
                infoWindow.setPosition(event.latLng);
                infoWindow.open(map);
            });
        }

        $scope.initialize = function () {
            $scope.positionArray = [];
            $http({
                method: 'GET',
                url: url_data
            }).then(function successCallback(response) {
                    $scope.dataArray = response.data.data;
                    for (i = 0; i < $scope.dataArray.length; i++) {
                        testArray[i] = {
                            'objectid': $scope.dataArray[i].objectid,
                            'dataArray1': []
                        };

                        for (j = 0; j < JSON.parse($scope.dataArray[i].geometry).coordinates[0].length; j++) {
                            testArray[i].dataArray1.push({
                                'lat': JSON.parse($scope.dataArray[i].geometry).coordinates[0][j][1],
                                'lng': JSON.parse($scope.dataArray[i].geometry).coordinates[0][j][0]
                            });
                        }
                        //console.log(testArray[i].dataArray1);
                        $scope.drawArray.push(testArray[i].dataArray1);
                    }
                    //console.log($scope.drawArray);
                    $scope.drawMap();
                },
                function errorCallback(response) {
                    console.log(response);
                });
        }
        $scope.getLocation = function () {
            navigator.geolocation.getCurrentPosition(function (pos) {
                    $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                    if ($scope.position) {
                        $scope.currentLocation.lat = pos.coords.latitude;
                        $scope.currentLocation.lng = pos.coords.longitude;
                        $scope.initialize();
                    }
                },
                function (error) {
                    alert('Unable to get location: ' + error.message);
                }, options);
        }
        $scope.drawMap = function () {

            map = new google.maps.Map(document.getElementById('map_div'), {
                center: {
                    lat: $scope.currentLocation.lat,
                    lng: $scope.currentLocation.lng
                },
                zoom: 15
            });
            for (var i = 0; i < $scope.drawArray.length; i++) {
                var speelterreinenvlak = new google.maps.Polygon({
                    paths: $scope.drawArray[i],
                    strokeColor: '#000000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#000000',
                    fillOpacity: 0.35,
                    indexId: i
                });

                speelterreinenvlak.setMap(map);
                var uluru = {
                    lat: $scope.currentLocation.lat,
                    lng: $scope.currentLocation.lng
                };
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
                //speelterreinenvlak.addListener('click', showInfo(i));
                $scope.showInfo(speelterreinenvlak, i);

            }
        }
        $scope.goToDashboard = function () {
            $location.path('/dashboard');
        }
        $scope.goToMap = function () {
            $location.path('/map');
        }
        $scope.goToDonate = function () {
            $location.path('/donate');
        }
        $scope.logout = function () {
            sessionStorage.setItem("username", "null");
            $location.path('/');
        }
        $scope.getLocation();
    }
});
