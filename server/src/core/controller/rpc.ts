import { ControllerBase } from "./base";

export abstract class RpcControllerBase extends ControllerBase {
  protected onDispatch() {
    return this.action();
  }

  protected abstract action(): any;
}
