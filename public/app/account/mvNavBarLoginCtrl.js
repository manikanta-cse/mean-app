
angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, mvNotifier, mvIdentity, mvAuth, $location) {
    $scope.identity = mvIdentity;
    $scope.signin = function (username, password) {

        mvAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                mvNotifier.notify('You have successfully signed in!');
                console.log(mvIdentity.currentUser)
            }
            else {
                mvNotifier.notify('Username/Password Wrong!');
            }
        });


    };

    $scope.signout = function () {
        mvAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify("You have signed out!");
            $location.path('/')
        })
    };
});