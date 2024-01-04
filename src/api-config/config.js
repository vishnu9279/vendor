const NODE_ENV = "development1";
console.log('NODE_ENV', NODE_ENV);
export const serverUrl = (NODE_ENV.toLowerCase() === 'development') ? 'https://serverpprod.hksoftware.in/api/v1/vendor' : "http://localhost:5000/api/v1/vendor";