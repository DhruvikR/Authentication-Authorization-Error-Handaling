import assert from "assert";
import axios from "axios";

describe("api/users/ ", () => {
  it("/", () => {
    assert.equal(1, 1);
  });
  it("/login", async () => {
    let response = 0;
    const res = await axios
      .get("http://localhost:3000/api/user/")
      .then((response2) => {
        response = response2;
      })
      .catch((error) => {
        console.error("Error:");
      });
    assert.equal(response.data.data[0].id, 1);
  });
});
