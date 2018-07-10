import { Directive, Input, TemplateRef, ViewContainerRef, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Directive({
    selector: '[jsonSchema]'
})
export class JsonLdSchemaDirective implements OnChanges {

  constructor(private _sanitizer: DomSanitizer) { }


  @Input('jsonSchema') schemas: Object[] = [];
  @HostBinding('innerHTML') jsonLD: SafeHtml;

  ngOnChanges(changes: SimpleChanges) {
    this.jsonLD = this.getSafeHTML(changes.schemas.currentValue);
  }

  getSafeHTML(value: Object[]) {
    const json = value ? value.map((v) => JSON.stringify(v, null, 2).replace(/<\/script>/g, '<\\/script>')) : '';
    const html = `<script type="application/ld+json">${json}</script>`;
    // TODO: anything we need to worry about for SSR?
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
