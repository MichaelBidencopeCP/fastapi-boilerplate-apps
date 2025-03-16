'use client'


import PaymentStart from "@/app/components/paymentStart"
import {  useState } from "react"

import useUserStore from "@/app/lib/user-store"
import CompletePayment from "@/app/components/completePayment"
import ErrorBar from "@/app/components/errorBar"

export default function PaymentsPage() {
    const [amount, setAmount] = useState(0)
    const [priceStr, setPriceStr] = useState("0.00")
    const [paymentStage, setPaymentStage] = useState(0)
    const [error, setError] = useState(0)
    const user = useUserStore((state)=>state)

    const errorMessages = (value:number) => {
        switch(value){
            case 1:
                return "The value entered is out of range. Right now we will not accept any payments over 400$ or less than 0$"
            default:
                return "Unkown error please try again later"
        }
    }

    const amountChange = (value:number) => {
        if(value%1==0 && value>=0){
            setAmount(value)
            setPriceStr((value*1.25).toFixed(2))
        }
    }
        
        
    const priceChange = (value:string)=>{
        /*
        setPriceStr(value)
        setAmount((Number(value)*(0.75)))
        */
    }

    const confirmCreditAmount = async () => {
        let token = user.token
        console.log(token)
        const response = await fetch('http://localhost:8000/payment/credits', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':`${token}`
            },
            body: JSON.stringify({'credits':amount})

        })
        if(response.ok){
            setPaymentStage(1)
        }
        if(response.status === 400){
            let code = await response.json()
            console.log(code.detail.code)
            if (code.detail.code==1){
                setError(1)
            }
            else{
                setError(2)
            }
                
        }
        if(response.status === 401){
            user.clearUser()
        }
        
    }


    

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-3">
                <div className={`${paymentStage === 0 ? "col-start-2":""}`}>
                    <ErrorBar className={`${error==0?"hidden":""}`}>{errorMessages(error)}:{error}</ErrorBar>
                    <PaymentStart amount={amount} amountChange={amountChange} priceStr={priceStr} priceChange={priceChange} paymentStage={paymentStage} confirmCreditAmount={confirmCreditAmount} />
                </div>
                <div>
                    <CompletePayment paymentStage={paymentStage}/>
                </div>
            </div>
        </div>
    )
}