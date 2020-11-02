const issueDescription = document.getElementById('descripton');
const issueSeverity = document.getElementById('severity');
const issueResponsible = document.getElementById('responsible');
const addIssueBtn = document.getElementById('add-issue-btn');

/*function getSeverityOptionValue(sel){
	let opt;
	for(let i = 0; i < sel.options.length; i++){
		opt = sel.options[i];
		if(opt.selected === true){
			break;
		}
	}
	return opt.value;
}
*/

addIssueBtn.addEventListener('click', function(e){
	e.preventDefault();

	if(issueDescription.value == '' || issueSeverity.value == '' || issueResponsible.value == ''){

	}
	else{
		let severityValue = issueSeverity.value
	console.log(severityValue);
	

	let issueTrackerArea = document.getElementById('issue-tracker-area')

	issueTrackerArea.innerHTML += `
	<div id="tracker-area" class="tracker-area px-4 py-3 m-3">
        <div class="container">
          <small >Issue Id: <span id="issueId"></span></small>
          <br>
          <small id="current-condition"> Open </small>

          <h3 id="tracker-issue-description" class="text-primary">${issueDescription.value} </h3>
          <p>Severity: <b>${issueSeverity.value}</b></p>
          <p>Responsible: <b> ${issueResponsible.value.charAt(0).toUpperCase() + issueResponsible.value.slice(1)}</b></p>

          <button onclick="closeIssue()" id="close-btn" class="btn btn-warning mr-2">Close</button>
          <button onclick="deleteIssue()" id="delete-btn" class="btn btn-danger">Delete</button>
        </div>

     </div>
      `
      
		
		issueDescription.value = '';
		issueSeverity.value = "Low"
		issueResponsible.value = '';
	}


})


function closeIssue(){
	let currentCondition = document.getElementById('current-condition');
	let trackerIssueDescription = document.getElementById('tracker-issue-description');
	trackerIssueDescription.innerHTML = `<s> ${trackerIssueDescription.innerHTML}</s>`

	currentCondition.innerHTML = 'Closed'
}

function deleteIssue(){
	console.log("delete button clicked")
	const trackerArea = document.getElementById('tracker-area');
	trackerArea.style.display = 'none';
}