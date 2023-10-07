import User from "./User";

const checkUser = async (userId: string) => {
  try {
    const user = await User.getUserById(userId);
    if (user) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export { checkUser };
