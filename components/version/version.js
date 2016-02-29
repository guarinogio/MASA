'use strict';

angular.module('sarcFront.version', [
  'sarcFront.version.interpolate-filter',
  'sarcFront.version.version-directive'
])

.value('version', '0.1');
