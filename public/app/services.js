var acmeServices = angular.module('acmeServices', []);

acmeServices.factory('Patient', function($http) {
	return {
		query: function() {
			return $http.get('/api/patients')
				.then(function(result) {
					return result.data;
				}, function(reason) {
					return [];
				});
		},
		find: function(id) {
			return $http.get('/api/patients/' + id)
				.then(function(result) {
					return result.data;
				}, function(reason) {
					return [];
				});
		},
		create: function(patient, socketId, callback) {
			return $http.post('/api/patients', patient, {
					headers: {
						'X-Socket-Client-Id': socketId
					}
				})
				.success(function(data) {
					if (callback !== undefined) {
						callback(data);
					}
				});
		},
	};
});

acmeServices.factory('Reading', function($http) {
	return {
		query: function(patientId) {
			return $http.get('/api/patients/' + patientId + '/readings')
				.then(function(result) {
					return result.data;
				}, function(reason) {
					return [];
				});
		},
		create: function(patientId, reading, socketId, callback) {
			return $http.post('/api/patients/' + patientId + '/readings', reading, {
					headers: {
						'X-Socket-Client-Id': socketId
					}
				})
				.success(function(data) {
					if (callback !== undefined) {
						callback(data);
					}
				});
		}
	};
});
