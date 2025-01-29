import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
// import { DashboardComponent } from './dashboard.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SharedModule } from '@shared/shared.module';
import { LeadsModule } from '@modules/leads/leads.module';
import { ReportModule } from '@modules/report/report.module';
import { WithdrawModule } from '@modules/withdraw/withdraw.module';


@NgModule({
  declarations: [
    // MyDashboardComponent,
    // AnalyticsComponent,
    // DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    MatProgressSpinnerModule,

    LeadsModule,ReportModule,WithdrawModule
  ]
})
export class DashboardModule { }
