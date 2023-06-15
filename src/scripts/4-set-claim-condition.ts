import { MaxUint256 }from '@ethersproject/constants'
import sdk from './1-initialize-sdk'
import { editionDropAddress } from './module'

const editionDrop = sdk.getContract(editionDropAddress, 'edition-drop');

(async () => {
    try {
        const claimConditions = [
            {
                startTime: new Date(),
                maxQuantity: 50_000,
                price: 0,
                quantityLimitPerTransaction: 1,
                waitInSeconds: MaxUint256
            }
        ]
        await(await editionDrop).claimConditions.set('0', claimConditions)
        console.log('Successfully set claim condtion!');
    }catch(error){
        console.log('Failed to set claim condition', error)
    }
})();

