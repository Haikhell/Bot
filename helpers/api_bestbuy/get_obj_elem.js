const bby = require('bestbuy')(process.env.BESTBUY_API_TOKEN);

/// get 8 products by id
module.exports.getProduct = async function getProduct(id, page) {
  try {
    let data = await bby.products(`categoryPath.id=${id}`, {
      show: 'name,url,image,sku,salePrice',
      page: page,
      pageSize: 8
    });
    return data.products;
  } catch (error) {
    return null;
  }
};
module.exports.getButtonsCategory = async function getButtonsCategory(masiv, page, nameCategory) {
  try {
    const lengthOfPart = 8;
    let buttonsObj = [];
    const lastElement = masiv.length - lengthOfPart * (+page + 1) > 0 ? lengthOfPart * (+page + 1) : masiv.length;
    if (page != 0) {
      buttonsObj.push({
        title: 'previe',
        payload: `previe_${+page - 1}_${nameCategory}`
      });
    }
    for (let i = page * lengthOfPart; i < lastElement; i++) {
      let obj = {};
      obj['title'] = masiv[i].name;
      obj['payload'] = masiv[i].id;
      buttonsObj.push(obj);
    }
    if (lastElement != masiv.length) {
      buttonsObj.push({
        title: 'next',
        payload: `next_${+page + 1}_${nameCategory}`
      });
    }
    return buttonsObj;
  } catch (error) {
    return null;
  }
};

module.exports.getPlaginProduct = async function getPlaginProduct(masiv, page, idCategory, n, what) {
  try {
    let buttonsObj = [];
    if (page > 1) {
      buttonsObj.push({
        title: 'Previe',
        buttons: [
          {
            type: 'postback',
            title: 'Previe',
            payload: `previe_${+page - 1}_${idCategory}_${what}`
          }
        ]
      });
    }
    for (let i = 0; i < masiv.length; i++) {
      buttonsObj.push({
        title: masiv[i].name,
        image_url: masiv[i].image,
        subtitle: `Price ${masiv[i].salePrice}`,
        buttons: await buttonFormate(masiv[i], n)
      });
    }
    if (masiv.length === 8) {
      buttonsObj.push({
        title: 'Next',
        buttons: [
          {
            type: 'postback',
            title: 'Next',
            payload: `next_${+page + 1}_${idCategory}_${what}`
          }
        ]
      });
    }

    return buttonsObj;
  } catch (error) {
    return null;
  }
};

module.exports.getCategory = async function getCategory(name) {
  let data = await bby.categories(`name=${name}`, { show: 'all' });
  return data.categories[0].subCategories;
};

module.exports.getObjElement = async function getObjElement(masiv) {
  let elements = [];
  for (let index = 0; index < masiv.length; index++) {
    var data = await getProduct(masiv[index].id);
    for (let i = 0; i < data.products.length; i++) {
      elements.push({
        name: data.products[i].name,
        sku: data.products[i].sku,
        image_url: data.products[i].image,
        price: data.products[i].salePrice,
        url: data.products[i].url
      });
    }
  }
  return elements;
};

async function buttonFormate(element, n) {
  if (n === 1) {
    return [
      {
        type: 'web_url',
        url: element.url,
        title: 'Details'
      },
      {
        type: 'postback',
        title: 'buy',
        payload: element.sku
      }
    ];
  } else if (n === 2) {
    return [
      {
        type: 'web_url',
        url: element.url,
        title: 'Details'
      }
    ];
  } else {
    return [
      {
        type: 'web_url',
        url: element.url,
        title: 'Details'
      },
      {
        type: 'postback',
        title: 'Add to favorite',
        payload: element.sku
      }
    ];
  }
}
