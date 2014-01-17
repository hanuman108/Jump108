define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var UserModel = Backbone.Model.extend({
        defaults: {
            owner : ""
            , ownerId : ""
            , description : ""
            , type : ""
        }
    });

    return UserModel;
});