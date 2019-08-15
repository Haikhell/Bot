var bby = require('bestbuy')(process.env.BESTBUY_API_TOKEN);

module.exports.searchById = async function searchProduct(id) {
  return bby.products(`sku=${id}`, { show: 'all' }).then(function(data) {
    let temp = {
      name: data.products[0].name,
      url: data.products[0].url,
      image: data.products[0].image,
      sku: data.products[0].sku,
      salePrice: data.products[0].salePrice
    };

    return temp;
  });
};
