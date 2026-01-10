import User from "../models/User.js";
import bcrypt from "bcryptjs";

const seedUser = async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);
  
  await User.findOrCreate({
    where: { email: "default@flipkart.com" },
    defaults: {
      name: "Default User",
      password: hashedPassword,
      phone: "9999999999",
      address: "Default Address",
    },
  });

  console.log("✅ Default user created (or already exists)");
};

export default seedUser;
