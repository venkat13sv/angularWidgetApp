import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CaseSearchComponent } from './case-search/case-search.component';
import { CaseService } from './case-search/case.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CaseSearchComponent,
],
  imports: [
    BrowserModule,
	HttpClientModule
  ],
  providers: [CaseService],
  bootstrap: [],
  entryComponents: [
    CaseSearchComponent
  ]

})
export class AppModule {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(CaseSearchComponent, { injector });
    customElements.define('case-search', customElement);
  }

  ngDoBootstrap() { }
}
