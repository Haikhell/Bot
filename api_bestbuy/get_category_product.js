module.exports = async function getCategory(name) {
  return bby.categories(`name=${name}`, { show: 'all' }).then(function(data) {
    // The util package is loaded to print the complete object structure
    //console.log(require('util').inspect(data, false, null));
    return data.categories[0].path;
  });
};
