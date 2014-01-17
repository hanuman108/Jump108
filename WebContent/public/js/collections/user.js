define([
    'underscore',
    'backbone',
    'public/js/models/user',
    'public/js/libs/backbone/localStorage'
], function(_, Backbone, UserModel){

    var UserCollection = Backbone.Collection.extend({
        model: UserModel
        , localStorage: new Backbone.LocalStorage("user")
    });

    return UserCollection;
});