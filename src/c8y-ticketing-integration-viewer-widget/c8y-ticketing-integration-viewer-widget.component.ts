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
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Ticket } from './ticket';


@Component({
    selector: "lib-c8y-ticketing-integration-viewer-widget",
    templateUrl: "./c8y-ticketing-integration-viewer-widget.component.html",
    styleUrls: ["./c8y-ticketing-integration-viewer-widget.component.css"],
})
export class CumulocityTicketingIntegrationViewerWidget implements OnInit {

    @Input() config;

    public tickets: Ticket[] = [];
    public paginatedTickets: Ticket[] = [];
    public totalTicketsPerPage: number = 1;

    private countByStatusLabels: string[] = [];
    private countByStatusDatapoints: number[] = []

    private countByPriorityLabels: string[] = [];
    private countByPriorityDatapoints: number[]= [];

    private chartColors = [];

    constructor(private fetchClient: FetchClient, private alertService: AlertService) {
    }

    ngOnInit() {
        try {
            let deviceId = "";
            if(this.config.device !== undefined) {
                deviceId = this.config.device.id;
            }
            this.totalTicketsPerPage = this.config.customwidgetdata.table.pageSize;
            this.chartColors = this.config.customwidgetdata.chart.colors;
            this.fetchTickets(deviceId);
        } catch(e) {
            console.log("Ticketing Integration Viewer Widget - ngOnInit() "+e);
        }
    }

    private fetchTickets(deviceId?: string, statusId?: string): void {
        let url: string = "/service/ticketing/tickets";
        if(deviceId !== undefined && deviceId !== null && deviceId !== "") {
            url = url + "?deviceId="+deviceId;
        }
        let fetchResp: Promise<IFetchResponse> = this.fetchClient.fetch(url);
        fetchResp.then((resp: IFetchResponse) => {
            if(resp.status === 200) {
                resp.json().then((jsonResp) => {
                    this.tickets = jsonResp;
                    this.paginatedTickets = jsonResp.slice(0, this.totalTicketsPerPage);

                    if(this.config.customwidgetdata.chart.show) {
                        this.tickets.forEach((ticket) => {
                            let statusFoundIndex = this.findEntryInStatus(ticket.status);
                            if(statusFoundIndex === -1) {
                                this.countByStatusLabels.push(ticket.status);
                                this.countByStatusDatapoints.push(1);
                            } else {
                                this.countByStatusDatapoints[statusFoundIndex] = this.countByStatusDatapoints[statusFoundIndex] + 1;
                            }
    
                            let priorityFoundIndex = this.findEntryInPriority(ticket.priority);
                            if(priorityFoundIndex === -1) {
                                this.countByPriorityLabels.push(ticket.priority);
                                this.countByPriorityDatapoints.push(1);
                            } else {
                                this.countByPriorityDatapoints[priorityFoundIndex] = this.countByPriorityDatapoints[priorityFoundIndex] + 1;
                            }
                        });
                       
                        this.showPriorityChart();
                        this.showStatusChart();
                    }
                }).catch((err) => {
                    console.log("Ticketing Integration Viewer Widget - "+err);
                });
            } else {
                console.log("Ticketing Integration Viewer Widget - "+resp.status);
            }
        }).catch((err) => {
            console.log("Ticketing Integration Viewer Widget - "+err);
        });
    }

    public ticketsPageChanged(event: PageChangedEvent): void {
        const startItem = (event.page - 1) * this.totalTicketsPerPage;
        const endItem = event.page * this.totalTicketsPerPage;
        this.paginatedTickets = this.tickets.slice(startItem, endItem);
    }

    private showPriorityChart() {
        new Chart("priorityChart", {
            type: "pie",
            data: {
                labels: this.countByPriorityLabels,
                datasets: [{
                    data: this.countByPriorityDatapoints,
                    backgroundColor: this.chartColors
                }]
            },
            options: {
                legend: {
                    display: false
                }
            }
        });
    }

    private findEntryInStatus(status: string): number {
        let foundIndex: number = -1;
        for(let i=0; i<this.countByStatusLabels.length; i++) {
            if(status === this.countByStatusLabels[i]) {
                foundIndex = i;
                break;
            }
        }
        return foundIndex;
    }

    private findEntryInPriority(priority: string): number {
        let foundIndex: number = -1;
        for(let i=0; i<this.countByPriorityLabels.length; i++) {
            if(priority === this.countByPriorityLabels[i]) {
                foundIndex = i;
                break;
            }
        }
        return foundIndex;
    }

    private showStatusChart() {
        new Chart("statusChart", {
            type: "pie",
            data: {
                labels: this.countByStatusLabels,
                datasets: [{
                    data: this.countByStatusDatapoints,
                    backgroundColor: this.chartColors
                }]
            },
            options: {
                legend: {
                    display: false
                }
            }
        });
    }

}
