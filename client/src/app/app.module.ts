import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { fuseConfig } from 'app/app.config';
import { AUTH_AUTHENTICATION_SERVICE } from 'ngrx-auth-store';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthenticationService } from './core/services/authentication.service';
import { LayoutModule } from './layout/layout.module';
import { AppStoreModule } from './store/store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(),

    // Material
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    LayoutModule,

    AppStoreModule,

    AppRoutingModule,
  ],
  providers: [
    { provide: AUTH_AUTHENTICATION_SERVICE, useClass: AuthenticationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
