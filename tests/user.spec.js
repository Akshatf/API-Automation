const { test, expect } = require("@playwright/test");
const { createUserData, updatedUserData } = require("../data/userData");

test.describe("Reqres User API Test", () => {

  var userid;

  test("Get User", async ({ request }) => {

    console.log("Starting GET User Test");

    const response = await request.get("https://reqres.in/api/users/1");
    const body = await response.json();

    expect(response.status()).toBe(200);

    console.log("Successfully Fetched User:");
    console.log({
      id: body.data.id,
      email: body.data.email,
      first_name: body.data.first_name,
      last_name: body.data.last_name
    });

  });


  test("Create User", async ({ request }) => {

    console.log("Starting CREATE User Test");

    const response = await request.post("https://reqres.in/api/users", {
      data: createUserData,
      headers: {
        Accept: "application/json",
      },
    });

    const res = await response.json();

    expect(response.status()).toBe(201);

    userid = res.id;

    const createdUserDetails = {
      name: res.name,
      job: res.job,
      email: createUserData.email,
      phone: createUserData.phone,
      id: res.id,
      createdAt: res.createdAt
    };

    console.log("Successfully Created User:");
    console.log(createdUserDetails);

  });


  test("Update User", async ({ request }) => {

    console.log("Starting UPDATE User Test");

    const response = await request.put(
      "https://reqres.in/api/users/" + userid,
      {
        data: updatedUserData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    const res = await response.json();

    expect(response.status()).toBe(200);

    const updatedUserDetails = {
      name: res.name,
      job: res.job,
      email: updatedUserData.email,
      phone: updatedUserData.phone,
      updatedAt: res.updatedAt
    };

    console.log("Successfully Updated User:");
    console.log(updatedUserDetails);

  });


  test("Delete User", async ({ request }) => {

    console.log("Starting DELETE User Test");

    const response = await request.delete(
      "https://reqres.in/api/users/" + userid
    );

    expect(response.status()).toBe(204);

    console.log("Successfully Deleted User with ID:", userid);

  });

});