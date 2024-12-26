import { Horizon } from "@stellar/stellar-sdk";

const horizon_server = "https://horizon-testnet.stellar.org";
export const server = new Horizon.Server(horizon_server);