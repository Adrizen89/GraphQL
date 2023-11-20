const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLSchema
  } = require('graphql');
  const db = require('./database');
  
  // Type Game
  const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: new GraphQLNonNull(GraphQLString) },
      genres: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
      publicationDate: { type: GraphQLInt },
      editors: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EditorType))) },
      studios: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(StudioType))) },
      platform: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) }
    })
  });
  
  // Type Editor
  const EditorType = new GraphQLObjectType({
    name: 'Editor',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: new GraphQLNonNull(GraphQLString) },
      games: { type: new GraphQLList(GameType) }
    })
  });
  
  // Type Studio
  const StudioType = new GraphQLObjectType({
    name: 'Studio',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: new GraphQLNonNull(GraphQLString) },
      games: { type: new GraphQLList(GameType) }
    })
  });

  const InfosType = new GraphQLObjectType({
    name: 'Infos',
    fields: () => ({
      count: { type: new GraphQLNonNull(GraphQLInt) },
      pages: { type: new GraphQLNonNull(GraphQLInt) },
      nextPage: { type: GraphQLInt },
      previousPage: { type: GraphQLInt }
    })
  });
  
  const GamesType = new GraphQLObjectType({
    name: 'Games',
    fields: () => ({
      infos: { type: InfosType },
      results: { type: new GraphQLList(GameType) }
    })
  });
  
 
  
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      games: {
        type: GamesType,
        args: {
          page: { type: GraphQLInt },
          genre: { type: GraphQLString },
          platform: { type: GraphQLString },
          studio: { type: GraphQLString },
        },
        resolve(parent, args) {
          return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM games WHERE 1';
            let params = [];
  
            if (args.genre) {
              query += ' AND genre = ?';
              params.push(args.genre);
            }
            if (args.platform) {
              query += ' AND platform = ?';
              params.push(args.platform);
            }
            if (args.studio) {
              query += ' AND studio = ?';
              params.push(args.studio);
            }
  
            db.query(query, params, (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve({ infos: {/* infos sur la pagination */}, results });
              }
            });
          });
        }
      },
      game: {
        type: GameType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parent, args) {
          return new Promise((resolve, reject) => {
            db.query('SELECT * FROM games WHERE id = ?', [args.id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results[0]);
              }
            });
          });
        }
      },
     editors: {
        type: EditorType, 
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM editors WHERE id = ${args.id}`;
                db.query(query, (err, results) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(results);
                  }
                });
              });
        },
      },
      studio: {
        type: StudioType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return new Promise((resolve, reject) => {
            const query = `SELECT * FROM studios WHERE id = ${args.id}`;
            db.query(query, (err, results) => {
              if (err) {
                reject(err);
              } else {
                resolve(results);
              }
            });
          });
        },
      },
    }})
  module.exports = new GraphQLSchema({ query: RootQuery });
  