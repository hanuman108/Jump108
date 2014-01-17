define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/dashboard/dashboard.html',
    'public/js/collections/user',
    'public/js/collections/intentions',
    'text!views/dashboard/dashboardItem.html',
    'bootstrap'
], function($, _, Backbone, thisTemplate, UserCollection, IntentionCollection, DashboardItem, bootstrap){
	
    var thisView = Backbone.View.extend({
        el: $('#container'),
        collection: new UserCollection(),
        intentionCollection: new IntentionCollection(),
        dashBoardItem: _.template(DashboardItem),

        events: {
            "click .add-intent"  : "create"
            , "click .expand-icon" : "expand"
            , "click .delete" : "deleteItem"
            , "focus .new-intent" : "showAdd"	
            , "click .complete-icon" : "updateStatus"
            , "click .cancel-intent" : "removeAdd"	
            , "click .list-item-complete" : "showPopover"	
        },
        
        getUrlParam : function(name) {
        	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        	var regexS = "[\\?&]"+name+"=([^&#]*)";
        	var regex = new RegExp( regexS );
        	var results = regex.exec( window.location.href );
        	if( results == null ){
        		return "";
        	}else{
        		return results[1];
        	}
        }
        
        , showPopover: function(el){
  
        	// $(el.target).popover('show');
        	
        }

        , updateStatus: function(el){
        	var $thisItem = $(el.target);
        	
        	$.ajax({
        		data : {
        			id : $thisItem .attr('data-item-id')
        		}
        		, type: "post"
        		, dataType: 'json'
        		, url: "dashboard.htm?action=updateStatus"
        		, success : function(data){
        			var $thisParent = $thisItem.closest('.list-group-item')
        				, $listItemComplete = $thisParent.siblings('.list-item-complete:eq(0)');
        			
        			$listItemComplete.append(
        				'<div class="label-complete label-'+ data.data.type.toLowerCase() +'"></div> '
        			);
        			
        			$listItemComplete.find('.no-data').remove();
        			$thisParent.remove();
        			
        		}	
        	});
        }
        
        , showAdd: function(el){
        	var $this = $(el.target);
        	$this.addClass('expanded');
        	$this.siblings('.add-bar').removeClass('hidden');
        }
       
        , removeAdd: function(el){       	
        	var $this
        		, $addBar;
       
        	if (el.target) {
        		$this = $(el.target);
        	} else {
        		$this = el;
        	}
        	
        	$addBar = $this.closest('.add-bar');
        	$addBar.next('.new-intent').val('').removeClass('expanded');
        	$addBar.addClass('hidden');
        }
        
        , deleteItem: function(el){
            var $thisDelete = $(el.target);

            $.ajax({
        		data : {
        			id : $thisDelete.attr('data-item-id')
        		}
        		, type: "post"
        		, dataType: 'json'
        		, url: "dashboard.htm?action=deleteIntent"
        		, success : function(data){}	
        	});
            
            $thisDelete.closest('.list-group-item').remove();
            $('#created-points').html(parseInt($('#created-points').html()) - 1);
        }

        , addOne: function(item, $addElem){

            $('#' + item.category + '-body .list-item-complete').before(this.dashBoardItem(item));
            $('#created-points').html(parseInt($('#created-points').html()) + 1);
            
            $('#description').val('');
            this.removeAdd($addElem);
        },

        create: function(el) {
        	
        	var $that = this
        		, $addElem = $(el.target)
        		, category = ''
        		, $typeField       		
        		, $addBar;
        	
        	$addBar = $addElem.closest('.add-bar'); 
        	$typeField = $addBar.find('.type-field');
        	if ($addElem.attr('data-category')) {
        		category = $addElem.attr('data-category');
        	} else {
        		category = $('#category-field').val();
        	}
        	
        	$.ajax({
        		data : {
        			description : $addBar.next('.new-intent').val()
        			, category : category
        			, type : $typeField.val()
        			, status : "open"
        			, privacy : "public"
        			, userId : this.getUrlParam('id')
        		}
        		, type: "post"
        		, dataType: 'json'
        		, url: "dashboard.htm?action=saveIntent"
        		, success : function(data){
        			
        			// Add the new model to the dom
                    $that .addOne(data.data, $addElem);
        			
        		}	
        	});

        },

        expand: function(el) {

            var $el = $(el.target)
                , $container = $('#' + $el.data('body-id'));

            if ($el.hasClass('glyphicon-plus')) {
                $el.removeClass('glyphicon-plus');
                $el.addClass('glyphicon-minus');

                $el.parent().removeClass('collapsed');
                $container.removeClass('hidden');
            } else {
                $el.addClass('glyphicon-plus');
                $el.removeClass('glyphicon-minus');

                $el.parent().addClass('collapsed');
                $container.addClass('hidden');
            }

        },

        render: function(){
            var allCategories = {}
            	, numIntentions = 0
            	, suggestions = []
                , compiledTemplate  
                , completed = 0
                , viewData
                , $that;

            $that = this;
            allCategories = {
            	'Career' : {
            		'name' : 'Career'
            		, 'open' : []	
            		, 'complete' : []
            		, 'count' : 0
            	}
            	, 'Relationships' : {
            		'name' : 'Relationships'
            		, 'open' : []	
            		, 'complete' : []	
            		, 'count' : 0
            	}
            	, 'Spiritual' : {
            		'name' : 'Spiritual'
                	, 'open' : []	
            		, 'complete' : []
            		, 'count' : 0
            	}
            	, 'Physical' : {
            		'name' : 'Physical'
            		, 'open' : []	
            		, 'complete' : []
            		, 'count' : 0
            	}
            };
     
        	console.log('yo')

            $.getJSON("dashboard.htm?action=loadUser&id=" + this.getUrlParam('id'), function(data){	

            	console.log('yo')
            	// TODO: For something
            	for (var i=0, item; item=data.user.intentions[i]; i++) {

            		if (!item.category) {
            			continue;
            		}
            		
	                if (!allCategories[item.category]) {
	                    allCategories[item.category] = {};
	                    allCategories[item.category].name = item.category;
	                    allCategories[item.category].data = [];
	                }
	
	                if (item.status == 'Complete') {
	                	allCategories[item.category].complete.push(item);
	                } else {
	                	allCategories[item.category].open.push(item);
	                }
	               
	                allCategories[item.category].count++;

            	}
            
            	console.log(data);
            	for (var i=0, item; item=data.suggestions[i]; i++) {

            		console.log(item);
            		suggestions.push(item);
            		if (i==4) {
            			break;
            		}

            	}
            
            	
                viewData = {
                    user: { name : 'test', occupation : 'other' }
                    , categories: allCategories
                    , suggestions: suggestions
                    , created: numIntentions
                    , completed: completed
                    , _ : _
                };
                
                compiledTemplate = _.template( thisTemplate, viewData );
                $that.$el.html( compiledTemplate );
            });
            
        }
    });

    return thisView;
});