from sqlalchemy import text
from app.database import engine

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("Database Connected Successfully!")
        print(result.fetchone())

except Exception as e:
    print("Database Connection Failed!")
    print(e)
