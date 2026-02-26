const { test, expect } = require('@playwright/test');
const { createUserData, updatedUserData } = require('../data/userData');

test('Create, Get, Update User', async ({ request }) => {

  console.log("Starting Test");

  // Create the user (POST)
  const createRes = await request.post('/api/users', {
    data: createUserData
  });

  const createBody = await createRes.json();

  // validating that user is created
  expect(createRes.status()).toBe(201);

  const userId = createBody.id;

  // Printing only required fields
  const createdUserDetails = {
    name: createBody.name,
    job: createBody.job,
    email: createUserData.email, 
    phone: createUserData.phone,   
    id: createBody.id,
    createdAt: createBody.createdAt
  };

  // priting the user which is created
  console.log(" Successfully Created User:");
  console.log(createdUserDetails);


  // GET user
  const getdata = await request.get('/api/users/2');
  const getuserdata = await getdata.json();

  // validating that data is fetched
  expect(getdata.status()).toBe(200);

  console.log(" Successfully Fetched User");
  console.log({
    id: getuserdata.data.id,
    email: getuserdata.data.email,
    first_name: getuserdata.data.first_name,
    last_name: getuserdata.data.last_name
  });


  // UPDATE USER
  const updateRes = await request.put(`/api/users/${userId}`, {
    data: updatedUserData
  });

  const updateBody = await updateRes.json();

  // validating data is updated successfully
  expect(updateRes.status()).toBe(200);

  const updatedUserDetails = {
    name: updateBody.name,
    job: updateBody.job,
    email: updatedUserData.email,
    phone: updatedUserData.phone,
    updatedAt: updateBody.updatedAt
  };

  console.log(" Successfully Updated User:");
  console.log(updatedUserDetails);

  console.log("Test Completed");
});