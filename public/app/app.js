angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {

    var routeRoleChecks = {
        admin: {
            auth: function (mvAuth) {
                return mvAuth.authiorzeCurrentUserForRoute('admin');
            }
        },
        user: {
            auth: function (mvAuth) {
                return mvAuth.authiorzeAuthenticatedUserForRoute();
            }
        }
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl' })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup', controller: 'mvSignUpCtrl' })
        .when('/profile', { templateUrl: '/partials/account/profile', controller: 'mvProfileCtrl',resolve: routeRoleChecks.user })
});


angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});

// angular.module('app').controller('mainCtrl',function($scope){
//     $scope.myVar='Hello World';
// });