from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import SessionLocal, engine, Base
from database.models import Usuario

from database.interface import *

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
    allow_origins=origins,      # domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],        # métodos HTTP permitidos (GET, POST, etc)
    allow_headers=["*"],        # cabeçalhos permitidos
)


Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/usuarios/")
def criar_usuario(usuario: Usuario_interface, db: Session = Depends(get_db)):
    print("lçapo")
    usuario_existente = db.query(Usuario).filter(Usuario.email == usuario.email).first()
    if usuario_existente:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    novo_usuario = Usuario(name=usuario.name, email=usuario.email)
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario.name

@app.get("/usuarios/")
def listar_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).all()
    return usuarios
