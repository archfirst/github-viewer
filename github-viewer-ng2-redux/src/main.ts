import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provider } from 'ng2-redux';

import { GithubViewerAppComponent, environment } from './app/index';
import { createStoreInstance } from './app/shared/store/app.store';

if (environment.production) {
    enableProdMode();
}

const store = createStoreInstance();

bootstrap(GithubViewerAppComponent, [provider(store)]);
