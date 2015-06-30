/// <reference path="../../../typings/angularjs/angular.d.ts"/>

'use strict'

module Preporg.Core.Infrastructure {
    export class AppCtrl {
        public foo:string;

        constructor() {
            this.foo = 'bar';
        }
    }
}

angular.module('<%= angularModule %>.core.infrastructure').controller('appCtrl', Preporg.Core.Infrastructure.AppCtrl);
