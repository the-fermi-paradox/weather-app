import { model } from "./model/model";

const log = async () => {
  const output = await model.get("San Diego").catch((error) => console.log(error));
  console.log(output);
};

log();
