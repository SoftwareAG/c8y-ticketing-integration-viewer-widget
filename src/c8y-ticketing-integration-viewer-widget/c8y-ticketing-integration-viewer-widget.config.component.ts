/*
* Copyright (c) 2019 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License. 
 */
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IFetchOptions, IFetchResponse } from '@c8y/client';
import { AlertService } from '@c8y/ngx-components';
import { FetchClient } from '@c8y/ngx-components/api';
import * as _ from 'lodash';

@Component({
    selector: "c8y-ticketing-integration-viewer-widget-config-component",
    templateUrl: "./c8y-ticketing-integration-viewer-widget.config.component.html",
    styleUrls: ["./c8y-ticketing-integration-viewer-widget.config.component.css"]
})
export class CumulocityTicketingIntegrationViewerWidgetConfig implements OnInit, OnDestroy {

    @Input() config: any = {};

    constructor(private fetchClient: FetchClient, private alertService: AlertService) {}

    ngOnInit(): void {
        try {
            
        } catch(e) {
            this.alertService.danger("Ticketing Integration Viewer Widget Config - ngOnInit()", e);
        }
    }

    ngOnDestroy(): void {
        //unsubscribe from observables here
    }

}