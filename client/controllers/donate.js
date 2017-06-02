app.controller('donate', function ($scope, $http, $location, $interval, UserService) {

    //    $scope.user = UserService.getUser();
    $scope.user = sessionStorage.getItem("username");
    if ($scope.user == "null" || $scope.user == "") {
        $location.path('/');
    } else {
        $scope.cardName = $scope.user;
        $scope.customerArray = [];
        var getToken = function (successCb) {
            var request = {
                method: 'POST',
                url: 'https://api.stripe.com/v1/tokens',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer sk_test_FGGW2XruMpEfZfdZoReUakzn'
                },
                //            data: 'card[number]=4242424242424242&card[exp_month]=12&card[exp_year]=2018&card[cvc]=123'
                data: 'card[number]=' + $scope.cardNumber + '&card[exp_month]=' + $scope.cardExpMonth + '&card[exp_year]=' + $scope.cardExpYear + '&card[cvc]=' + $scope.cardCvc
            };

            var errCb = function (err) {
                alert("Wrong " + JSON.stringify(err));
            };
            $http(request).then(function (data) {
                //debugger;
                successCb(data["data"]["id"]); // Of data.data.id, is hetzelfde
            }, errCb).catch(errCb);

        };

        var createCustomer = function (token, successCb) {
            var request = {
                method: 'POST',
                url: 'https://api.stripe.com/v1/customers',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer sk_test_FGGW2XruMpEfZfdZoReUakzn'
                },
                data: 'source=' + token
            };
            var errCb = function (err) {
                alert("Wrong " + JSON.stringify(err));
            };
            $http(request).then(function (data) {
                successCb(data.data.id);
            }, errCb).catch(errCb);
        };

        var createInvoise = function (customer, successCb) {
            var request = {
                method: 'POST',
                url: 'https://api.stripe.com/v1/invoiceitems',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer sk_test_FGGW2XruMpEfZfdZoReUakzn'
                },
                data: 'customer=' + customer + '&amount=' + $scope.amount + '&currency=eur&description=One-time setup fee'
            };
            var errCb = function (err) {
                alert("Wrong " + JSON.stringify(err));
            };
            $http(request).then(function (data) {
                console.log(data);
                successCb()
            }, errCb).catch(errCb);
        };

        $scope.donate = function () {
            if ($scope.cardName && $scope.cardNumber && $scope.cardExpMonth && $scope.cardExpYear && $scope.cardCvc && $scope.amount) {
                getToken(function (token) {
                    createCustomer(token, function (customer) {
                        createInvoise(customer, function (data) {
                            $scope.updateDonation();
                        });
                    });
                });
            }

        };
        /*$scope.donate = function () {
            $http.get(ip + '/api/donateTest').success(function (res) {
                console.log(res)

            }).error(function (error) {
                console.log("network err");
            });

        }*/
        $scope.updateDonation = function () {
            var request = {
                method: 'GET',
                url: 'https://api.stripe.com/v1/invoiceitems',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer sk_test_FGGW2XruMpEfZfdZoReUakzn'
                }
            };
            var errCb = function (err) {
                alert("Wrong " + JSON.stringify(err));
            };
            $http(request).then(function (data) {
                $scope.customerArray = data.data.data;
                //console.log($scope.customerArray[0]);
            }, errCb).catch(errCb);


        }
        $scope.getTotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.customerArray.length; i++) {
                total += ($scope.customerArray[i].amount);
            }
            return total;
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
        $scope.updateDonation();
    }
});
