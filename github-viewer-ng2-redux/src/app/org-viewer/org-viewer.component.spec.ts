import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OrgViewerComponent } from './org-viewer.component';

describe('Component: OrgViewer', () => {
    let builder: TestComponentBuilder;

    beforeEachProviders(() => [OrgViewerComponent]);
    beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([OrgViewerComponent],
        (component: OrgViewerComponent) => {
            expect(component).toBeTruthy();
        }));

    it('should create the component', inject([], () => {
        return builder.createAsync(OrgViewerComponentTestController)
            .then((fixture: ComponentFixture<any>) => {
                let query = fixture.debugElement.query(By.directive(OrgViewerComponent));
                expect(query).toBeTruthy();
                expect(query.componentInstance).toBeTruthy();
            });
    }));
});

@Component({
    selector: 'test',
    template: `
    <app-org-viewer></app-org-viewer>
  `,
    directives: [OrgViewerComponent]
})
class OrgViewerComponentTestController {
}

