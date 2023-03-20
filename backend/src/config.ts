export const DatabaseConfig = () => {
  return {
    uri: process.env.DB_URI,
  };
};

export enum Database {
  USER = 'User',
  OAUTH = 'Oauth',
}
