// ===========================================================
// Update bucket functions
// ===========================================================
// Global bucketArray contains objects with article data
var bucketArray = [];
// ------------------------------------------
// Refresh bucket list
// ------------------------------------------
function refreshBucket() {
  var bucketContent = updateBucketContent();

  // Inject html with new bucket content
  $(".bucket").html(bucketContent);

  // Make new list sortable
  $('.bucket').sortable({
    handle: '.handle',
    forcePlaceholderSize: true,
    items: ':not(.bucket_name)'
  });
}

// ------------------------------------------
// Update bucket content
// ------------------------------------------
function updateBucketContent() {
  var bucketContent = '';

  bucketContent += bucketArray.length === 0 ? '<div class="bucket_item_holder"><strong>Drag article to add to reading list</strong></div>' : updateItemsInBucket();

  return bucketContent;
}

// ------------------------------------------
// Update items of bucket
// ------------------------------------------
function updateItemsInBucket() {
  var items = bucketArray.length >= 2 ? '<div class="delete_all glyphicon glyphicon-trash"></div>' : '';

  // Show latest bucket article
  for(var i = bucketArray.length - 1; i >= 0; i--) {

    // Inject HTML to update bucket
    items += '<div class="bucket_item" data-id="' + bucketArray[i].id + '">';
    items += '<div class="bucket_img">';
    if(bucketArray[i].thumbnail){

      items += '<div class="white_overlay"></div><img class="thumb" src="'+ bucketArray[i].thumbnail +'" height="50">';
      items += '<div class="bucket_title">' + bucketArray[i].title + '</div>';
    }
    else {
      
      items += '<div class="bucket_title" style="position: initial;">' + bucketArray[i].title + '</div>';
    }
    items += '<div class="moreInfo">';
    items += '<button class="read btn btn-default">Read</button>';
    items += '<div class="handle"></div>';
    items += '<div class="remove_bucket_item glyphicon glyphicon-remove-circle" style="position: absolute;"></div>';
    items += '</div></div></div>';
  }
  
  return items;
}

// ===========================================================
// Bucket control functions
// ===========================================================
// ------------------------------------------
// Check that article id is valid
// ------------------------------------------
function validId(id) {
  return (locateItem(id) == -1 && id !== '') ? true : false;
}

// ------------------------------------------
// Create item object for bucket
// ------------------------------------------
function createItem(id) {
  // Set local variables
  var title, thumbnail, article_id, teaser, item, link, mainImage;

  // Extract data from DOM by id
  title = $("#" + id + " .title b")[0].innerHTML;
  teaser = $("#" + id + " .text")[0].innerHTML;
  thumbnail = $("#" + id +" img").first().data("thumb");
  paragraph = $("#" + id).first().data("paragraph");
  link = $("#" + id).attr('data-article-link');
  mainImage = $("#" + id +" img").first().attr("src");
  // If no thumbnail, use article main image as thumbnail
  if(thumbnail === null || thumbnail === '') {
    thumbnail = $("#" + id +" img").first().attr("src");
    if(thumbnail == "/images/npr_logo.png")
      thumbnail = "/images/npr_thumb.png";
  }

  // Return article object
  return {"id": id, "title": title, "teaser": teaser, "thumbnail": thumbnail, "paragraph": paragraph, "link": link, "mainImage": mainImage};
}

// ------------------------------------------
// Find article to delete by ID
// ------------------------------------------
function locateItem(id) {
  // Locate object in bucket by ID
  var item = $.grep(bucketArray, function(e){ return e.id == id; });
  // Return the array index of found object
  return bucketArray.indexOf(item[0]);
}

// ------------------------------------------
// Add article to bucket
// ------------------------------------------
function addItemToBucket(id) {
  bucketArray.push(createItem(id));
  addArticleToDatabase(bucketArray[locateItem(id)]);
  $("#" + id).parent(".article").addClass("article_in_bucket");
  $("#" + id).children(".main_image").addClass("article_img_in_bucket");
  $("#" + id).children(".main_image .main_image_right").addClass("article_img_in_bucket");

  return true;
}

// ------------------------------------------
// Remove article from bucket
// ------------------------------------------
function removeItemFromBucket(id) {
  // Remove from bucketArray
  bucketArray.splice(locateItem(id),1);
  // Find article and remove it from bucketArray
  removeArticleFromBucket(id);

  $("#" + id).parent(".article").removeClass("article_in_bucket");
  console.log($("#" + id).children().hasClass("article_img_in_bucket"));
  $("#" + id).children().removeClass("article_img_in_bucket");
  // $("#" + id).children(".main_image .main_image_right .article_img_in_bucket").removeClass("article_img_in_bucket");
  return true;
}