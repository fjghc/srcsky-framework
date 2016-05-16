define("common/support/response", ["../support/constants", "../services/topic"], function (constants) {
  function preHandler(result, $injector, isFormatter, errorNotify) {
    if (result.status == constants.response.httpSuccess) {
      var data = result.data;
      if (data.code == constants.response.success) {
        return isFormatter == true ? data : data.data;
      }
      if (!errorNotify)return;
      var promise;
      if ($injector) {
        $injector.invoke(["topicService", function (topicService) {
          promise = topicService.publish(constants.event.showResponseErrorMessage, data, true);
        }])
      } else {
        promise = data.data;
      }
      return promise
    }
  }
  function preHandlerNoDialog(result, $injector, isFormatter) {
    if (result.status == constants.response.httpSuccess) {
      var data = result.data;
      if (data.code == constants.response.success) {
        return isFormatter === true ? data : data.data;
      }
      if ($injector) {
        $injector.invoke(["$q", function ($q) {
          return $q.defer().promise
        }])
      }
    }
  };
  return {preHandler: preHandler, preHandlerNoDialog: preHandlerNoDialog}
})
