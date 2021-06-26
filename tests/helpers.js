const User = require('../model/user');

global.app = {
  'locals': {
    'db': {
      'getUser': async username => {
        if (username && username.length > 14 && username.substring(0, 14) == 'existing-user-') {
          return new User(username, username + '-password');
        } else {
          return null;
        }
      }
    }
  }
};

global.arrayContainsOnlyObjectsWithSchema = (arr, schema) => {
  if (!Array.isArray(arr) || typeof schema !== 'object' || schema === null) {
    return false;
  }

  let result = true;
  arr.forEach(el => {
    if (result) {
      result = result && validateObjectWithSchema(el, schema);
    }
  });
  return result;
};

global.validateObjectWithSchema = (obj, schema) => {
  if (typeof obj !== 'object' || obj === null || typeof schema !== 'object' || schema === null) {
    return false;
  }
	let result = true;
	Object.keys(schema).forEach(key => {
    if (result) {
      if (typeof obj[key] === 'object') {
        result = result && validateObjectWithSchema(obj[key], schema[key]);
      } else if (!(typeof obj[key] === schema[key])) {
        result = false;
      }
    }
  });
  return result;
};
