app.config(function($stateProvider) {
  $stateProvider.state('privatePage', {
    url: '/me',
    templateUrl: 'js/privatePages/privatePage.html',
    controller: 'privatePageCtrl',
    resolve: {
      allPostings: function(PostingFactory) {
        return PostingFactory.getAllPostings();
      }
    }
  });
});


app.controller('privatePageCtrl', function($scope, AuthService, $state,
  allPostings, Session, PostingFactory) {

  //this will be dynamically changed
  $scope.client = true;
  $scope.activeJobs = [];

  if ($scope.client) {
    allPostings.forEach(function(post) {
      if (post.client == Session.id && status == 'started') {
        $scope.activeJobs.push(post);
      }
    });
  } else {
    allPostings.forEach(function(post) {
      if (post.artist == Session.id && status == 'started') {
        $scope.activeJobs.push(post);
      }
    });
  }

  PostingFactory.getArtistsByPostId('55f8793c3ca6f90e2fd65bc4')
    .then(function(artists) {
      $scope.artists = artists;
    }).then(null, console.error);

  $scope.client = false;
  $scope.activeJobs = [];


});
