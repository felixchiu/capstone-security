(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .directive("sdInquiriesAuthz", InquiriesAuthzDirective);

  InquiriesAuthzDirective.$inject = [];

  function InquiriesAuthzDirective() {
    var directive = {
        bindToController: true,
        controller: InquiryAuthzController,
        controllerAs: "vm",
        restrict: "A",
        scope: {
          authz: "="
        },
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
      console.log("InquiriesAuthzDirective", scope);
    }
  }

  InquiryAuthzController.$inject = ["$scope",
                                  "spa-demo.authn.Authn"];
  function InquiryAuthzController($scope, InquiryAuthz) {
    var vm = this;
    vm.authz={};

  //  vm.newItem=newItem;

  //capstone project test
    vm.authz.authenticated = false;
    vm.authz.canCreate = false;
    vm.authz.canQuery = false;
    vm.authz.canUpdate = false;
    vm.authz.canDelete = false;
    vm.authz.canGetDetails = false;
    vm.authz.canUpdateItem = canUpdateItem;

    InquiryAuthzController.prototype.resetAccess = function() {
      this.authz.canCreate = false;
      this.authz.canQuery = true;
      this.authz.canUpdate = false;
      this.authz.canDelete = false;
      this.authz.canGetDetails = true;
    }

     activate();
     return;
     ////////////
     function activate() {
        vm.resetAccess();
        $scope.$watch(InquiryAuthz.getCurrentUser, newUser);
  //     vm.newItem(null);
     }
  //
  //   function newItem(item) {
  //     InquiriesAuthz.getAuthorizedUser().then(
  //       function(user){ authzUserItem(item, user); },
  //       function(user){ authzUserItem(item, user); });
  //   }
  //
  //   function authzUserItem(item, user) {
  //     console.log("new Item/Authz", item, user);
  //
  //     vm.authz.authenticated = InquiryAuthz.isAuthenticated();
  //     vm.authz.canQuery      = InquiryAuthz.canQuery();
  //     vm.authz.canCreate     = InquiryAuthz.canCreate();
  //     if (item && item.$promise) {
  //       vm.authz.canUpdate      = false;
  //       vm.authz.canDelete      = false;
  //       vm.authz.canGetDetails  = false;
  //       vm.authz.canUpdateInquiry = false;
  //       vm.authz.canRemoveInqury = false;
  //       item.$promise.then(function(){ checkAccess(item); });
  //     } else {
  //       checkAccess(item);
  //     }
  //   }
  //
  //   function checkAccess(item) {
  //     vm.authz.canUpdate     = InquiryAuthz.canUpdate(item);
  //     vm.authz.canDelete     = InquiryAuthz.canDelete(item);
  //     vm.authz.canGetDetails = InquiryAuthz.canGetDetails(item);
  //     vm.authz.canUpdateInquiry = InquiryAuthz.canUpdateInquiry(item);
  //     vm.authz.canRemoveInquiry = InquiryAuthz.canRemoveInquiry(item);
  //     console.log("checkAccess", item, vm.authz);
  //   }
  //
    function newUser(user, prevUser) {
      console.log("newUser=",user,",prev=",prevUser);
      vm.authz.canQuery = true;
      vm.authz.authenticated = InquiryAuthz.isAuthenticated();
      if (vm.authz.authenticated) {
        vm.authz.canCreate = true;
        vm.authz.canUpdate = true;
        vm.authz.canDelete = true;
        vm.authz.canGetDetails = true;
      } else {
        vm.resetAccess();
      }
    }
     function canUpdateItem(item) {
       return InquiryAuthz.isAuthenticated();
       //return InquiryAuthz.canUpdate(item);
     }
   }
})();
