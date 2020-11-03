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
		open: issueOpenCount,
		close: issueCloseCount
	}

	// if any input field is empty then nothing will do else do the following
	if(issueDesc == "" || issueAssignedTo == ""){

	}else{
		if(localStorage.getItem('issues') == null){
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

	issues.close +=  1;
	issues.open -= 1;

	for( let i = 0; i < issues.length; i++){
		if(issues[i].id == id){

			issues[i].status = 'Closed';

			issues[i].description = `<s> ${issues[i].description} </s>`
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}


//when user delete an issue 
function deleteIssue(id){
	let issues = JSON.parse(localStorage.getItem('issues'));
	console.log(issues)

	// if(issues[i].close != 0){
		// 	issues[i].close = issues[i].close - 1;
	// }
	// if(issues.open != 0){
		
	// }
	// else{
	// 	issues.open = issues[i].open - 1;
	// }
	issues.open = issues.open - 1;
	console.log(issues.open);

	for(let i = 0; i < issues.length; i++){
		if(issues[i].id == id){
			issues.splice(i, 1);
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));


	fetchIssues();
}


//fetching or getting issues and other information from the browser localStorage
function fetchIssues(){
	var issues = JSON.parse(localStorage.getItem('issues'));
	let issuesList = document.getElementById('issuesList');
	console.log(typeof issues, issues)

	issuesList.innerHTML = '';

	for(let i = 0; i < issues.length; i++){
		let id = issues[i].id;
		let desc = issues[i].description;
		let severity = issues[i].severity;
		let assignedTo = issues[i].assignedTo;
		let status = issues[i].status;

		let open = issues[i].open;
		let close = issues[i].close;

		document.getElementById('issueOpneCount').innerText = open;
		document.getElementById('issueCloseCount').innerText = close;

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