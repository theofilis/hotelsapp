(function(){
  'use strict';

  angular.module('analysis')
         .service('analysisService', ['$q', AnalysisService]);

  /**
   * Analysis DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function AnalysisService($q){
    
    // Promise-based API
    return {
      loadAllAnalysis : function() {
        // Simulate async nature of real remote calls
        return $q.when([]);
      }
    };
  }

})();
