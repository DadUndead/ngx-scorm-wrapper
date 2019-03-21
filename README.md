# `ngx-scorm-wrapper` - Scorm wrapper service for angular projects

This project is based on AngularJS version which can be found here: https://github.com/patamechanix/angularjs-scorm-wrapper

[![Build Status](https://travis-ci.org/DadUndead/ngx-scorm-wrapper.svg?branch=master)](https://travis-ci.org/DadUndead/ngx-scorm-wrapper)
[![codecov](https://codecov.io/gh/DadUndead/ngx-scorm-wrapper/branch/master/graph/badge.svg)](https://codecov.io/gh/DadUndead/ngx-scorm-wrapper)
[![npm version](https://badge.fury.io/js/ngx-scorm-wrapper.svg)](https://badge.fury.io/js/ngx-scorm-wrapper)

## Quick start
Install (check out the demo implementation -> [ngx-scorm-wrapper-demo](https://github.com/DadUndead/ngx-scorm-wrapper-demo))

```$xslt
npm i ngx-scorm-wrapper
```

Add ```ScormWrapperService``` to your module ```providers```.
```$xslt
import { ScormWrapperModule } from 'ngx-scorm-wrapper';

@NgModule({
  imports: [
    ScormWrapperModule
  ],
  declarations: [
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}
```
You can use the ScormWrapperService in any of your components (after you added it to the providers in your app.module). Just add the service to your component class constructor like:

```
constructor(private scormWrapperService: ScormWrapperService)
```

You can now use the methods found here: [angularjs-scorm-wrapper](https://github.com/patamechanix/angularjs-scorm-wrapper)
