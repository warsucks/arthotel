app.config(function ($stateProvider) {
    $stateProvider.state('detailedPosting', {
        url: '/postings/:postingId',
        templateUrl: 'js/postings/detailedPosting/posting.html',
        controller: 'postingCtrl',
        resolve: {
          posting: function(PostingFactory, $stateParams)
          {
            return PostingFactory.getPostingById($stateParams.postingId);
          },
          currentUser: function(AuthService)
          {
            return AuthService.getLoggedInUser();
          }
        }
    });
});

app.controller('postingCtrl', function ($scope, AuthService, currentUser, $state, $stateParams, posting, PostingFactory) {
        $scope.posting = posting;
        $scope.showRequest = true;

        $scope.editing = false;
        $scope.change = false;

        if(currentUser){
          $scope.editable = currentUser._id === $scope.posting.client._id;
        }

        $scope.toggleEditing = function(){
            $scope.editing = !$scope.editing;

            if(!$scope.editing && $scope.change){
              PostingFactory.updatePost($scope.posting)
              .then(() => {
                $state.go($state.current, $stateParams, {reload: true});
              })
            }
          }

        $scope.savePostingToCart = (postingId) => {
          PostingFactory.savePostingToCart(postingId)
          .then(() => {
            $state.go($state.current, $stateParams, {reload: true});
          })
        };

        AuthService.getLoggedInUser()
        .then(function(user)
        {
          $scope.user = user;
          if(user)
          {
            $scope.checkRequestedArray();
          }
        });

        $scope.checkRequestedArray = () => {
          console.log("checking array");
            if(_.findIndex($scope.posting.artistsWhoRequested, {user: $scope.user._id}) < 0) {
              console.log("user has not requested this posting")
              $scope.showRequest = true;
            } else {
              $scope.showRequest = false;
            }
        };

        $scope.requestPosting = (postingId) => {
          PostingFactory.requestPosting(postingId)
          .then(() => {
            $state.go($state.current, $stateParams, {reload: true});
          });
        };

        $scope.deleteRequest = () => {
          PostingFactory.rejectArtist($scope.user._id, $scope.posting._id)
            .then(() => {
              $state.go($state.current,$stateParams, {reload: true});
            });
          };

        $scope.deleteSaved = () => {
          PostingFactory.removeSaveArtist($scope.user._id, $scope.posting._id)
          .then(() => {
              $state.go($state.current,$stateParams, {reload: true});
          });
        };

      



});
