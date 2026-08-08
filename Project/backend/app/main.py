from fastapi import FastAPI

app = FastAPI(
    title="Verity Backend",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Verity Backend Running"}

@app.get("/health")
def health():
    return {"status": "healthy"}