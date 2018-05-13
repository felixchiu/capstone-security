(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdInquirySelector", {
      templateUrl: inquirySelectorTemplateUrl,
      controller: InquirySelectorController,
       bindings: {
         authz: "<"
       },
     })
    .component("sdInquiryEditor", {
      templateUrl: inquiryEditorTemplateUrl,
      controller: InquiryEditorController,
      bindings: {
        authz: "<"
      },
    //   require: {
      //    inquiriesAuthz: "^sdInquiriesAuthz"
      //  }
    });


  inquirySelectorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function inquirySelectorTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.inquiry_selector_html;
  }
  inquiryEditorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function inquiryEditorTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.inquiry_editor_html;
  }

  InquirySelectorController.$inject = ["$scope",
                                      "$stateParams",
                                      "spa-demo.authz.Authz",
                                      "spa-demo.subjects.Inquiry"];
  function InquirySelectorController($scope, $stateParams, Authz, Inquiry) {
    var vm=this;

    vm.$onInit = function() {
      console.log("InquirySelectorController",$scope);
       $scope.$watch(function(){ return Authz.getAuthorizedUserId(); },
                     function(){
                       if (!$stateParams.id) {
                         vm.items = Inquiry.query();
                       }
                     });
    }
    return;
    //////////////
  }


  InquiryEditorController.$inject = ["$scope","$q",
                                   "$state", "$stateParams",
                                   "spa-demo.authz.Authz",
                                   "spa-demo.subjects.Inquiry",
                                   ];
  function InquiryEditorController($scope, $q, $state, $stateParams,
                                 Authz, Inquiry) {
    var vm=this;
    // vm.selected_linkables=[];
    vm.create = create;
    vm.clear  = clear;
    vm.update  = update;
    vm.remove  = remove;
    // vm.linkThings = linkThings;

    vm.$onInit = function() {
      console.log("InquiryEditorController",$scope);
      $scope.$watch(function(){ return Authz.getAuthorizedUserId(); },
                    function(){
                      if ($stateParams.id) {
                        reload($stateParams.id);
                      } else {
                        newResource();
                      }
                    });
    }
    return;
    //////////////
    function newResource() {
      console.log("newResource()");
      vm.item = new Inquiry();
      //vm.inquiriesAuthz.newItem(vm.item);
      return vm.item;
    }

    function reload(inquiryId) {
      var itemId = inquiryId ? inquiryId : vm.item.id;
      console.log("re/loading inquiry", itemId);
      vm.item = Inquiry.get({id:itemId});
    //  vm.inquiriesAuthz.newItem(vm.item);
      $q.all([vm.item.$promise]).catch(handleError);
    }

    function clear() {
      newResource();
      $state.go(".", {id:null});
    }

    function create() {
      vm.item.$save().then(
        function(){
           $state.go(".", {id: vm.item.id});
        },
        handleError);
    }

    function update() {
      vm.item.errors = null;
      var update=vm.item.$update().then(
        function(){
          console.log("update complete", vm.item);
          $scope.inquiryform.$setPristine();
          $state.reload();
          //reload();
        },
        handleError);
    //  linkThings(update);
    }
    //
    // function linkThings(parentPromise) {
    //   var promises=[];
    //   if (parentPromise) { promises.push(parentPromise); }
    //   angular.forEach(vm.selected_linkables, function(linkable){
    //     var resource=InquiryThing.save({image_id:vm.item.id}, {thing_id:linkable});
    //     promises.push(resource.$promise);
    //   });
    //
    //   vm.selected_linkables=[];
    //   console.log("waiting for promises", promises);
    //   $q.all(promises).then(
    //     function(response){
    //       console.log("promise.all response", response);
    //       $scope.imageform.$setPristine();
    //       reload();
    //     },
    //     handleError);
    // }
    //
    function remove() {
      vm.item.errors = null;
      vm.item.$delete().then(
        function(){
          console.log("remove complete", vm.item);
          clear();
        },
        handleError);
    }


    function handleError(response) {
      console.log("error", response);
      if (response.data) {
        vm.item["errors"]=response.data.errors;
      }
      if (!vm.item.errors) {
        vm.item["errors"]={}
        vm.item["errors"]["full_messages"]=[response];
      }
      $scope.inquiryform.$setPristine();
    }
  }

})();
