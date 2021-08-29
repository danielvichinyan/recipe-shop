import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // Close the dropdown from a click anywhere on the screen
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  // Close the dropdown only by a click on the dropdown
  // @HostBinding('class.open') isOpen = false;
  // @HostListener('click') toggleOpen() {
    // this.isOpen = !this.isOpen;
  // }

  constructor(private elementRef: ElementRef) { }

}
