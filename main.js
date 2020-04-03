
window.onload=function(){
fetchIssues();
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
}

function saveIssue(e){
  console.log('heresss');
  var issueDesc = document.getElementById('issueDescInput').value;
  console.log(issueDesc);
  var issuePriority = document.getElementById('issuePriorityInput').value;
  console.log(issuePriority);
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  console.log(issueAssignedTo);
  var issueId = chance.guid();
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    description: issueDesc,
    priority: issuePriority,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if(localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }else{
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

function setStatusClosed(id){
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++){
    if(issues[i].id == id){
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function deleteIssue(id){
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++){
    if(issues[i].id == id){
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';
  if (issues){
    for(var i=0; i < issues.length; i++){
      var num = i+1;
      var id = issues[i].id;
      var desc = issues[i].description;
      var priority = issues[i].priority;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i]. status;

      issuesList.innerHTML += '<div class="card card-body bg-light my-2" >'+
                              '<p>' + num + '</p>'+
                              '<h6>Issue ID: ' + id + '</h6>' +
                              '<h3><span class="badge badge-info">'+ status + '</span></h3>'+
                              '<h3>' + desc + '</h3>' +
                              '<p><i class="fa fa-bell"></i> ' + priority + '</p>'+
                              '<p><i class="fa fa-user"></i> ' + assignedTo + '</p>'+
                              '<div class="btn-group"><a href="#" onClick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
                              '<a href="#" onClick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a></div>'+
                              '</div>';
    }
  }
}
