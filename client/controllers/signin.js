app.controller('signin', function ($scope, $http, $location, $interval, UserService) {
    $scope.showInfo = function (tx, cl) {
        $scope.info.text = tx;
        $scope.info.class = cl;
        $interval(function () {
            $scope.info.class = 'info_hidden info_blue';
        }, 2000, 1);
    }
    $scope.setLocalStorage = function () {
        sessionStorage.setItem("username", UserService.getUser());
    }
    $scope.info = {
        'text': 'INFO BOX',
        'class': 'info_hidden'
    }
    $scope.login = {
        'email': '',
        'password': ''
    }
    $scope.cuttentUser = {};
    $scope.signin = function () {
        if ($scope.login.email && $scope.login.password) {
            $http.post(ip + '/api/signin', $scope.login).success(function (res) {
                $scope.showInfo(res.text, res.class);
                console.log(res.succes)
                if (res.succes) {
                    UserService.setUser(res.user.name.first + " " + res.user.name.last);
                    $scope.setLocalStorage();
                    $location.path('/dashboard');
                }
            }).error(function (error) {
                $scope.showInfo('NETWORK ERROR', 'info_show info_red');
                console.log("network err");
            });
        } else {
            console.log("PLEASE FILL IN EVERYTHING");
            $scope.showInfo('PLEASE FILL IN EVERYTHING', 'info_show info_red');

        }
    }


    /*    $scope.goToSingUp1 = function () {
            //alert("test");
            $http({
                method: 'GET',
                url: 'https://login-bd931.firebaseio.com/users.json?orderBy="email"&equalTo="test@hahah.be"'
            }).then(function successCallback(response) {
                var resData = response.data[Object.keys(response.data)[0]];
                console.log(resData.email);
            }, function errorCallback(response) {
                console.log(response);
            });
        }*/



    $scope.loginFacebook = function () {
        window.location.href = "https://www.facebook.com/dialog/oauth?client_id=1407118092668051&response_type=token&redirect_uri=http://localhost:3001/";
        $scope.setLocalStorage();
    };

    parseParams = function () {
        queryString = location.hash.substring(1);
        queryString = queryString.replace('/', '');
        var params = {},
            regex = /([^&=]+)=([^&]*)/g,
            m;
        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
        //console.log(params);
    };

    params = parseParams();

    $scope.name = "Name will be inflated here";
    if (params.access_token) {
        $http({
            method: 'GET',
            url: 'https://graph.facebook.com/v2.5/me?fields=id,name&access_token=' + params.access_token
        }).then(function (response) {
            $scope.name = response.data.name;
            UserService.setUser(response.data.name);
            UserService.setUser($scope.name);
            $scope.setLocalStorage();
            $location.path('/dashboard');
        }, function (err) {
            $scope.name = err;
        });
    }

});
