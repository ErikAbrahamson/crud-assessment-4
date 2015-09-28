crudApp.controller('mainController', function($scope, $http) {

  $scope.formData = {};
  $scope.modalData = {};

  $scope.parseArray = function(key) {
    $scope.formData.key = $scope.formData.key.split(', ');
    return $scope.formData.key;
  };

  $http.get('/api/v1/vehicles')
    .success(function(data) {
      $scope.vehicles = data;
      console.log(data);
    })
    .error(function(error) {
      console.log('Error: ' + error);
    });

  $scope.createProject = function() {
    $http.post('/api/v1/vehicles/', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clears the form every entry
        $scope.vehicles.push(data);
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  };

  $scope.deleteProject = function(id) {
    $http.delete('/api/v1/vehicles/' + id)
      .success(function(data) {
        $scope.vehicles.splice(data, 1);
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  };

    $scope.editProject = function(id) {
    $http.put('/api/v1/vehicles/' + id, $scope.modalData)
      .success(function(data) {
        data = $scope.modalData;
        $scope.$apply();
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  };
});
