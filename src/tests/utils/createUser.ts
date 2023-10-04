import { User } from "../../database";

const createUser = async () => {
  await User.save({
    email: "test.@mail.com",
    first_name: "test",
    password: "2222",
  });
};
