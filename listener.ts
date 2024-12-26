import { Horizon } from '@stellar/stellar-sdk';
import { ACCOUNTS } from './accounts';
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

server
    .transactions()
    .forAccount(ACCOUNTS.MASTER.PUBLIC)
    .cursor("now")
    .stream({
        onmessage: (transaction: any) => {
            if (transaction.memo === "FLOOD_DETECTED") {
                console.log("Flood event detected, triggering response...");
            }
        },
        onerror: (error: any) => console.error("Stream error:", error),
    });
