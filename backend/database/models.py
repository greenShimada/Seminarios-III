from sqlalchemy import Table, Column, Integer, ForeignKey, String, JSON
from sqlalchemy.orm import relationship
from .database import Base

# muitos para muiitos
atividade_lista_associacao = Table(
    "atividade_lista_associacao",
    Base.metadata,
    Column("atividade_id", Integer, ForeignKey("atividades.id")),
    Column("lista_id", Integer, ForeignKey("lista_atividades.id")),
)

class Atividade(Base):
    __tablename__ = "atividades"

    id = Column(Integer, primary_key=True, index=True)
    frase = Column(String(255), nullable=False)
    pergunta = Column(String(255), nullable=False)
    opcoes = Column(JSON, nullable=False)
    resposta_correta = Column(Integer, nullable=False)

    listas = relationship("ListaAtividades", secondary=atividade_lista_associacao, back_populates="atividades")

class ListaAtividades(Base):
    __tablename__ = "lista_atividades"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False)

    atividades = relationship("Atividade", secondary=atividade_lista_associacao, back_populates="listas")
