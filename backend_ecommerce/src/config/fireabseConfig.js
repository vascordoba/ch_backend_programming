import admin from "firebase-admin";
import serviceAccount from "./ch-be-proyecto-final-firebase-adminsdk-yo0xh-a7a94f4190.js";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tables = {
  TBL_PRODUCTS: "products",
  TBL_CART: "cart",
};

export { admin, tables };
