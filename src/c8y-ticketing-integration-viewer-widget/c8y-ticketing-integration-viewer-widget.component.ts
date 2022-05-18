/**
 * /*
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
 *
 * @format
 */

import { Component, Input, OnInit } from '@angular/core';
import { IFetchOptions, IFetchResponse } from '@c8y/client';
import { AlertService } from '@c8y/ngx-components';
import { FetchClient } from '@c8y/ngx-components/api';
import * as _ from 'lodash';
import { Ticket } from './ticket';


@Component({
    selector: "lib-c8y-ticketing-integration-viewer-widget",
    templateUrl: "./c8y-ticketing-integration-viewer-widget.component.html",
    styleUrls: ["./c8y-ticketing-integration-viewer-widget.component.css"],
})
export class CumulocityTicketingIntegrationViewerWidget implements OnInit {

    @Input() config;

    public showTickets: string = "table";

    public tickets: Ticket[];

    constructor(private fetchClient: FetchClient, private alertService: AlertService) {
    }

    async ngOnInit(): Promise<void> {
        try {
            let deviceId = "";
            if(this.config.device !== undefined) {
                deviceId = this.config.device.id;
            }
            
            this.showTickets = this.config.customwidgetdata.showTickets;
            if(this.showTickets === undefined || this.showTickets === null || this.showTickets === "") {
                throw new Error("showTickets is blank.");
            }
            if(this.showTickets === "table") {
                this.tickets = await this.fetchTickets(deviceId);
            } else {
                let statusLength = this.config.customwidgetdata.status.length;
                console.log(statusLength);
                for(let i=0; i<statusLength; i++) {
                    if(this.config.customwidgetdata.status[i].id === undefined || this.config.customwidgetdata.status[i].id === null || this.config.customwidgetdata.status[i].id === "") {
                        throw new Error("Status id cannot be blank.");
                    }
                    if(this.config.customwidgetdata.status[i].label === undefined || this.config.customwidgetdata.status[i].label === null || this.config.customwidgetdata.status[i].label === "") {
                        throw new Error("Status label cannot be blank.");
                    }
                    this.config.customwidgetdata.status[i].tickets = await this.fetchTickets(deviceId, this.config.customwidgetdata.status[i].id);                    
                }
            }
        } catch(e) {
            console.log("Ticketing Integration Viewer Widget - ngOnInit() "+e);
        }
    }

    private async fetchTickets(deviceId?: string, statusId?: string): Promise<Ticket[]> {
        let url: string = "/service/ticketing/tickets";
        if(deviceId !== undefined && deviceId !== null && deviceId !== "") {
            url = url + "?deviceId="+deviceId;
        }
        if(statusId !== undefined && statusId !== null && statusId !== "") {
            if(url.indexOf("?") > -1) {
                url = url + "&statusId="+statusId;
            } else {
                url = url + "?statusId="+statusId;
            }
        }
        let fetchResp: IFetchResponse = await this.fetchClient.fetch(url);
        if(fetchResp.status === 200) {
            let jsonResp = await fetchResp.json();
            return jsonResp;
        } else {
            console.log("Ticketing Integration Viewer Widget - "+fetchResp.status);
            return [];
        }
    }

}
