import { SharpInstance } from "sharp";

export default function resize(instance: SharpInstance, options: any) {
  return instance.resize(options);
}
