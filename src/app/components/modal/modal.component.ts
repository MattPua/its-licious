import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild, OnDestroy, Renderer2} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit , OnDestroy{
  @Input() title: string;
  @Input() shouldShow: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @ViewChild('modal') modalRef: ElementRef;
  @ViewChild('background') backgroundRef: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(document.querySelector('html'), 'overflow', 'hidden');
  }

  ngOnDestroy() {
    this.renderer.setStyle(document.querySelector('html'), 'overflow', 'initial');
  }

  onCloseModal() {
    this.modalRef.nativeElement.classList.add('rollOut');
    this.backgroundRef.nativeElement.classList.add('zoomOut');


    setTimeout(() => {
      this.closeModal.emit();
      this.modalRef.nativeElement.classList.remove('rollOut');
      this.backgroundRef.nativeElement.classList.remove('zoomOut');
    }, 500);
  }

}
