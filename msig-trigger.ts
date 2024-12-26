import { Keypair, Memo, Networks, Operation, TransactionBuilder } from "@stellar/stellar-sdk";
import { ACCOUNTS } from "./accounts";
import { server } from "./reuseables/horizon-server";

const sourceKeypair = Keypair.fromSecret(ACCOUNTS.MASTER.SECRET);

async function createEventTransaction() {
    const account = await server.loadAccount(sourceKeypair.publicKey());
    const fee = await server.fetchBaseFee();

    const transaction = new TransactionBuilder(account, {
        fee: fee as any,
        networkPassphrase: Networks.TESTNET,
    })
    .addOperation(Operation.manageData({
        name: 'floodAlert', 
        value: 'true',
    })).addMemo(Memo.text("FLOOD_DETECTED"))
        .setTimeout(30)
        .build();

    transaction.sign(Keypair.fromSecret(ACCOUNTS.SIGNER1.SECRET));
    transaction.sign(Keypair.fromSecret(ACCOUNTS.SIGNER2.SECRET));
    transaction.sign(Keypair.fromSecret(ACCOUNTS.SIGNER3.SECRET));

    console.log(transaction.signatures)

    const response = await server.submitTransaction(transaction);
    console.log("Event triggered:", response);
}
createEventTransaction().catch((error) => {
    console.log(error.response.data.extras.result_codes)
});