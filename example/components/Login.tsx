export const Login = ({ setShow, setAccount }: { setShow: Function, setAccount: Function }) => {
    const connectEth = async () => {
        let anyWindow = window as any

        const accounts = await anyWindow.ethereum.request({ method: "eth_requestAccounts" })

        setAccount({
            address: accounts[0],
            type: "ETHEREUM"
        })

        console.log(accounts)
    }

    const connectSol = async () => {
        let anyWindow = window as any

        let accounts
        if(anyWindow.solana) accounts = await anyWindow.solana.connect()
        else accounts = await anyWindow.backpack.connect()

        setAccount({
            address: anyWindow.backpack.publicKey.toBase58(),
            type: "SOLANA"
        })
    }

    const connectApt = async () => {
        let anyWindow = window as any

        const accounts = await anyWindow.martian.connect()

        setAccount({
            address: accounts.publicKey,
            type: "APTOS"
        })

        console.log(accounts)
    }
    
    return (
        <div className="w-1/2 h-1/2 absolute flex justify-center items-center rounded-xl bg-gray-500">
            <div className="w-full h-full relative flex justify-center items-center rounded-xl bg-gray-500 space-x-3">
                <div className="absolute top-5 right-5 cursor-pointer" onClick={() => setShow(false)}>X</div>

                <div onClick={() => connectEth()} className="w-36 text-center text-black py-3 bg-white rounded-xl cursor-pointer">
                    Ethereum
                </div>
                <div onClick={() => connectSol()} className="w-36 text-center text-black py-3 bg-white rounded-xl cursor-pointer">
                    Solana
                </div>
                <div onClick={() => connectApt()} className="w-36 text-center text-black py-3 bg-white rounded-xl cursor-pointer">
                    Aptos
                </div>
            </div>
        </div>
    )
}