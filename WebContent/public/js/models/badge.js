define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var BadgeModel = Backbone.Model.extend({
        defaults: {
            name : ""
            , type : ""
            , description : ""
        }
    });

    return BadgeModel;
});