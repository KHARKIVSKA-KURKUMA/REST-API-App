// const request = require("supertest");
// const mongoose = require("mongoose");

// const app = require("../app");

// const { DB_HOST } = process.env;

// describe("tests for login/register controllers", () => {
//   beforeAll(() =>
//     mongoose
//       .connect(DB_HOST)
//       .then(() => {
//         console.log("database connection successful");
//         app.listen(3000, () => {
//           console.log(`Server running. Use our API on port: 3000`);
//         });
//       })
//       .catch((error) => {
//         console.log(`Server is not running. Error message: ${error.message}`);
//         process.exit(1);
//       })
//   );

//   test("login returns response status 200 and response body must contain a token ", async () => {
//     const response = await request(app).post("/users/login").send({
//       email: "kurkuma1234@gmail.com",
//       password: "123456qwerty",
//     });

//     expect(response.status).toBe(200);
//     expect(typeof response.body.token).toBe("string");
//   });

//   test("register returns response status 201 and response body must contain email and subscription type", async () => {
//     const response = await request(app).post("/users/register").send({
//       email: "сucaracha12344@gmail.com",
//       password: "123456qwerty",
//       subscription: "starter",
//     });
//     const { email, subscription } = response.body;
//     expect(response.status).toBe(201);
//     expect(typeof email).toBe("string");
//     expect(typeof subscription).toBe("string");
//   });
// });
/* -------------------------------------------------------------------------- */
// const request = require("supertest");
// const mongoose = require("mongoose");

// const app = require("../app");

// const { DB_HOST } = process.env;

// describe("tests for login/register controllers", () => {
//   let authToken; // To store the authentication token

//   beforeAll(async () => {
//     await mongoose.connect(DB_HOST);
//     console.log("Database connection successful");
//   });

//   afterAll(async () => {
//     await mongoose.disconnect();
//   });

//   test("login returns response status 200 and response body must contain a token ", async () => {
//     const loginResponse = await request(app).post("/users/login").send({
//       email: "kurkuma1234@gmail.com",
//       password: "123456qwerty",
//     });

//     expect(loginResponse.status).toBe(200);
//     expect(typeof loginResponse.body.token).toBe("string");

//     authToken = loginResponse.body.token; // Store the token for future requests
//   });

//   test("authenticated request returns a response with status 200", async () => {
//     const authenticatedResponse = await request(app)
//       .get("/authenticated-route") // Change this to the appropriate authenticated route
//       .set("Authorization", `Bearer ${authToken}`);

//     expect(authenticatedResponse.status).toBe(200);
//     // Add more expectations for the authenticated response
//   });

//   test("register returns response status 201 and response body must contain email and subscription type", async () => {
//     const response = await request(app).post("/users/register").send({
//       email: "сucaracha12344@gmail.com",
//       password: "123456qwerty",
//       subscription: "starter",
//     });

//     expect(response.status).toBe(201);
//     expect(typeof response.body.email).toBe("string");
//     expect(typeof response.body.subscription).toBe("string");
//   });
// });
