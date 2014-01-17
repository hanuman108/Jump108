define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/network/network.html',
    'public/js/collections/user'
], function($, _, Backbone, thisTemplate, Item){

    var thisView = Backbone.View.extend({
        el: $('#container'),
        collection: new Item(),
        render: function(){

            this.collection.fetch()

            var data = {
                user: this.collection.models
                , _ : _
            };

            var compiledTemplate = _.template( thisTemplate, data );
            this.$el.html( compiledTemplate );
        }
    });

    return thisView;
});