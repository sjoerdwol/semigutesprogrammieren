const login = require('../public/javascripts/login.js')
const loginOnClick = require('../public/javascripts/login.js')
const loginRequest = require('../public/javascripts/login.js')

test('return false when username empty string', () => {
    expect(login("", "testPW")).toBe(false)
})

test('return false when password empty string', () => {
    expect(login("testUN", "")).toBe(false)
})

test('correctly execute login through loginOnClick', () => {
    expect(loginOnClick("", "")).toBe(false)
    expect(loginOnClick("Peter", "Maffay")).toBe(true)
})
