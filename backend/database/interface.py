from pydantic import BaseModel

class Usuario_interface(BaseModel):
    name: str
    email: str
