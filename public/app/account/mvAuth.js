angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function (username, password) {
            var deffered = $q.defer();

            $http.post('/login', { username: username, password: password }).then(function (response) {
                if (response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user)
                    mvIdentity.currentUser = user;
                    deffered.resolve(true);
                } else {
                    deffered.resolve(false);
                }
            });

            return deffered.promise;

        },

        createUser: function (newUserData) {
            var newUser = new mvUser(newUserData);
            var defered = $q.defer();

            newUser.$save().then(function () {
                mvIdentity.currentUser = newUser;
                defered.resolve();
            }, function (response) {
                defered.reject(response.data.reason)
            });

            return defered.promise;
        },

        logoutUser: function () {
            var defered = $q.defer();
            $http.post('/logout', { logout: true }).then(function () {
                mvIdentity.currentUser = undefined;
                defered.resolve();
            });

            return defered.promise;
        },

        authiorzeCurrentUserForRoute: function (role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
});