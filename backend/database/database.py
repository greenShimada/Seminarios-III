from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+mysqlconnector://user_apae:apae@127.0.0.1:3306/apae"

engine = create_engine(DATABASE_URL, echo=True)  # echo=True para logar as queries
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
