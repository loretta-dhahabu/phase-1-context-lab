/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord ( [ firstNm, familyNm, title, payRatePerHour ] )
{
   return {
     firstName: firstNm,
     familyName: familyNm,
     title: title,
     payPerHour: payRatePerHour,
     timeInEvents: [],
     timeOutEvents: [],
   };
 }

function createEmployeeRecords ( employeeRecArray )
{
   let employeeRecords = [];
   for (let employeeRec of employeeRecArray) {
     employeeRecords.push(createEmployeeRecord(employeeRec));
   }
   return employeeRecords;
 }

 function createTimeInEvent(dateStamp) {
   const date = dateStamp.slice(0, 10);
   const hour = parseInt(dateStamp.slice(11));
   const newTimeIn = {
     type: "TimeIn",
     hour: hour,
     date: date,
   };
   this.timeInEvents.push(newTimeIn);
   return this;
 }

function createTimeOutEvent ( dateStamp )
{
   const date = dateStamp.slice(0, 10);
   const hour = parseInt(dateStamp.slice(11));
   const newTimeOut = {
     type: "TimeOut",
     hour: hour,
     date: date,
   };
   this.timeOutEvents.push(newTimeOut);
   return this;
 }

 function hoursWorkedOnDate(dateStamp) {
   let hoursWorked;
   let hourIn;
   let hourOut;
   this.timeInEvents.forEach((timeIn) => {
     if (timeIn.date === dateStamp) {
       hourIn = timeIn.hour / 100;
     }
   });
   this.timeOutEvents.forEach((timeOut) => {
     if (timeOut.date === dateStamp) {
       hourOut = timeOut.hour / 100;
     }
   });
   hoursWorked = hourOut - hourIn;
   return hoursWorked;
 }

 function wagesEarnedOnDate(dateStamp) {
   const hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
   const wagesEarned = hoursWorked * this.payPerHour;
   return wagesEarned;
 }


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName ( srcArray, firstName )
{
  let result;
  srcArray.forEach((src) => {
    if (src["firstName"] === firstName) {
      result = src;
    }
  });
  return result;
}

function calculatePayroll ( employeeRecArray )
{
  let totalPayOwed = 0;
  employeeRecArray.forEach((employeeRec) => {
    totalPayOwed += allWagesFor.call(employeeRec);
  });
  return totalPayOwed;
}


