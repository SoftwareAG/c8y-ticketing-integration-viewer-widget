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
import * as _ from 'lodash';

@Component({
    selector: "c8y-ticketing-integration-viewer-widget-config-component",
    templateUrl: "./c8y-ticketing-integration-viewer-widget.config.component.html",
    styleUrls: ["./c8y-ticketing-integration-viewer-widget.config.component.css"]
})
export class CumulocityTicketingIntegrationViewerWidgetConfig implements OnInit, OnDestroy {

    @Input() config: any = {};

    public widgetConfig = {
        table: {
            showColumns: {
                ticketId: true,
                description: true,
                creationDate: true,
                lastUpdateDate: true,
                status: true,
                alarmId: true,
                deviceId: true,
                subject: true,
                priority: true
            },
            pageSize: 1
        },
        chart: {
            show: true,
            colors: ["#1776bf"]
        }
    };

    constructor() {}

    ngOnInit(): void {
        try {
            // Editing an existing widget
            if(_.has(this.config, 'customwidgetdata')) {
                this.widgetConfig = _.get(this.config, 'customwidgetdata');
            } else { // Adding a new widget
                _.set(this.config, 'customwidgetdata', this.widgetConfig);
            }
        } catch(e) {
           console.log("Ticketing Integration Viewer Widget Config - ngOnInit(): " + e);
        }
    }

    public addChartColor(): void {
        this.widgetConfig.chart.colors.push("#1776bf");
        this.updateConfig();
    }

    public removeChartColor(): void {
        this.widgetConfig.chart.colors.pop();
        this.updateConfig();
    }
    
    public updateConfig() {
        _.set(this.config, 'customwidgetdata', this.widgetConfig);
    }

    trackByFn(index, item) {
        return index;  
    }

    ngOnDestroy(): void {
        //unsubscribe from observables here
    }

}