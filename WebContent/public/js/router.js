define([
    'jquery'
    , 'underscore'
    , 'backbone'
    , 'public/js/controllers/dashboard/dashboard'
    , 'public/js/controllers/profile/profile'
    , 'public/js/controllers/network/network'
], function($, _, Backbone, Dashboard, Profile, Network) {

    var Router = Backbone.Router.extend({
        routes: {
          '' : 'index'
          , 'dashboard' : 'index'
          , 'profile'   : 'profile'
          , 'network'   : 'network'
        },

	    index : function(){

            var dashboard = new Dashboard();
            dashboard.render();

	    }

	    , profile : function(){

            var profile = new Profile();
            profile.render();

	    }

        , network : function(){

            var network = new Network();
            network.render();

        }
    });

    return new Router();
});