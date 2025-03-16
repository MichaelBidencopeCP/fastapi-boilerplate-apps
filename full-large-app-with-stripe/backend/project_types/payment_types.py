from pydantic import BaseModel

class CreditPaymentIntent(BaseModel):
    credits: int
    