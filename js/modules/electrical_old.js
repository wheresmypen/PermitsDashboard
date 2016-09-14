var Electrical = function Electrical(config){
	
	var clicker = [];        
	var records = [];
	var columnData = [];



	      /********************************************************************************/
	      /*
	      /* DATA GRAB
	      /*
	      /********************************************************************************/

	check = function(config){

		if (!config){

			var grabLast365 = PermitDashboard.cache.last365;
			console.log(grabLast365);

			requestJSONa(grabLast365, function(json) {

		        var records = json.records;
	            var eleRecords = clone(records); 

			    console.log(eleRecords, "#");

				switch (document.getElementById('monthList-dropdown-menu').value){

			  		case '1':
			    		eleRecords.forEach(function(record, inc, array) {
			     		record.AppliedDate = moment(record.AppliedDate).format('YYYY-MM-DD');
			    	});
			  		break;
			     
			  		default:
			   			eleRecords.forEach(function(record, inc, array) {
			    		record.AppliedDate = moment(record.AppliedDate).format('YYYY-MM');
			    		// console.log(record.AppliedDate, "*");
			  		})   

			  	}; 

			  	var initialStartDate = document.getElementById('monthList-dropdown-menu').value;

			  	var startDateMoment = moment().subtract(initialStartDate, 'M');

			 	console.log(startDateMoment);

				var appliedLast365Days = eleRecords.filter(function(d) { 
				   return moment(d.AppliedDate) > startDateMoment; 
				});


			  	var appliedLastYearByType = appliedLast365Days.filter(function(o) {
			    	return o.PermitTypeMapped === "Electrical";
			  	});

			  	permitTypes=[];

				//Get a distinct list of neighborhoods
				for (var i = 0; i < eleRecords.length; i++) {
				    permitTypes.push([eleRecords[i]["PermitType"], eleRecords[i].count]);
				}


				var appliedLast365Days = eleRecords.filter(function(d) { 
				   return moment(d.AppliedDate) > startDateMoment; 
				});
				    
				var appliedByDayByType = [];

				// compiles array for bar-graph
				var appliedByDayByType = d3.nest()

			    // concatenates date
			    .key(function(d) { return d.AppliedDate })

			    // concatanates type
			    .key(function(d) { return d.PermitType })

			    // takes the records and creates a count
			    .rollup (function(v) { return v.length })

			    // creates a d3 object from the records
			    .entries(appliedLastYearByType);

			    var subtypes = ["Commercial Electric", "Electrical Lift Station", "Electrical Re-Wiring", "Electrical Service Change", "Temporary Electrical Service", "Generator", "Solar Electrical System", "Other"];
			     
			    var output = [];

			    console.log(appliedLastYearByType);
			    console.log(appliedByDayByType);

			               
			  	subtypes.forEach(function(subtype) {
			      output[subtype] = appliedByDayByType.map(function(month) {
			          var o = {};
			          o[month.key] = month.values.filter(function(val) {
			            return val.key == subtype;
			          }).map(function(m) { return m.values; }).shift() || 0;
			          return o;
			        })
			    });


			    var dates = appliedByDayByType.map(function(date) {
			      return date.key;
			    });


			    columnData=[];
			    // console.log(columnData);

			    // dates.forEach(function(date, i){
			    //   var dArray = date;
			      // console.log(i);
				lcount=0;

				columnData = Object.keys(output).map(function(type) {
			        var a = output[type].map(function(month){
			          return month[Object.keys(month)[0]];
			        });
			        return [type].concat(a);
				});

				console.log(columnData);

				

			  	var returnObj = ([Object.keys(output)[0]]).concat(returnObj)
				  datesArray=[];
				  output[Object.keys(output)[0]].forEach(function(d, i) {
					    var dArray = [dates[i]];
				    	datesArray.push(dArray);
				});

			    console.log(datesArray);


			          /*  Within Reloaded Pie-Chart - Enables Selection Based On Type
			          /*
			          /*  DATA PLOT
			          /*
			          /************************************************************************************/



			    var chart = c3.generate({
		            bindto: '#byDay',
		            data: {
		              columns : columnData
		              ,
		              type: 'bar'//,
		            }, 
		            axis: {
		                y: {tick : {format: d3.format('d')}},
		                x: {
		                type: 'category',
		                categories: datesArray
		              }
		            }
		        });

				            
			});

			return columnData;

		}

		else {

			var grabLast365 = PermitDashboard.cache.last365;

			config = config.slice(1);

			requestJSONa(grabLast365, function(json) {

	            var records = json.records 
	            var eleRecords = clone(records); 

			    console.log(eleRecords, "#");

				switch (document.getElementById('monthList-dropdown-menu').value){

			  		case '1':
			    		eleRecords.forEach(function(record, inc, array) {
			     		record.AppliedDate = moment(record.AppliedDate).format('YYYY-MM-DD');
			    	});
			  		break;
			     
			  		default:
			   			eleRecords.forEach(function(record, inc, array) {
			    		record.AppliedDate = moment(record.AppliedDate).format('YYYY-MM');
			    		// console.log(record.AppliedDate, "*");
			  		})   

			  	}; 

			  	var initialStartDate = document.getElementById('monthList-dropdown-menu').value;

			  	var startDateMoment = moment().subtract(initialStartDate, 'M');

			 	console.log(startDateMoment);

				var appliedLast365Days = eleRecords.filter(function(d) { 
				   return moment(d.AppliedDate) > startDateMoment; 
				});




			  	var appliedLastYearByType = appliedLast365Days.filter(function(o) {
			    	return o.PermitTypeMapped === "Electrical";
			  	});

			  	permitTypes=[];

				//Get a distinct list of neighborhoods
				for (var i = 0; i < eleRecords.length; i++) {
				    permitTypes.push([eleRecords[i]["PermitType"], eleRecords[i].count]);
				}


				var appliedLast365Days = eleRecords.filter(function(d) { 
				   return moment(d.AppliedDate) > startDateMoment; 
				});
				    
				var appliedByDayByType = [];

				// compiles array for bar-graph
				var appliedByDayByType = d3.nest()

			    // concatenates date
			    .key(function(d) { return d.AppliedDate })

			    // concatanates type
			    .key(function(d) { return d.PermitType })

			    // takes the records and creates a count
			    .rollup (function(v) { return v.length })

			    // creates a d3 object from the records
			    .entries(appliedLastYearByType);

			    var subtypes = [config];
			     
			    var output = [];

			    console.log(appliedLastYearByType);
			    console.log(appliedByDayByType);

			               
			  	subtypes.forEach(function(subtype) {
			      output[subtype] = appliedByDayByType.map(function(month) {
			          var o = {};
			          o[month.key] = month.values.filter(function(val) {
			            return val.key == subtype;
			          }).map(function(m) { return m.values; }).shift() || 0;
			          return o;
			        })
			    });


			    var dates = appliedByDayByType.map(function(date) {
			      return date.key;
			    });


			    columnData=[];
				lcount=0;

				columnData = Object.keys(output).map(function(type) {
			        var a = output[type].map(function(month){
			          return month[Object.keys(month)[0]];
			        });
			        return [type].concat(a);
				});

				console.log(columnData);

				

			  	var returnObj = ([Object.keys(output)[0]]).concat(returnObj)
				  datesArray=[];
				  output[Object.keys(output)[0]].forEach(function(d, i) {
					    var dArray = [dates[i]];
				    	datesArray.push(dArray);
				});

		    console.log(datesArray);


		          /*  Within Reloaded Pie-Chart - Enables Selection Based On Type
		          /*
		          /*   DATA PLOT
		          /*
		          /************************************************************************************/



		    var chart = c3.generate({
	            bindto: '#byDay',
	            data: {
	              columns : columnData
	              ,
	              type: 'bar'//,
	            }, 
	            axis: {
	                y: {tick : {format: d3.format('d')}},
	                x: {
	                type: 'category',
	                categories: datesArray
	              }
	            }
	        });

			            
		});

		return columnData;

		}

	};

	columnData = check(config);

	console.log($('.btn-primary').attr('id'));
    document.getElementById("toggleWithPieClick").innerHTML= ("<span>Graph options - toggle between: <div class='btn-group' data-toggle='buttons'><label class='btn btn-primary btn-inline' id='"+ $('.btn-primary').attr('id') +"' style = 'display: inline-block'><input type='radio' class='innerSelectSub'> Totals </label><span style='display: inline-block' id='innerSelectSubs'><span>");

    $(".monthly-dropdown-menu").empty();
	$("#innerSelectSubs").append('<select id="elc-monthly-dropdown-menu" class="monthly-dropdown-menu" oninput ="SelectSubtype(value);"><option value="">ALL</option>'+
	                '<option value="elCommercial Electric">Commercial Electric</option>'+
	                '<option value="elElectrical Lift Station">Electrical Lift Station</option>'+
	                '<option value="elElectrical Re-Wiring">Electrical Re-Wiring</option>'+
	                '<option value="elElectrical Service Change">Electrical Service Change</option>'+
	                '<option value="elTemporary Electrical Service">Temporary Electrical Service</option>'+
	                '<option value="elGenerator">Generator</option>'+
	                '<option value="elSolar Electrical System">Solar Electrical System</option>'+
	                '<option value="elElectrical Other">Electical Other</option></select>');


	$("#uniqueSelector").on('select', $(".monthly-dropdown-menu"),
                          function (){
                            var selectedSubtype = this.querySelector("div").querySelector("span").querySelector("div").querySelector("label").id;
                            console.log(selectedSubtype);
                            ToggleBarGraph(selectedSubtype, toggleSubtype);
                          });

	$('#Electrical').text('Totals');

	var clickHole = document.getElementById("toggleWithPieClick").querySelector("span").querySelector("div").querySelector("label");

	$(clickHole).on('click', null, columnData, function(e){

		console.log(columnData);

		if (clicker%2 == 0){

			$('#elc-monthly-dropdown-menu').hide();
			$('#Electrical').text('Subtype(s)');

		    console.log(e);
		    console.log(e.target);
		        var chart = c3.generate({
		        bindto: '#byDay',
		        data: {
		          columns: [
		              window.returningObj
		          ],
		          type: 'bar',
		          colors: {
		           'Building': 'hsl(205, 70.6%, 41.4%)',
                   'Demolition': 'hsl(10, 30.2%, 42.2%)',
                   'Electrical': 'hsl(360, 69.2%, 49.6%)',
                   'Other': 'hsl(0, 0%, 49.8%)',
                   'Mechanical': 'hsl(120, 56.9%, 40.0%)',
                   'Roof': 'hsl(30, 100%, 50.2%)',
                   'Plumbing': 'hsl(271, 39.4%, 57.3%)' ,
                   'Pool/Spa': 'hsl(60, 69.5%, 43.7%)',
                   'Fence': 'hsl(186, 80%, 45.1%)',
                   'Grading': 'hsl(318, 65.9%, 67.8%)'
		          }
		        },
		        axis: {
		            y: {tick : {format: d3.format('d')}},
		            x: {
		            type: 'category',
		            categories: datesArray
		          }
		        }
		      })

		    }

   		   	else {

		        var chart = c3.generate({
		            bindto: '#byDay',
		            data: {
		              columns : columnData
		              ,
		              type: 'bar'//,
		            }, 
		            axis: {
		                y: {tick : {format: d3.format('d')}},
		                x: {
		                type: 'category',
		                categories: datesArray
		              	}
		            }
		        });

		    	$('#elc-monthly-dropdown-menu').show();

		    	$('#Electrical').text('Totals');
		    };



			clicker++;

		});

	return subtype;

};

window.Electrical = Electrical;