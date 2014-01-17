require.config({
    paths: {
        jquery:         'public/js/libs/jquery/jquery',
        underscore:     'public/js/libs/underscore/underscore',
        backbone:       'public/js/libs/backbone/backbone',
        router:         'public/js/router',
        text:           'public/js/libs/require/text',
        json2:          'public/js/libs/json/json2',
        bootstrap: 		'public/js/libs/bootstrap/bootstrap.min',
        templates:      '../views'
    },

    shim: {
        'backbone': {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        }
    }
});

require(['public/js/app'], function(app) {
    app.initialize();
});
