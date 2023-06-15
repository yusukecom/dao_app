import { readFileSync } from "fs";
import sdk from "./1-initialize-sdk";
import { editionDropAddress } from "./module";
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url';


const editionDrop  =  sdk.getContract(editionDropAddress, 'edition-drop')
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async() => {
    try{
        const imagePath = resolve(__dirname, 'assets', 'melon.jpg')
        await (
            await editionDrop
        ).createBatch([
            {
                name: 'Member is symbol',
                description : '限定アイテム',
                imgage: readFileSync(imagePath),
            }
        ]);
        console.log( 'Successfully created a new NFT in the Drop')
    }catch(error){
        console.log('faile to create the new NFT', error)
    }
}) ();