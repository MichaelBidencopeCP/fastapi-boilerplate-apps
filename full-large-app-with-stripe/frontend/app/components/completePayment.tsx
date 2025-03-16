

export default function CompletePayment({paymentStage}:Readonly<{paymentStage:number}>){

    return(
        <>
            <div className={`max-w-md mx-auto bg-gray-500 rounded-lg shadow-md ${!paymentStage?"hidden":""}`} >
                <div className={`h-full w-full bg-two p-6 rounded-lg`}>
                    <div className={`border-y-2`}>
                        hello
                    </div>

                </div>
            </div>
        </>
    )
}