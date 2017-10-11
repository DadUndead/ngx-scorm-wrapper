import {Injector} from '@angular/core';
import { ScormWrapperService } from './scorm-wrapper.service';
import {getTestBed, TestBed} from '@angular/core/testing';

describe('ScormWrapperService', () => {
  let injector: Injector;
  let sample: ScormWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScormWrapperService,
        {provide: Window, useValue: window}
      ]
    });
    injector = getTestBed();
    sample = injector.get(ScormWrapperService);
  });

  afterEach(() => {
    injector = undefined;
    sample = undefined;
  });

  it('is defined', () => {
    expect(ScormWrapperService).toBeDefined();
    expect(sample).toBeDefined();
    expect(sample instanceof ScormWrapperService).toBeTruthy();
  });
});
