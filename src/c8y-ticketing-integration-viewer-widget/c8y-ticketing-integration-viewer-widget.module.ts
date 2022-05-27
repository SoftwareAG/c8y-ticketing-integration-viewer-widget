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

import { CoreModule, HOOK_COMPONENTS } from "@c8y/ngx-components";
import { CumulocityTicketingIntegrationViewerWidgetConfig } from "./c8y-ticketing-integration-viewer-widget.config.component";
import { CumulocityTicketingIntegrationViewerWidget } from "./c8y-ticketing-integration-viewer-widget.component";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule, ThemeService } from "ng2-charts";
import { PaginationModule } from "ngx-bootstrap/pagination";

@NgModule({
    imports: [CoreModule, HttpClientModule, ChartsModule, PaginationModule],
    declarations: [CumulocityTicketingIntegrationViewerWidget, CumulocityTicketingIntegrationViewerWidgetConfig],
    entryComponents: [CumulocityTicketingIntegrationViewerWidget, CumulocityTicketingIntegrationViewerWidgetConfig],
    providers: [
        {
            provide: HOOK_COMPONENTS,
            multi: true,
            useValue: {
                id: "global.presales.c8y.ticketing.integration.viewer.widget",
                label: "Ticketing Integration Viewer",
                description: "To configure",
                component: CumulocityTicketingIntegrationViewerWidget,
                configComponent: CumulocityTicketingIntegrationViewerWidgetConfig,
                previewImage: require("@widget-assets/img-preview.png"),
                data: {
                    ng1: {
                        options: { noDeviceTarget: false, deviceTargetNotRequired: true },
                    },
                },
            },
        },
        ThemeService
    ],
})
export class CumulocityTicketingIntegrationViewerWidgetModule { }
