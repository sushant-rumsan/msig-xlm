import { ACCOUNTS } from "./accounts";
import { server } from "./reuseables/horizon-server";
import { Keypair, TransactionBuilder, Operation, Networks } from '@stellar/stellar-sdk';

const sourceKeypair = Keypair.fromSecret(ACCOUNTS.MASTER.SECRET);
const signerA = Keypair.fromSecret(ACCOUNTS.SIGNER1.SECRET).publicKey();
const signerB = Keypair.fromSecret(ACCOUNTS.SIGNER2.SECRET).publicKey();
const signerC = Keypair.fromSecret(ACCOUNTS.SIGNER3.SECRET).publicKey();

async function setupAccount() {
    const account = await server.loadAccount(sourceKeypair.publicKey());
    const fee = await server.fetchBaseFee();

    const transaction = new TransactionBuilder(account, {
        fee: fee.toString(),
        networkPassphrase: Networks.TESTNET,
    })
        .addOperation(
            Operation.setOptions({
                signer: { ed25519PublicKey: signerA, weight: 1 },
            })
        )
        .addOperation(
            Operation.setOptions({
                signer: { ed25519PublicKey: signerB, weight: 1 },
            })
        )
        .addOperation(
            Operation.setOptions({
                signer: { ed25519PublicKey: signerC, weight: 1 },
            })
        )
        .addOperation(
            Operation.setOptions({
                lowThreshold: 1,
                medThreshold: 3,
                highThreshold: 3,
            })
        )
        .setTimeout(130000)
        .build();

    transaction.sign(sourceKeypair);

    const response = await server.submitTransaction(transaction);
    console.log("Account setup complete:", response);
}
setupAccount().catch((err) => {
    console.log(err)
});



