 app.config($stateProvider => {
  $stateProvider.state('privatePage', {
    url: '/me',
    templateUrl: 'js/privatePages/privatePage.html',
    controller: 'privatePageCtrl',
    data: {
      authenticate: true
    },
    abstract: true,
    resolve: {
      user: AuthService => {
        return AuthService.getLoggedInUser()
        .then(user => user);
      },
      allPostings: function(PostingFactory) {
        return PostingFactory.getAllPostings();
      },
      savedPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user)
        {
          return UserFactory.getSavedPostingsForUser(user._id);
        });
      },
      requestedPostings: (AuthService, UserFactory) =>
      {
        return AuthService.getLoggedInUser()
        .then(user =>
        {
          return UserFactory.getRequestedPostingsForUser(user._id);
        });
      },
      activeArtistPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.getActivePostingsForArtist(user._id);
        });
      },
      activeClientPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.getActivePostingsForClient(user._id, 'client');
        });
      },
      unassignedPostings: function(AuthService, UserFactory){
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.unassignedPostings(user._id);
        })
      },
      completeArtistPostings: function(AuthService, PostingFactory){
        return AuthService.getLoggedInUser()
        .then(function(user){
          return PostingFactory.getDonePostsForUser(user._id, "artist")
        })
      },
      completeClientPostings: function(AuthService, PostingFactory){
        return AuthService.getLoggedInUser()
        .then(function(user){
          return PostingFactory.getDonePostsForUser(user._id, "client")
        })
      }
    }
  })
})


app.controller('privatePageCtrl', function($scope, $stateParams, AuthService, $state, user,
  allPostings, completeArtistPostings, completeClientPostings, savedPostings, requestedPostings, unassignedPostings, activeArtistPostings, activeClientPostings, Session, PostingFactory, $document) {
  //this will be dynamically changed
  $scope.savedPostings = savedPostings;
  $scope.requestedPostings = requestedPostings;
  $scope.activeClientJobs = activeClientPostings;
  $scope.activeArtistJobs = activeArtistPostings;
  $scope.completeArtistPostings = completeArtistPostings;
  $scope.completeClientPostings = completeClientPostings;
  $scope.user = user;
  $scope.unassignedPostings = unassignedPostings;

  //we need this to make sure that console.error works
  console.error = console.error.bind(console);

  //$scope.amountOwed = $$$;
  var size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  $scope.requestedPostingsCount = size(requestedPostings);
  $scope.activeArtistJobsCount = size(activeArtistPostings);
  $scope.savedPostingsCount = size(savedPostings);
  $scope.requestForm = false;
  $scope.request = 'request';
  $scope.saved = 'saved';


});
