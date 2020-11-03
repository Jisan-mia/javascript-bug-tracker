document.getElementById('issueInputForm').addEventListener('submit', saveIssue);


//saving or setting issues in localStorage 
function saveIssue(e){
	let issueDesc = document.getElementById('issueDescInput').value;
	let issueSeverity = document.getElementById('issueSeverityInput').value;
	let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	let issueOpen = document.getElementById('issueOpneCount').innerText;
	let issueOpenCount = parseInt(issueOpen) + 1;
	let issueClose = document.getElementById('issueCloseCount').innerText;
	let issueCloseCount = parseInt(issueClose);

	let issueId = chance.guid();
	let issueStatus = 'Open';

	let issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus,
		
	}

	let tableCount = {
		open: issueOpenCount,
		close: issueCloseCount
	}

	

	// if any input field is empty then nothing will do else do the following
	if(issueDesc == "" || issueAssignedTo == ""){

	}else{
			// getting else setting statistics table count to localStorage
		if(localStorage.getItem('tableCounts') == null){
			let tableCounts = [];
			tableCounts.push(tableCount);
			localStorage.setItem('tableCounts', JSON.stringify(tableCounts))
		}
		else{
			let tableCounts = JSON.parse(localStorage.getItem('tableCounts'))
			tableCounts.push(tableCount);
			localStorage.setItem('tableCounts', JSON.stringify(tableCounts));
		}

		//issues
		if(localStorage.getItem('issues') == null ){
			let issues = [];
			issues.push(issue);
			localStorage.setItem('issues', JSON.stringify(issues));
		}else{
			let issues = JSON.parse(localStorage.getItem('issues'));
			issues.push(issue);
			localStorage.setItem('issues', JSON.stringify(issues));
		}

		document.getElementById('issueInputForm').reset();

		fetchIssues();
	}

	e.preventDefault();
	
}


//when user close an issue this will happen
function setStatusClosed(id){
	let issues = JSON.parse(localStorage.getItem('issues'));
	let tableCounts = JSON.parse(localStorage.getItem('tableCounts'));

	for(let i = 0; i < tableCounts.length; i++){
		for(let j = 0; j < issues.length; j++){
			if(issues[j].id == id){
				if(issues[j].status == "Open"){
					tableCounts[i].open = tableCounts[i].open - 1;
					tableCounts[i].close = tableCounts[i].close + 1; 
				}
			}
		}
	}


	for( let i = 0; i < issues.length; i++){
		if(issues[i].id == id){

			issues[i].status = 'Closed';

			issues[i].description = `<s> ${issues[i].description} </s>`
		}
	}

	localStorage.setItem('tableCounts', JSON.stringify(tableCounts));
	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}


//when user delete an issue 
function deleteIssue(id){
	let issues = JSON.parse(localStorage.getItem('issues'));
	let tableCounts = JSON.parse(localStorage.getItem('tableCounts'));
	console.log(tableCounts);
	console.log(issues);

	// if the current issue is closed then decrement 1 from the closeCount
	// or if  the current issue is open then decrement 1 from the openCount
	for(let j = 0; j < tableCounts.length; j++){
		for(let i = 0; i < issues.length; i++){
			if(issues[i].id == id){
				if(issues[i].status == "Closed"){
					tableCounts[j].close = tableCounts[j].close - 1;
				}
				else if(issues[i].status == 'Open'){
					tableCounts[j].open = tableCounts[j].open - 1;
				}
			}
		}
		if(tableCounts[tableCounts.length -1].open == 0 && tableCounts[tableCounts.length -1].close == 0){
			console.log("restert");
			tableCounts.splice( 0,tableCounts.length )
			localStorage.clear();
		}
		
	}

	



	for(let i = 0; i < issues.length; i++){
		if(issues[i].id == id){
			issues.splice(i, 1);

		}
	}



	localStorage.setItem('tableCounts', JSON.stringify(tableCounts))
	localStorage.setItem('issues', JSON.stringify(issues));


	fetchIssues();
}


//fetching or getting issues and other information from the browser localStorage
function fetchIssues(){
	var issues = JSON.parse(localStorage.getItem('issues'));
	var tableCounts = JSON.parse(localStorage.getItem('tableCounts'))
	// console.log(tableCounts)

	let issuesList = document.getElementById('issuesList');
	// console.log(typeof issues, issues)

	issuesList.innerHTML = '';

	//showing close and open issue numer
	for(let i = 0; i < tableCounts.length; i++){
		let open = tableCounts[i].open;
		let close = tableCounts[i].close;
		document.getElementById('issueOpneCount').innerText = open;
		document.getElementById('issueCloseCount').innerText = close;
	}
	
	for(let i = 0; i < issues.length; i++){
		let id = issues[i].id;
		let desc = issues[i].description;
		let severity = issues[i].severity;
		let assignedTo = issues[i].assignedTo;
		let status = issues[i].status;


		//issue templete using string concatenation
		issuesList.innerHTML +=
		'<div class="tracker-area tracker-area px-4 py-3 m-3">'+
            '<h6>Issue ID: ' + id + '</h6>'+
            '<p><span class="status">' + status + '</span></p>'+
            '<h3 class="text-primary">' + desc + '</h3>'+
            '<p>🕐 ' + severity + '</p>'+
            '<p> <i class="fa fa-user"> </i> ' + assignedTo.charAt(0).toUpperCase() + assignedTo.slice(1) + '</p>'+
            '<button onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</button> '+
            '<button onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</button>'+
        '</div>';


        // using javascript template literal
        /*issuesList.innerHTML += `
        	<div class="jumbotron">
        		<h6>Issue Id: ${id}</h6>
        		<small> ${status}</small>
        		<h3> ${desc} </h3>
        		<p>🕐${severity}</p>
        		<p><i class="fa fa-user"> </i> ${assignedTo.charAt(0).toUpperCase() + assignedTo.slice(1)} </p>
        		<button onclick="setStatusClosed(${issues[i].id})" class="btn btn-warning">Close</button>
        		<button onclick="deleteIssue(${issues[i].id})" class="btn btn-danger">Delete</button>  
        	 </div>
        `*/

	}
}

//reset
function resetAllIssue(){
	console.log("localStorge clear")

	document.getElementById('issueOpneCount').innerText = "0";
	document.getElementById('issueCloseCount').innerText = "0";
	localStorage.clear();
 
	document.getElementById('issuesList').innerHTML = '';
}

