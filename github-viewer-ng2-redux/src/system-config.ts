/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {};

/** User packages configuration. */
const packages: any = {
    'ng2-redux': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'lib/index.js'
    },
    'redux': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'lib/index.js'
    },
    'redux-thunk': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'lib/index.js'
    },
    'rxjs': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'Rx.js'
    },
    'lodash': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    },
    'invariant': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'invariant.js'
    },
    'symbol-observable': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',

    // Thirdparty barrels.
    'rxjs',

    // App specific barrels.
    'app',
    'app/shared',
    'app/org-viewer',
    /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
    cliSystemConfigPackages[barrelName] = {main: 'index'};
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'invariant': 'vendor/invariant',
        'lodash': 'vendor/lodash',
        'ng2-redux': 'vendor/ng2-redux',
        'redux': 'vendor/redux',
        'redux-thunk': 'vendor/redux-thunk',
        'rxjs': 'vendor/rxjs',
        'symbol-observable': 'vendor/symbol-observable',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({map, packages});
