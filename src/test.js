import { db } from "./config/firebase";

db.collection("employee")
  .add({
    name: "Shoaib Sharif",
    email: "shoaib@shoaib.com",
    phone: "7144068434"
  })
  .then(doc => {
    const id = doc.id; //?
  });
