function getItems(listName,queryParam) {
  if(!queryParam) queryParam='';
  var endPoint = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/getbytitle('" + listName + "')/items" + queryParam;
  return $.ajax({
    url: endPoint,
    type: "GET",
    headers: {
      "accept": "application/json;odata=verbose",
    }
  });
}

function renderNavandFooterLink(){
  getItems('Links','?$select=Title,Url,Order0&$orderby=Order0 asc').then(function (response) {
    console.log('Data is ', response);
    var items = response.d.results;
    console.log(items);
    var headerNav = '', footerNav='';
    for (var index in items) {    
      var active = index == 0 ? 'active' : '';   
      headerNav += 
      '<li class="nav-item ' + active + '">' + 
          '<a href="'+ items[index].Url + '" class="nav-link pl-0">' + items[index].Title +
          '</a>' +
      '</li>';
      footerNav +=
      '<li>' +
        '<a href="'+ items[index].Url + '">' +
          '<span class="ion-ios-arrow-round-forward mr-2">' +
          '</span>' +
          items[index].Title +
        '</a>' +
      '</li>';
    }    
    $('#headerNav').html(headerNav);
    $('#footerNav').html(footerNav);
  }, function (fail) { console.log("Error happened ",fail); });
}
function renderFeaturedBlogs(){
  getItems('Blogs','?$expand=Editor&$select=Title,BlogBody,BlogImage,Modified,Editor/Title&$top=2&$filter=Publish eq 1').then(function (response) {
    console.log('Data is ', response);
    var items = response.d.results;
    console.log(items);
    var blogsHtml = '<h2 class="ftco-heading-2">Recent Blog</h2>';
    for (var index in items) {    
      blogsHtml += 
      '<div class="block-21 mb-4 d-flex">' +
        '<a class="blog-img mr-4" style="background-image: url('+ items[index].BlogImage +');">' +
        '</a>' +
        '<div class="text">' +
            '<h3 class="heading">' +
                '<a href="#">' + items[index].Title +
                '</a>' +
            '</h3>' +
            '<div class="meta">' +
                '<div>' +
                    '<a href="#">' +
                        '<span class="icon-calendar">' +
                        '</span> '+ formatDate(items[index].Modified) +'</a>' +
                '</div>' +
                '<div>' +
                    '<a href="#">' +
                        '<span class="icon-person">' +
                        '</span> '+ items[index].Editor.Title + '</a>' +
                '</div>' +
                '<div>' +
                    '<a href="#">' +
                        '<span class="icon-chat">' +
                        '</span> 5</a>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';      
    }    
    $('#featureBlog').html(blogsHtml);
  }, function (fail) { console.log("Error happened ",fail); });
}

function formatDate(d) {
  var date = new Date(d);
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', '  + year;
}


$(document).ready(function () {
  //Rendering global navigation and footer links
  renderNavandFooterLink();
  //Render Featured blog to the footer 
  renderFeaturedBlogs();



});