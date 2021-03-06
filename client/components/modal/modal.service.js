'use strict';

angular.module('speechBubbleApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {
        /**
         * Create a function to open a confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} fn - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        'submit': function(fn) {
          fn = fn || angular.noop;

          /**
           * Open a confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              revision = args.shift(),
              confirmModal;

            confirmModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Publish',
                html: '<p>Are you sure you want to publish <strong>' + revision + '</strong>?</p>',
                buttons: [{
                  classes: 'btn-primary',
                  text: 'Publish',
                  click: function(e) {
                    confirmModal.close(e);
                  }
                }, {
                  classes: 'btn-tertiary',
                  text: 'Cancel',
                  click: function(e) {
                    confirmModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            confirmModal.result.then(function(event) {
              fn.apply(event, args);
            });
          };
        },
        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        'delete': function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-primary',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-tertiary',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
