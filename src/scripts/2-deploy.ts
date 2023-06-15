import { AddressZero } from '@ethersproject/constants'
import sdk from './1-initialize-sdk.js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


(async () => {
    try {
        const imagePath = resolve(__dirname, 'assets', 'melon.jpg')
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            name: 'melon bread Collective',
            description: 'A DAO for melon bread in Japan',
            image: readFileSync(imagePath),
            primary_sale_recipient: AddressZero
        });

        const editionDrop = sdk.getContract(editionDropAddress, 'edtion-drop')
        const metadata = await (await editionDrop).metadata.get()

        
        console.log(
            "Successfully deployed editionDrop contract, address:",
            editionDropAddress
        );

        
        console.log(" editionDrop metadata:", metadata);

    } catch (error) {
        console.log("failed to deploy editionDrop contract", error);
    }
})();