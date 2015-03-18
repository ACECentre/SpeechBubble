'use strict';

angular.module('speechBubbleApp')
  .controller('AdminPageCtrl', function ($scope, Page, $modal, Modal) {
    $scope.pages = Page.query();

    $scope.isVisible = function(page) {
      var isPublic = page.visible;
      var isPublished = false;
      if(page.visible) {
        angular.forEach(page._revisions, function(r) {
          if(r.published) {
            isPublished = true;
          }
        });
      }
      return (isPublic && isPublished);
    };

    $scope.hasDrafts = function(page) {
      if(page._revisions.length) {
        return !(page._revisions[page._revisions.length -1].published);
      }
      return false;
    };

    $scope.create = function() {
      $modal.open({
        templateUrl: 'app/admin/page/create.html',
        controller: 'AdminPageCreateCtrl',
        resolve: {
          pages: function() {
            return $scope.pages;
          }
        }
      });
    };

    $scope.edit = function(page) {
      var modalInstance = $modal.open({
        templateUrl: 'app/admin/page/edit.html',
        controller: 'AdminPageEditCtrl',
        size: 'lg',
        resolve: {
          pages: function() {
            return $scope.pages;
          },
          page: function() {
            return page;
          }
        }
      });

      modalInstance.result.then(function() {
        $scope.pages = Page.query();
      });
    };

    $scope['delete'] = Modal.confirm['delete'](function(page) { // callback when modal is confirmed
      Page.remove({ id: page._id });
      angular.forEach($scope.pages, function(p, i) {
        if (p === page) {
          $scope.pages.splice(i, 1);
        }
      });
    });

  });
