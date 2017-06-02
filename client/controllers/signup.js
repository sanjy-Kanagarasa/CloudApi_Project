app.controller('signup', function ($scope, $http, $location) {
    $scope.user = {
        'firstname': '',
        'lastname': '',
        'email': '',
        password: '',
        repassword: '',
    }
    $scope.showInfo = function (tx, cl) {
        $scope.info.text = tx;
        $scope.info.class = cl;
        $interval(function () {
            $scope.info.class = 'info_hidden info_blue';
        }, 2000, 1);
    }
    $scope.info = {
        'text': 'INFO BOX',
        'class': 'info_hidden'
    }
    $scope.goToSingIn = function () {
        $location.path('/signin');
    }
    $scope.signup = function () {

        if ($scope.user.email && $scope.user.firstname && $scope.user.lastname && $scope.user.repassword) {
            if ($scope.user.password == $scope.user.repassword) {
                $http.post(ip + '/api/createUser', $scope.user).success(function (res) {
                    $scope.showInfo(res.text, res.class);
                    $location.path('/signin');
                    console.log(res);
                }).error(function (error) {
                    //$scope.showInfo('NETWORK ERROR', 'info_show info_red');
                    $scope.showInfo('NETWORK ERROR', 'info_show info_red');
                });
            } else {
                //$scope.showInfo('THE PASSWORDS ARE NOT THE SAME', 'info_show info_red');
                console.log("PASSWORDS ARE NOT SAME");
                $scope.showInfo('Passwords are not same', 'info_show info_red');
            }
        } else {
            //$scope.showInfo('PLEASE FILL IN EVERYTHING', 'info_show info_red');
            $scope.showInfo('Please fill in everything', 'info_show info_red');
        }

    }
});
