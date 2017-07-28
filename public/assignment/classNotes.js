/**
 * Created by xoxoumop3pisdn on 6/23/17.
 */
Get by parameter or get by query (getting value from a request)

req.query
req.body
- when we're sending a post or pull request we pass object in a json body/request body

  post(url, object)
   the object (second param) will be put into the request body

   in order to parse the body

   we need to

   npm install body-parser


   ----------

   response
   - we can send response back to client
   - request.send()
    -- we can send status or data

    res.sendStatus()
    - 200 = okay
    - 403 = forbidden

    res.send(websiteSite obj as json body)

    -------------------



create another app.js file... need to pass in the app we created with express


 module.exports = function(app)
 // allows us to export the function that is defined in the app.js?

 // req is built in .. provided by express

 ---------------

 why do we need two app.js

 client side


---------

flikar will be optional(5 points bonus if you finish)

------------------


multer is the package for uploading

------------

use upload , call the multer .. define place where to upload the file
* remember where you uploaded your file /../../public

* parent parent and then public and upload

----------




(function () {
  angular
     .module("jgaDirectives", [])
     .directive( jgaSortable, makeSortable)


app js:
 angular.module(WebAppMaker, [ngRoute, jgaSortable, imgUpload]);


in list

in website-list-view.client
ul class="list-group cl-list-group-borderless" jga-sortable














