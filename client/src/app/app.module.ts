import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { DateAdapter, MatButtonModule, MatIconModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
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


registerLocaleData(localeFr, 'fr', localeFrExtra);

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
    MatMomentDateModule,

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
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: AUTH_AUTHENTICATION_SERVICE, useClass: AuthenticationService },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
