angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q) {
    return {
        authenticateUser: function (username, password) {
            var deffered = $q.defer();

            $http.post('/login', { username: username, password: password }).then(function (response) {
                if (response.data.success) {
                    mvIdentity.currentUser = response.data.user;
                    deffered.resolve(true);
                } else {
                    deffered.resolve(false);
                }
            });

            return deffered.promise;

        }
    }
});