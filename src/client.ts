import { Signaler } from "./util/signals.ts";
import { GatewayInterface, openGateway } from "./network/gateway.ts"
import * as API from "./network/api.ts"

export class Client extends Signaler {
  private _gateway?: GatewayInterface
  readonly api = API

  constructor(private readonly token: string) {
    super()
  }

  get gateway() { return this._gateway }

  async login() {
    this._gateway = await openGateway(this.token)
    this._gateway.connect('disconnect', () => this._gateway = undefined)
    
    this._gateway.connect('any', (event: any, name: string) => {
      this.emit(name, event)
    })
  }
}
