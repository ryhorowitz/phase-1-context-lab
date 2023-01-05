function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(matrix) {
    return matrix.map( array => createEmployeeRecord(array))
}


function createTimeInEvent(dateStr) {
    const [ date, hour ] = dateStr.split(' ')
    const timeInEvent = {
        type: "TimeIn",
        hour: Number(hour),
        date: date
    }

    this.timeInEvents.push(timeInEvent)
    return this
}

function createTimeOutEvent(dateStr) {
    const [ date, hour ] = dateStr.split(' ')
    const timeOutEvent = {
        type: "TimeOut",
        hour: Number(hour),
        date: date
    }
    this.timeOutEvents.push(timeOutEvent)
    return this
}

function hoursWorkedOnDate(dateStr) {
    const timeInDateWorked = this.timeInEvents.find( event => event.date === dateStr)
    const timeOutDateWorked = this.timeOutEvents.find( event => event.date === dateStr)

    return (timeOutDateWorked.hour - timeInDateWorked.hour) / 100
}

function wagesEarnedOnDate(dateStr) {
    // console.log('this.pay', this.payPerHour)
    const hours = hoursWorkedOnDate.call(this, dateStr)
    return this.payPerHour * hours
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    // console.log('srcArray', srcArray)
   return srcArray.find( record => { return record.firstName === firstName})
}

function calculatePayroll(array) {
    return array.reduce( function(acc, cur) {
        return acc + allWagesFor.call(cur)
    }, 0)
}