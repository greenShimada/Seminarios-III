from pydantic import BaseModel
from typing import List, Optional

class AtividadeCreate(BaseModel):
    frase: str
    pergunta: str
    opcoes: List[str]
    resposta_correta: int

class AtividadeRead(AtividadeCreate):
    id: int
    class Config:
        orm_mode = True


class ListaAtividadeCreate(BaseModel):
    nome: str
    atividades: Optional[List[AtividadeCreate]] = []


class ListaAtividadeRead(ListaAtividadeCreate):
    id: int 
    class Config:
        orm_mode = True
