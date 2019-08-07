var bby = require('bestbuy')('');
/// get Product
async function getProduct(id) {
  return bby.products(`categoryPath.id=${id}`, { show: 'name,url,image,productId' }).then(function(data) {
    return data;
  });
}
module.exports.getCategory = async function getCategory(name) {
  return bby.categories(`name=${name}`, { show: 'all' }).then(function(data) {
    console.log(name);
    // The util package is loaded to print the complete object structure
    //console.log(require('util').inspect(data, false, null));
    console.log(data.categories);
    return data.categories[0].path;
  });
};

/// get all elemets category
module.exports.getObjElem = async function getObjElem(masiv) {
  let elements = [];

  for (let index = 0; index < masiv.length; index++) {
    var data = await getProduct(masiv[index].id);
    for (let i = 0; i < data.products.length; i++) {
      let temp = {};
      elements.push({
        title: data.products[i].name,
        image_url: data.products[i].image,
        buttons: [
          {
            type: 'web_url',
            url: data.products[i].url,
            title: 'View Website'
          },
          {
            type: 'postback',
            title: 'Add to favorite',
            payload: data.products[i].productId
          }
        ]
      });
    }
  }
  return elements;
};
// async function myFunc(params) {
//   var a = 'DVD Players';
//   return bby.categories('name=DVD Players', { show: 'all' }).then(function(data) {
//     // The util package is loaded to print the complete object structure
//     //console.log('sasd');
//     //console.log(require('util').inspect(data, false, null));

//     bby.products(`categoryPath.id=cat00000`, { show: 'name,url,image,productId' }).then(function(data) {
//       console.log(data);
//     });
//   });
// }
