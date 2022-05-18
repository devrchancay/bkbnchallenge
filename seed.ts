import { faker } from "@faker-js/faker";
import axios from "axios";

const user = Array.from({ length: 100 })
  .fill(null)
  .map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber("##########"),
  }))
  .map((us) => {
    return axios.post("https://bkbnchallenge.herokuapp.com/contacts", {
      ...us,
    });
  });

Promise.all(user)
  .then((res) => {
    for (const response of res) {
      console.log("created: ", response.data.firstName, response.data.lastName);
    }
  })
  .catch((err) => {
    console.log("error", JSON.stringify(err.response.data));
  });
