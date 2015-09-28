crudApp.directive('myTitle', function() {
  return {
    restrict: 'AE',
    replace: 'false',
    template:
      '<h1>CRUD 4</h1>'
  };
});

crudApp.directive('editModal', function() {
  return {
    restrict: 'AEC',
    replace: 'false',
    templateUrl: './partials/modal.html'
  };
});
