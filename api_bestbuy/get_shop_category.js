var bby = require('bestbuy')(process.env.BESTBUY_API_TOKEN);
/// get all categories
module.exports = function shopFunc() {
  let buttonObj = [];
  return bby.categories({ show: 'all' }).then(function(data) {
    for (let index = 0; index < data.categories.length; index++) {
      let tempObj = {};
      tempObj['title'] = data.categories[index].name;
      tempObj['payload'] = data.categories[index].name;
      buttonObj.push(tempObj);
    }

    return buttonObj;
  });
};
