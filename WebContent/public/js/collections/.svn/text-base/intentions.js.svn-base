define([
    'underscore',
    'backbone',
    'public/js/models/intent',
    'public/js/libs/backbone/localStorage'
], function(_, Backbone, AspirationModel){

    var AspirationModel = Backbone.Collection.extend({
        model: AspirationModel
        , idAttribute:"_id"
        , localStorage: new Backbone.LocalStorage("intentions")
    });

    return AspirationModel;
});