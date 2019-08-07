async function getObjElem(masiv) {
  let obj = [];
  console.log(masiv);
  for (let index = 0; index < masiv.length; index++) {
    bby.products(`categoryPath.id=${masiv[index].id}`, { show: 'url,image,name' }).then(function(data) {
      let temp = {};
      console.log('_-_-_---');
      console.log(data);
      temp['title'] = data.products.name;
      temp['image_url'] = data.products.image;
      temp['default_action'] = {
        type: 'web_url',
        url: data.products.url,
        messenger_extensions: true
      };
      obj.push(temp);
    });
  }
  return obj;
}
