/********************************************************************************
 **
 ** SCORM API Wrapper
 **
 ** Supports:
 **
 ** SCORM 1.2, SCORM 2004.[1]
 **
 ** The following is a porting of the code from the
 ** original angularjs-scorm-wrapper file to Angular with a
 ** number of improvements from
 ** Competentum
 **
 ** The code has been updated to wrap the original functions in
 ** in angular and extend support for SCORM 2004 [4].
 ** It draws upon some of concepts offered in the Pipewerks[3]
 **
 ** The code is served as an Angular service [5].
 **
 ** References/Inspiration:
 **
 ** [1] ADL
 ** http://www.adlnet.gov/scorm
 **
 ** [2] CTC SCORM SCORM 1.2 API wrapper
 ** http://www.adlnet.gov/resources/scorm-1-2-content-packages?type=software_downloads
 **
 ** [3] Pipewerks SCORM wrapper
 ** https://github.com/pipwerks/scorm-api-wrapper
 **
 ** [4] SCORM.com
 ** http://scorm.com/scorm-explained/technical-scorm/run-time/
 **
 ** [5] Angularjs scorm wrapper
 ** https://github.com/patamechanix/angularjs-scorm-wrapper
 **
 ** Copyright (c) Competentum 2017
 ** Copyright (c) Aleksey Klimenko
 ** ---------------------------------------------------------------------------------
 ** License:
 **
 **
 ** Permission is hereby granted, free of charge, to any person obtaining a
 ** copy of this software and associated documentation files (the “Software”),
 ** to deal in the Software without restriction, including without limitation the
 ** rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 ** copies of the Software, and to permit persons to whom the Software is furnished to
 ** do so, subject to the following conditions:
 **
 ** The above copyright notice and this permission notice shall be included in
 ** all copies or substantial portions of the Software.
 **
 ** THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 ** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 ** FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 ** COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 ** IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 ** CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **
 *********************************************************************************/
import { Inject, Injectable } from '@angular/core';

// export class ScormWindow extends Window {
//   public API: object;
//   public API_1484_11: object;
// }

export interface ScormWindow {
  // Allow us to put arbitrary objects in window
  [key: string]: any;
}

export type ApiCallFunctionType = (param?: string,
                                   value?: string) => void | string | number | boolean;

@Injectable()
export class ScormWrapperService {
  private version = 'Auto';
  private API: object = null;
  private scormVersions = ['Auto', '1.2', '2004'];
  private win: ScormWindow;

  public setAPIVersion(scormVersion: string) {

    scormVersion = scormVersion || 'Auto';

    const v = this.scormVersions.indexOf(scormVersion.toString());
    (v > -1) ? this.version = this.scormVersions[v] : console.log('Not found, default to Auto');
    return this.version;
  }

  get APIVersion() {
    return this.version;
  }

  get isAvailable() {
    return true;
  }

  get LMSIsInitialized() {
    return this.API;
  }

  public doLMSInitialize() {
    return this.cmiBooleanToJs(this.getAPICall('LMSInitialize', 'Initialize')(''));
  }

  public doLMSFinish() {
    return this.cmiBooleanToJs(this.getAPICall('LMSFinish', 'Terminate')(''));
  }

  public doLMSGetValue(parameter: string) {
    return this.getAPICall('LMSGetValue', 'GetValue')(parameter);
  }

  public doLMSSetValue(parameter: string, value: string) {
    return this.cmiBooleanToJs(this.getAPICall('LMSSetValue', 'SetValue')(parameter, value));
  }

  public doLMSCommit() {
    return this.cmiBooleanToJs(this.getAPICall('LMSCommit', 'Commit')(''));
  }

  public doLMSGetLastError() {
    return this.getAPICall('LMSGetLastError', 'GetLastError')();
  }

  public doLMSGetErrorString(errorCode: number) {
    return this.getAPICall('LMSGetErrorString', 'GetErrorString')(errorCode.toString());
  }

  public doLMSGetDiagnostic(errorCode: number) {
    return this.getAPICall('LMSGetDiagnostic', 'GetDiagnostic')(errorCode.toString());
  }

  public ErrorHandler() {
    return this.getAPICall('LMSGetLastError', 'GetLastError')();
  }

  public cmiBooleanToJs(value: number | string | boolean | void): boolean {
    return (value === '1' || value === 1 || value === 'true' || value === true);
  }

  public getAPIHandle() {

    if (this.win.parent && this.win.parent !== this.win) {
      this.findAPI(this.win.parent as ScormWindow);
    }

    if (!this.API && this.win.top.opener) {
      this.findAPI(this.win.top.opener);
    } else if (!this.API) {
      console.log('Unable to find API adapter');
    }
  }

  public getAPICall(funcname12: string,
                    funcname2004: string): ApiCallFunctionType {

    if (!this.API) {
      this.getAPIHandle();
      if (!this.API) {
        return () => console.log(`No API found, can\'t execute: ${funcname12} or ${funcname2004}`);
      }
    }

    switch (this.version) {
      case '2004':
        return function() {
          return this.API[funcname2004].apply(this.API, arguments);
        };

      case '1.2':
        return function() {
          return this.API[funcname12].apply(this.API, arguments);
        };
    }
  }

  private findAPI(win: ScormWindow) {

    let findAttempts = 0;
    const findAttemptLimit = 500;

    for (findAttempts; findAttempts < findAttemptLimit; findAttempts++) {

      if (win.API && (this.version === '1.2' || this.version === 'Auto' )) {
        this.API = win.API;
        this.version = '1.2';
        break;
      } else if (win.API_1484_11 && (this.version === '2004' || this.version === 'Auto' )) {
        this.API = win.API_1484_11;
        this.version = '2004';
        break;
      } else if (win.parent && win.parent !== win) {
        findAttempts++;
        win = win.parent as ScormWindow;
      }
    }
  }
}
