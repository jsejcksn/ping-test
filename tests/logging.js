var logData = [{date:'2016-05-15T03:35:29+00:00',reachable:true,timeSinceLast:'2m'},
{date:'2016-05-15T03:35:31+00:00',reachable:false,timeSinceLast:'0m'},
{date:'2016-05-15T03:36:04+00:00',reachable:true,timeSinceLast:'1m'},
{date:'2016-05-15T03:36:06+00:00',reachable:false,timeSinceLast:'0m'},
{date:'2016-05-15T03:37:12+00:00',reachable:true,timeSinceLast:'1m'}];

// console.log(logData.length);

logData.forEach(function (obj, ind, arr) {
  if (obj.reachable === false) {
    console.log(obj);
  }
});
