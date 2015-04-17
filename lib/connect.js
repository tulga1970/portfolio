/*
 * crud.js - module to provide CRUD db capabilities
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  loadSchema,   checkSchema,

  mongodb     = require( 'mongodb' ),
  fsHandle    = require( 'fs'      ),
  JSV         = require( 'JSV'     ).JSV,

  mongoServer = new mongodb.Server(
    'localhost',
    mongodb.Connection.DEFAULT_PORT
  ),
  dbHandle    = new mongodb.Db(
    'portfolio', mongoServer, { safe : true }
  ),
  validator   = JSV.createEnvironment(),

  objTypeMap  = { 'user' : {} };
// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN UTILITY METHODS -----------------
loadSchema = function ( schema_name, schema_path ) {
  fsHandle.readFile( schema_path, 'utf8', function ( err, data ) {
    objTypeMap[ schema_name ] = JSON.parse( data );
  });
};

checkSchema = function ( obj_type, obj_map, callback ) {
  var
    schema_map = objTypeMap[ obj_type ],
    report_map = validator.validate( obj_map, schema_map );

  callback( report_map.errors );
};

module.exports = {
  loadSchema : loadSchema,
  checkSchema   : checkSchema
};
// ----------------- END PUBLIC METHODS -----------------

// ------------- BEGIN MODULE INITIALIZATION --------------
dbHandle.open( function () {
  console.log( '** Connected to MongoDB **' );
});

// load schemas into memory (objTypeMap)
(function () {
  var schema_name, schema_path;
  for ( schema_name in objTypeMap ) {
    if ( objTypeMap.hasOwnProperty( schema_name ) ) {
      schema_path = __dirname + '/' + schema_name + '.json';
      loadSchema( schema_name, schema_path );
    }
  }
}());
// -------------- END MODULE INITIALIZATION ---------------
