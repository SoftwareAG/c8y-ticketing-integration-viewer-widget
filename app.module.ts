import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule as NgRouterModule } from "@angular/router";
import { UpgradeModule as NgUpgradeModule } from "@angular/upgrade/static";
import { CoreModule, HOOK_COMPONENTS, RouterModule } from "@c8y/ngx-components";
import { DashboardUpgradeModule, UpgradeModule, HybridAppModule, UPGRADE_ROUTES } from "@c8y/ngx-components/upgrade";
import { AssetsNavigatorModule } from "@c8y/ngx-components/assets-navigator";
import { CockpitDashboardModule } from "@c8y/ngx-components/context-dashboard";
import { ReportsModule } from "@c8y/ngx-components/reports";
import { SensorPhoneModule } from "@c8y/ngx-components/sensor-phone";
import { CumulocityTicketingIntegrationViewerWidget } from './src/c8y-ticketing-integration-viewer-widget/c8y-ticketing-integration-viewer-widget.component';
import { CumulocityTicketingIntegrationViewerWidgetConfig } from './src/c8y-ticketing-integration-viewer-widget/c8y-ticketing-integration-viewer-widget.config.component';
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TicketCommentModal } from "./src/c8y-ticketing-integration-viewer-widget/modal/ticket-comment-modal.component";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    BrowserAnimationsModule,
        RouterModule.forRoot(),
        NgRouterModule.forRoot([...UPGRADE_ROUTES], { enableTracing: false, useHash: true }),
        CoreModule.forRoot(),
        AssetsNavigatorModule,
        ReportsModule,
        NgUpgradeModule,
        DashboardUpgradeModule,
        CockpitDashboardModule,
        SensorPhoneModule,
        UpgradeModule,
        PaginationModule,
        ModalModule
  ],
  declarations: [CumulocityTicketingIntegrationViewerWidget, CumulocityTicketingIntegrationViewerWidgetConfig, TicketCommentModal],
  entryComponents: [CumulocityTicketingIntegrationViewerWidget, CumulocityTicketingIntegrationViewerWidgetConfig, TicketCommentModal],
  providers: [{
    provide: HOOK_COMPONENTS,
    multi: true,
    useValue: [
      {
        id: 'global.presales.c8y.ticketing.integration.viewer.widget',
        label: 'Ticketing Integration Viewer',
        description: 'To configure',
        component: CumulocityTicketingIntegrationViewerWidget,
        configComponent: CumulocityTicketingIntegrationViewerWidgetConfig,
        previewImage: require("@widget-assets/img-preview.png"),
        data: {
          ng1: {
              options: { noDeviceTarget: false, deviceTargetNotRequired: true },
          },
        },
      }
    ]
  }],
})
export class AppModule extends HybridAppModule {
  constructor(protected upgrade: NgUpgradeModule) {
    super();
  }
}
