'use strict';

angular.module('speechBubbleApp')
  .controller('AdminProductSoftwareEditCtrl', function($scope, $modalInstance, Product, Supplier, current, ProductOptions, ProductLinks, ProductVideos, ProductImages, growl) {

    $scope.product = current;
    $scope.devices = ProductOptions.devices;
    $scope.speechOptions = ProductOptions.speech;
    $scope.symbols = ProductOptions.symbols;
    $scope.supplierOptions = [];
    $scope.vocabularyOptions = [];
    $scope.deviceOptions = [];
    $scope.images = ProductImages($scope);
    $scope.productLinks = ProductLinks($scope);
    $scope.videos = ProductVideos($scope);

    $scope.revisions = current._revisions;
    $scope.revisionsPerPage = 5;
    $scope.currentPage = 1;

    $scope.$watch('imagesToUpload', $scope.images.add);

    $scope.refreshSuppliers = function(term) {
      Supplier.query({ term: term, limit: 0, skip: 0 }, function(res) {
        $scope.supplierOptions = res.items;
      });
    };

    $scope.refreshVocabularies = function(term) {
      Product.query({ type: 'ProductVocabulary', term: term, limit: 0, skip: 0 }, function(res) {
        $scope.vocabularyOptions = res.items;
      });
    };

    $scope.refreshDevices = function(term) {
      Product.query({ type: 'ProductHardwareAdvanced', term: term, limit: 0, skip: 0 }, function(res) {
        $scope.deviceOptions = res.items;
      });
    };

    $scope.$watch('product.features.dedicated', function() {
      $scope.refreshDevices();
    });

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };

    $scope.save = function(form) {
      $scope.submitted = true;
      if($scope.product && form.$valid) {
        if($scope.product._id) {
          Product.update($scope.product,
            function(res) {
              $modalInstance.close();
              growl.success('Product updated.');
            },
            function(res) {
              growl.error('An error occurred.');
            });
        } else {
          Product.create($scope.product,
            function(res) {
              angular.copy(res.toJSON(), $scope.product);
              $modalInstance.close();
              growl.success('Product created.');
            },
            function(res) {
              growl.error('An error occurred.');
            });
        }
      }
    };

  });
