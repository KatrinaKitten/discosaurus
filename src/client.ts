import { GatewayInterface } from "./network/gateway_interface.ts"
import { openGateway } from "./network/gateway.ts"
import API from "./network/api.ts"

export class Client extends GatewayInterface {
  readonly api = API(this.token)

  constructor(private readonly token: string) {
    super()
  }

  async login() {
    this.close()
    await openGateway(this.token, undefined, { gwInterface: this })
  }
}
