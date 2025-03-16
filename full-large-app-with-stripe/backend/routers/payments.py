from fastapi import APIRouter, HTTPException
from sqlmodel import select
from dotenv import load_dotenv
import os
import stripe


from ..dependencies import FirebaseUserDep, SessionDep
from ..project_types.payment_types import CreditPaymentIntent
from ..models import User

load_dotenv()

STRIPE_KEY = os.getenv("TEST_stripe_secret_key")



stripe.api_key = STRIPE_KEY

router = APIRouter(
    prefix='/payment',
    tags=['payment']
)

@router.post("/credits")
async def credit_payment_intent(session: SessionDep, user:FirebaseUserDep, credits:CreditPaymentIntent):
    #get user credits
    print(credits)
    credits = credits.credits
    amount = credits * 1.25
    cents = int(amount * 100) 
    print(credits)
    userInfo = select(User.credits).where(User.id == user['user_id'])
    userCredits = session.exec(userInfo).first()
    if credits < 0 or credits > 400:
        raise HTTPException(status_code=400,detail={'message':"out of bounds", 'code':1})
    secret = stripe.PaymentIntent.create(
        amount=cents,
        currency="usd",
    )


    return {
        "current_credits":userCredits,
        "credits_to_be_added":0,
        "client_secret":secret
    }




