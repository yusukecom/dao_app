import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { ConnectWallet, useChain, useAddress, useSwitchChain, useChainId, useConnect, useContract, EditionDropInitializer, EditionDrop } from '@thirdweb-dev/react'
import style from '../style/Home.module.css'
import { id } from 'ethers/lib/utils';
import { editionDropAddress } from '@/scripts/module';


const Home: NextPage = () => {
    const address = useAddress();
    console.log('Welcom Wallet', address);
    const switchChain = useSwitchChain();
    const chainId =  useChainId();
    const editionDrop = useContract('INSERT_EDITION_DROP_ADDRESS', 'edition-drop').contract;
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
    const [isClaming, setIsClaming] = useState(false);

    useEffect(() => {
        if(!address){
            return;
        }
        const checkBlance = async () => {
            try{
            const balance = await editionDrop!.balanceOf(address, 0)
                if(balance.gt(0)){
                setHasClaimedNFT(true)
                console.log('this user has a membership NFT!')
                }else{
                    setHasClaimedNFT(false)
                    console.log('this user does not have a membership NFT')
                }
            } catch(error) {
                setHasClaimedNFT(false)
                console.error('Failed to get balance', error)
            }
        }
        checkBlance();
    }, [ address, editionDrop]);

    const mintNFT = async () => {
        try {
            setIsClaming(true);
            await editionDrop!.claim('0',1)
            console.log(`Successfully Minted. check it out etherscan: https//sepolia.etherscan.io/address/${editionDrop!.getAddress()}`)
            setHasClaimedNFT(true)
        }catch (error) {
            setHasClaimedNFT(false);
            console.error('Failed To Mint NFT ', error)
        }finally{
            setIsClaming(false)
        }
    }

    if(!address) {
        return(
            <div className={style.container}>
                <main className={style.main}>
                    <h1 className={style.title}>
                        Welcome to melon bread DAO
                    </h1>
                    <div className={style.connect}>
                        <ConnectWallet />
                    </div>
                </main>
            </div>
        )
    }else if (address && chainId && chainId !== 11155111 ){
        console.log("wallet address: ", address);
        console.log("chainId: ", chainId);

        return (
            <div className={style.container}>
                <main className={style.main}>
                    <h1 className={style.title}>
                        Sepoliaに切り替えてください
                        Welcome to MyDAO !!
                    </h1>
                    <p>dApppはsepoliaテストネットのみです</p>
                </main>
            </div>
        );
    }else {
        return (
            <div className={style.container}>
                <main className={style.main}>
                    <h1 className={style.title}>
                        Mint your free DAO Membership NFT
                    </h1>
                    <button disabled={isClaming} onClick={mintNFT}>
                        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
                    </button>
                    <div className={style.connect}>
                        <ConnectWallet />
                    </div>
                </main>
            </div>
        );
    }
};

export default Home;