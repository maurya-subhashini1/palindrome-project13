function reversString(str) {
    var splitStr = str.split("")
    var reversStr = splitStr.reverse()
    var joinStr = reversStr.join("")
    return (joinStr)
 
 
 }
 
 
 function isPalindrome(str) {
    var reverse = reversString(str)
    return str === reverse
 }
 
 
 function convertDateToStr(date) {
    var dateStr = {
       day: '',
       month: '',
       year: ''
    }
 
 
    if (date.day < 10) {
       dateStr.day = '0' + date.day
    } else {
       dateStr.day = date.day.toString()
    }
    if (date.month < 10) {
       dateStr.month = '0' + date.month
    } else {
       dateStr.month = date.month.toString()
    }
 
    dateStr.year = date.year.toString()
 
    return dateStr
 
 }
 
 
 function getAllDateInString(date) {
    var dateStr = convertDateToStr(date)
 
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day
 
    return [ddmmyyyy, mmddyyyy, yymmdd, ddmmyy, mmddyy, yyymmdd]
 }
 
 
 function checkpalindromeForAll(date) {
    var listOfpolindromes = getAllDateInString(date)
    var flag = false
    for (i = 0; i < listOfpolindromes.length; i++) {
       if (isPalindrome(listOfpolindromes[i])) {
          flag = true
          break
       }
 
    }
    return flag
 }
 
 function leapYear(year) {
    if (year % 400) {
       return true
    } else if (year % 100 === 0) {
       return false
    } else if (year % 4 === 0) {
       return false
    }
    return false
 
 }
 
 function getNextDate(date) {
    var day = date.day + 1 //incriment day
    var month = date.month
    var year = date.year
    var daysIsMOnth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // check for the february
    if (month === 2) {
       if (leapYear(year)) { //check for feb
          if (day > 29) {
             day = 1
             month++
          }
       } else {
          if (day > 28) {
             day = 1
             month++
          }
       }
 
    } else { //chaeck if the day the max day in month
       if (day > daysIsMOnth[month - 1]) { //16>31?
          day = 1
          month++ //incerment month
       }
    }
 
    // increment year if month is greater than 12
    if (month > 12) {
       month = 1
       year++
    }
 
    return {
       day: day,
       month: month,
       year: year
    }
 }
 
 function getNextPalindrome(date) {
    var cunter = 0
    var nextDate = getNextDate(date)
 
    while (1) {
       cunter++
       var isPalindrome = checkpalindromeForAll(nextDate)
       if (isPalindrome) {
          break
       }
       nextDate = getNextDate(nextDate)
    }
    return [cunter, nextDate]
 }
 
 
 
 const dateInput = document.querySelector("#boday-input")
 const clickButton = document.querySelector("#show-btn")
 const showResult = document.querySelector("#result")
 
 
 function clickHandler(e) {
 
    var bodyString = dateInput.value
    if (bodyString !== "") {
       var listOfDate = bodyString.split('-')
       var date = {
          day: Number(listOfDate[2]),
          month: Number(listOfDate[1]),
          year: Number(listOfDate[0])
       }
       var isPalindrome = checkpalindromeForAll(date)
       if (isPalindrome) {
          showResult.innerText = "Yay! your birthday is a palindrome!🥳🥰"
       } else {
          var [cunter, nextDate] = getNextPalindrome(date)
          showResult.innerText = `The next palindrome date is:${nextDate.day}-${nextDate.month}-${nextDate.year} you missed it by ${cunter} days!😒`
       }
    }
 
 }
 
 clickButton.addEventListener("click", clickHandler)