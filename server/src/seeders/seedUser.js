import User from "../models/User.js";

const seedUser = async () => {
  await User.findOrCreate({
    where: { email: "default@flipkart.com" },
    defaults: {
      name: "Default User",
    },
  });

  console.log("✅ Default user created (or already exists)");
};

export default seedUser;
