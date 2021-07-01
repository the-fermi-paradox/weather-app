import { model } from "./model/model";

const log = async(() => {
  const output = await model.get();
  console.log(output);
});
