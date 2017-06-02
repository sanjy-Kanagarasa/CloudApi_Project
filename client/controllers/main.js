app.controller('main', function ($scope, $http, $location, $routeParams, UserService) {
    var url_data = "http://datasets.antwerpen.be/v4/gis/speelterreinenvlak.json";
    $scope.userId = $routeParams.param0;
    //    $scope.user = UserService.getUser(); 
    $scope.user = sessionStorage.getItem("username");
    if ($scope.user == "null" || $scope.user == "") {
        $location.path('/');
    } else {

        $scope.dataArray = [];
        $http({
            method: 'GET',
            url: url_data
        }).then(function successCallback(response) {
            $scope.dataArray = response.data.data
        }, function errorCallback(response) {
            console.log(response);
        });

        $scope.logout = function () {
            $http.get(ip + '/api/logout')
                .then(function (response) {
                    if (response.data.data) {
                        $location.path('/signin');
                    }
                });
        }

        $scope.getDetail = function (_id) {
            alert(_id);
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
        UserService.setUser(UserService.getUser());
    }
});
