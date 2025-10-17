from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from database.database import SessionLocal, engine, Base
from database.models import Atividade, ListaAtividades

from database.schemas import *

app = FastAPI()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",   
    "http://localhost:3306"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,    
    allow_credentials=True,
    allow_methods=["*"],       
    allow_headers=["*"],        
)


Base.metadata.drop_all(bind=engine) # apagar depois rs
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/atividades/")
def criar_atividade(atividade: AtividadeCreate, db: Session = Depends(get_db)):

    if atividade.resposta_correta < 0 or atividade.resposta_correta >= len(atividade.opcoes):
        raise HTTPException(status_code=400, detail="Índice da resposta correta inválido")

    nova_atividade = Atividade(
        frase=atividade.frase,
        pergunta=atividade.pergunta,
        opcoes=atividade.opcoes,
        resposta_correta=atividade.resposta_correta
    )

    db.add(nova_atividade)
    db.commit()
    db.refresh(nova_atividade)

    return nova_atividade.id  

@app.get("/atividades/", response_model=List[AtividadeRead])
def listar_atividades(db: Session = Depends(get_db)):
    atividades = db.query(Atividade).all()
    return atividades

@app.get("/listas/", response_model=List[ListaAtividadeRead])
def listar_listas(db: Session = Depends(get_db)):
    listas = db.query(ListaAtividades).all()
    return listas

@app.post("/listas/", response_model=ListaAtividadeRead)
def criar_lista(lista: ListaAtividadeCreate, db: Session = Depends(get_db)):
    print("aopa")
    lista_existente = db.query(ListaAtividades).filter(
        func.lower(ListaAtividades.nome) == lista.nome.lower()
    ).first()

    if lista_existente:
        for atividade_data in lista.atividades or []:
            nova_atividade = Atividade(
                frase=atividade_data.frase,
                pergunta=atividade_data.pergunta,
                opcoes=atividade_data.opcoes,
                resposta_correta=atividade_data.resposta_correta
            )
            db.add(nova_atividade)
            db.commit()
            db.refresh(nova_atividade)

            lista_existente.atividades.append(nova_atividade)

        db.commit()
        db.refresh(lista_existente)
        return lista_existente

    else:
        nova_lista = ListaAtividades(nome=lista.nome)
        db.add(nova_lista)
        db.commit()
        db.refresh(nova_lista)
        for atividade_data in lista.atividades or []:
            nova_atividade = Atividade(
                frase=atividade_data.frase,
                pergunta=atividade_data.pergunta,
                opcoes=atividade_data.opcoes,
                resposta_correta=atividade_data.resposta_correta
            )
            db.add(nova_atividade)
            db.commit()
            db.refresh(nova_atividade)

            nova_lista.atividades.append(nova_atividade)

        db.commit()
        db.refresh(nova_lista)
        return nova_lista